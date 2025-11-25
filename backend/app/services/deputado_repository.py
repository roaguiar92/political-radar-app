import logging
from supabase import Client # <-- Importação correta e única
from typing import Optional, Dict, Any
from app.core.database import get_supabase_client

logger = logging.getLogger(__name__)

class DeputadoRepository:
    
    # O __init__ agora espera o Client normal
    def __init__(self, db_client: Client): # <-- Corrigido
        self.db = db_client

    async def get_deputado_by_id(self, deputado_id: int) -> Optional[Dict[str, Any]]:
        """Busca um deputado no banco de dados pelo ID."""
        try:
            # Os 'await' aqui estão CORRETOS. O 'Client' sabe lidar com eles.
            response = await self.db.table("deputados") \
                .select("*") \
                .eq("id", deputado_id) \
                .single() \
                .execute()
            
            return response.data
        except Exception as e:
            logger.info(f"Deputado {deputado_id} não encontrado no DB: {e}")
            return None

    async def save_deputado(self, deputado_data: Dict[str, Any]):
        """Salva (Insere ou Atualiza) os dados de um deputado."""
        try:
            await self.db.table("deputados") \
                .upsert(deputado_data) \
                .execute()
            
            logger.info(f"Deputado {deputado_data.get('id')} salvo no DB.")
        except Exception as e:
            logger.error(f"Erro ao salvar deputado {deputado_data.get('id')} no DB: {e}")

# --- Função para Injeção de Dependência ---
def get_deputado_repository() -> DeputadoRepository:
    db_client = get_supabase_client()
    return DeputadoRepository(db_client)