from fastapi import APIRouter, Query, HTTPException, Depends
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from typing import Optional
from datetime import datetime, timedelta, timezone
from app.services.deputado_repository import DeputadoRepository, get_deputado_repository
from app.services.camara_api import get_camara_client, CamaraAPIClient
from app.core.cache import lists_cache, aggregates_cache, get_cache_key
import logging

from app.services.deputado_repository import DeputadoRepository, get_deputado_repository
from app.services.camara_api import get_camara_client, CamaraAPIClient
from app.models.schemas import (
    DeputadoResponse,
    DeputadoDetalhadoResponse,
    DespesasDeputadoResponse,
    VotacaoVotosResponse,
    VotoResponse,
    TopGastosResponse,
    TopGastosItem,
    PaginatedResponse
)
from app.core.errors import CamaraAPIError

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/v1", tags=["deputados"])

limiter: Optional[Limiter] = None


def set_limiter(limiter_instance: Limiter):
    global limiter
    limiter = limiter_instance


@router.get("/health")
async def health():
    return {"status": "ok", "service": "backend-camara"}


@router.get("/deputados", response_model=PaginatedResponse)
async def listar_deputados(
    pagina: int = Query(1, ge=1),
    itens: int = Query(20, ge=1, le=100),
    nome: Optional[str] = Query(None),
    client: CamaraAPIClient = Depends(get_camara_client)
):
    cache_key = get_cache_key("deputados", pagina=pagina, itens=itens, nome=nome)
    
    if cache_key in lists_cache:
        logger.info(f"Cache hit para {cache_key}")
        cached_data = lists_cache[cache_key]
        return PaginatedResponse(**cached_data)
    
    try:
        logger.info(f"Cache miss para {cache_key}, buscando na API")
        response = await client.listar_deputados(
            pagina=pagina,
            itens=itens,
            nome=nome
        )
        
        dados_raw = response.get("dados", [])
        dados = [
            DeputadoResponse(
                id=d.get("id"),
                nome=d.get("nome"),
                sigla_partido=d.get("siglaPartido"),
                sigla_uf=d.get("siglaUf"),
                url_foto=d.get("urlFoto")
            )
            for d in dados_raw
        ]
        
        links = response.get("links", [])
        total = None
        for link in links:
            if link.get("rel") == "last":
                pass
        
        result = {
            "dados": [d.model_dump() for d in dados],
            "pagina": pagina,
            "itens": itens,
            "total": total
        }
        
        lists_cache[cache_key] = result
        
        return PaginatedResponse(**result)
        
    except CamaraAPIError as e:
        logger.error(f"Erro ao buscar deputados: {e}")
        raise HTTPException(status_code=503, detail=str(e))

CACHE_DURATION_HOURS = 24

@router.get("/deputados/{deputado_id}", response_model=DeputadoDetalhadoResponse)
async def obter_deputado(
    deputado_id: int,
    client: CamaraAPIClient = Depends(get_camara_client),
    repo: DeputadoRepository = Depends(get_deputado_repository)
):
    
    # 1. TENTA BUSCAR NO BANCO DE DADOS (NOSSO CACHE PERSISTENTE)
    deputado_db = await repo.get_deputado_by_id(deputado_id)
    
    if deputado_db:
        logger.info(f"Cache hit no DB para deputado {deputado_id}")
        
        # Verifica se o cache está "fresco"
        last_fetched = datetime.fromisoformat(deputado_db['last_fetched_at'])
        is_stale = (datetime.now(timezone.utc) - last_fetched) > timedelta(hours=CACHE_DURATION_HOURS)
        
        if not is_stale:
            logger.info("Cache fresco. Retornando dados do DB.")
            return DeputadoDetalhadoResponse(**deputado_db)
        
        logger.info("Cache vencido. Buscando na API...")

    # 2. CACHE MISS (ou vencido): BUSCA NA API EXTERNA
    try:
        logger.info(f"Cache miss para deputado {deputado_id}. Buscando na API.")
        deputado_data_api = await client.obter_deputado(deputado_id)
        if not deputado_data_api:
            raise HTTPException(status_code=404, detail="Deputado não encontrado")
        
       # 3. MAPEIA E SALVA NO BANCO
        # Pega os objetos aninhados de forma segura
        status = deputado_data_api.get("ultimoStatus", {})
        gabinete = status.get("gabinete", {})

        deputado_para_salvar = {
            # Campos do nível superior
            "id": deputado_data_api.get("id"),
            "data_nascimento": deputado_data_api.get("dataNascimento"),
            "escolaridade": deputado_data_api.get("escolaridade"),
            "municipio_nascimento": deputado_data_api.get("municipioNascimento"),
             "uf_nascimento": deputado_data_api.get("ufNascimento"),

            # Campos aninhados em 'ultimoStatus'
            "nome": status.get("nome"),
            "sigla_partido": status.get("siglaPartido"),
            "sigla_uf": status.get("siglaUf"),
            "url_foto": status.get("urlFoto"),

            # Campo aninhado em 'ultimoStatus.gabinete'
             "email": gabinete.get("email"),

            # Nosso timestamp
             "last_fetched_at": datetime.now(timezone.utc).isoformat()
 }
        
        await repo.save_deputado(deputado_para_salvar)
        
        # 4. RETORNA A RESPOSTA
        return DeputadoDetalhadoResponse(**deputado_para_salvar)
        
    except CamaraAPIError as e:
        logger.error(f"Erro ao buscar deputado na API: {e}")
        raise HTTPException(status_code=503, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        logger.exception(f"Erro inesperado ao buscar deputado: {e}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")


@router.get("/deputados/{deputado_id}/despesas", response_model=DespesasDeputadoResponse)
async def obter_despesas_deputado(
    deputado_id: int,
    ano: Optional[int] = Query(None, ge=2008),
    client: CamaraAPIClient = Depends(get_camara_client)
):
    cache_key = get_cache_key("despesas_deputado", id=deputado_id, ano=ano)
    
    if cache_key in aggregates_cache:
        logger.info(f"Cache hit para {cache_key}")
        cached_data = aggregates_cache[cache_key]
        return DespesasDeputadoResponse(**cached_data)
    
    try:
        # Precisamos dos dados do deputado para pegar o nome
        deputado_data = await client.obter_deputado(deputado_id)
        if not deputado_data:
            raise HTTPException(status_code=404, detail="Deputado não encontrado")
        
        despesas_data = await client.obter_despesas_deputado(deputado_id, ano=ano)
        
        despesas = despesas_data.get("dados", [])
        total_gastos = sum(
            d.get("valorLiquido", 0) or d.get("valorDocumento", 0) or 0
            for d in despesas
        )
        
        # O import do DespesaResponse estava dentro da função no seu código original
        from app.models.schemas import DespesaResponse
        despesas_normalizadas = [
            DespesaResponse(
                ano=d.get("ano", ano or 2024),
                mes=d.get("mes", 1),
                tipo_despesa=d.get("tipoDespesa"),
                valor_documento=d.get("valorDocumento"),
                valor_liquido=d.get("valorLiquido"),
                fornecedor=d.get("fornecedor", {}).get("nome") if isinstance(d.get("fornecedor"), dict) else d.get("fornecedor")
            )
            for d in despesas
        ]
        
        result = {
            "deputado_id": deputado_id,
            "deputado_nome": deputado_data.get("nome", "Desconhecido"),
            "ano": ano or 2024,
            "total_gastos": total_gastos,
            "despesas": [d.model_dump() for d in despesas_normalizadas]
        }
        
        aggregates_cache[cache_key] = result
        
        return DespesasDeputadoResponse(**result)
        
    except CamaraAPIError as e:
        logger.error(f"Erro ao buscar despesas: {e}")
        raise HTTPException(status_code=503, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        logger.exception(f"Erro inesperado ao buscar despesas: {e}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")


@router.get("/votacoes/{votacao_id}/votos", response_model=VotacaoVotosResponse)
async def obter_votos_votacao(
    votacao_id: int,
    client: CamaraAPIClient = Depends(get_camara_client)
):
    cache_key = get_cache_key("votos_votacao", id=votacao_id)
    
    if cache_key in aggregates_cache:
        logger.info(f"Cache hit para {cache_key}")
        cached_data = aggregates_cache[cache_key]
        return VotacaoVotosResponse(**cached_data)
    
    try:
        votos_data = await client.obter_votos_votacao(votacao_id)
        
        votos_raw = votos_data.get("dados", [])
        votos = [
            VotoResponse(
                deputado_id=v.get("deputado", {}).get("id") if isinstance(v.get("deputado"), dict) else None,
                deputado_nome=v.get("deputado", {}).get("nome") if isinstance(v.get("deputado"), dict) else None,
                sigla_partido=v.get("deputado", {}).get("siglaPartido") if isinstance(v.get("deputado"), dict) else None,
                sigla_uf=v.get("deputado", {}).get("siglaUf") if isinstance(v.get("deputado"), dict) else None,
                voto=v.get("voto")
            )
            for v in votos_raw
        ]
        
        result = {
            "votacao_id": votacao_id,
            "votos": [v.model_dump() for v in votos]
        }
        
        aggregates_cache[cache_key] = result
        
        return VotacaoVotosResponse(**result)
        
    except CamaraAPIError as e:
        logger.error(f"Erro ao buscar votos: {e}")
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        logger.exception(f"Erro inesperado ao buscar votos: {e}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")


@router.get("/gastos/top", response_model=TopGastosResponse)
async def obter_top_gastos(
    ano: int = Query(2024, ge=2008),
    limite: int = Query(10, ge=1, le=100),
    client: CamaraAPIClient = Depends(get_camara_client)
):
    cache_key = get_cache_key("top_gastos", ano=ano, limite=limite)
    
    if cache_key in aggregates_cache:
        logger.info(f"Cache hit para {cache_key}")
        cached_data = aggregates_cache[cache_key]
        return TopGastosResponse(**cached_data)
    
    try:
        response = await client.listar_deputados(pagina=1, itens=100)
        deputados_raw = response.get("dados", [])
        
        resultados = []
        
        for dep in deputados_raw[:50]:
            try:
                despesas_data = await client.obter_despesas_deputado(dep.get("id"), ano=ano)
                despesas = despesas_data.get("dados", [])
                total = sum(
                    d.get("valorLiquido", 0) or d.get("valorDocumento", 0) or 0
                    for d in despesas
                )
                
                if total > 0:
                    resultados.append({
                        "deputado_id": dep.get("id"),
                        "deputado_nome": dep.get("nome"),
                        "sigla_partido": dep.get("siglaPartido"),
                        "sigla_uf": dep.get("siglaUf"),
                        "total_gastos": total
                    })
            except Exception as e:
                logger.warning(f"Erro ao buscar gastos do deputado {dep.get('id')}: {e}")
                continue
        
        resultados.sort(key=lambda x: x["total_gastos"], reverse=True)
        resultados = resultados[:limite]
        
        result = {
            "ano": ano,
            "limite": limite,
            "resultados": resultados
        }
        
        aggregates_cache[cache_key] = result
        
        return TopGastosResponse(**result)
        
    except CamaraAPIError as e:
        logger.error(f"Erro ao buscar top gastos: {e}")
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        logger.exception(f"Erro inesperado ao buscar top gastos: {e}")
        raise HTTPException(status_code=500, detail="Erro interno do servidor")

