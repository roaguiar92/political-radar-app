import httpx
import backoff
import logging
from typing import Dict, List, Optional, Any
from app.core.config import settings
from app.core.errors import CamaraAPIError

logger = logging.getLogger(__name__)


class CamaraAPIClient:
    def __init__(self):
        self.base_url = settings.CAMARA_API_BASE_URL
        self.timeout = settings.HTTP_TIMEOUT
        self.client = httpx.AsyncClient(
            base_url=self.base_url,
            timeout=self.timeout,
            headers={"Accept": "application/json"}
        )
    
    @backoff.on_exception(
        backoff.expo,
        (httpx.TimeoutException, httpx.NetworkError),
        max_tries=settings.HTTP_MAX_RETRIES + 1,
        max_time=30
    )
    async def _request(self, endpoint: str, params: Optional[Dict] = None) -> Dict[str, Any]:
        try:
            logger.info(f"Requisição à API: {endpoint} com params: {params}")
            response = await self.client.get(endpoint, params=params)
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            logger.error(f"Erro HTTP {e.response.status_code}: {e.response.text}")
            raise CamaraAPIError(f"Erro ao acessar API: {e.response.status_code}")
        except (httpx.TimeoutException, httpx.NetworkError) as e:
            logger.error(f"Erro de rede/timeout: {e}")
            raise CamaraAPIError(f"Erro de conexão com API: {str(e)}")
        except Exception as e:
            logger.error(f"Erro inesperado: {e}")
            raise CamaraAPIError(f"Erro inesperado: {str(e)}")
    
    async def listar_deputados(
        self,
        pagina: int = 1,
        itens: int = 20,
        nome: Optional[str] = None,
        sigla_uf: Optional[str] = None,
        sigla_partido: Optional[str] = None
    ) -> Dict[str, Any]:
        params = {
            "pagina": pagina,
            "itens": itens,
            "ordem": "ASC",
            "ordenarPor": "nome"
        }
        
        if nome:
            params["nome"] = nome
        if sigla_uf:
            params["siglaUf"] = sigla_uf
        if sigla_partido:
            params["siglaPartido"] = sigla_partido
        
        return await self._request("/deputados", params=params)
    
    async def obter_deputado(self, deputado_id: int) -> Dict[str, Any]:
        response = await self._request(f"/deputados/{deputado_id}")
        dados = response.get("dados", {})
        return dados
    
    async def obter_despesas_deputado(
        self,
        deputado_id: int,
        ano: Optional[int] = None,
        mes: Optional[int] = None
    ) -> Dict[str, Any]:
        params = {}
        if ano:
            params["ano"] = ano
        if mes:
            params["mes"] = mes
        
        endpoint = f"/deputados/{deputado_id}/despesas"
        return await self._request(endpoint, params=params)
    
    async def obter_votos_votacao(self, votacao_id: int) -> Dict[str, Any]:
        endpoint = f"/votacoes/{votacao_id}/votos"
        return await self._request(endpoint)
    
    async def close(self):
        await self.client.aclose()


_client: Optional[CamaraAPIClient] = None


async def get_camara_client() -> CamaraAPIClient:
    global _client
    if _client is None:
        _client = CamaraAPIClient()
    return _client

