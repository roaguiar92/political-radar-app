# em app/core/database.py
from supabase import create_client, Client # <-- Corrigido
from app.core.config import settings
from typing import Optional

_supabase_client: Optional[Client] = None # <-- Corrigido

def get_supabase_client() -> Client: # <-- Corrigido
    """
    Retorna uma instância singleton do cliente Supabase.
    """
    global _supabase_client
    if _supabase_client is None:
        if not settings.SUPABASE_URL or not settings.SUPABASE_SERVICE_KEY:
            raise ValueError("SUPABASE_URL e SUPABASE_SERVICE_KEY devem ser definidos.")
        
        # Corrigido para create_client
        _supabase_client = create_client( 
            settings.SUPABASE_URL,
            settings.SUPABASE_SERVICE_KEY
        )
        print("Cliente Supabase inicializado.") # <-- Corrigido
    
    return _supabase_client