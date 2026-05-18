import logging
from supabase import Client
from typing import Optional, Dict, Any
from app.core.database import get_supabase_client
from app.core.config import settings

logger = logging.getLogger(__name__)


class DeputadoRepository:
    def __init__(self, db_client: Client):
        self.db = db_client

    async def get_deputado_by_id(self, deputado_id: int) -> Optional[Dict[str, Any]]:
        try:
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
        try:
            await self.db.table("deputados") \
                .upsert(deputado_data) \
                .execute()
            logger.info(f"Deputado {deputado_data.get('id')} salvo no DB.")
        except Exception as e:
            logger.error(f"Erro ao salvar deputado {deputado_data.get('id')} no DB: {e}")


class NullDeputadoRepository:
    """Repositório stub usado quando Supabase não está configurado. Sem cache persistente."""

    async def get_deputado_by_id(self, deputado_id: int) -> Optional[Dict[str, Any]]:
        return None

    async def save_deputado(self, deputado_data: Dict[str, Any]):
        pass


def get_deputado_repository():
    if not settings.SUPABASE_URL or not settings.SUPABASE_SERVICE_KEY:
        return NullDeputadoRepository()
    db_client = get_supabase_client()
    return DeputadoRepository(db_client)