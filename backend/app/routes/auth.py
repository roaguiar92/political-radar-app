import logging
from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from app.core.database import get_supabase_client
from app.core.config import settings
from app.models.schemas import UserCreate, UserLogin, TokenResponse

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/auth", tags=["auth"])

_SUPABASE_UNAVAILABLE = HTTPException(
    status_code=503,
    detail="Autenticação não disponível: Supabase não configurado."
)


@router.post("/signup")
async def signup(user_data: UserCreate):
    """Cria um novo usuário no Supabase Auth."""
    if not settings.SUPABASE_URL or not settings.SUPABASE_SERVICE_KEY:
        raise _SUPABASE_UNAVAILABLE
    supabase = get_supabase_client()
    try:
        user = supabase.auth.sign_up({
            "email": user_data.email,
            "password": user_data.password
        })
        if user.user:
            return {"message": "Usuário criado com sucesso", "user_id": user.user.id}
    except Exception as e:
        logger.error(f"Erro no signup: {e}")
        if hasattr(e, 'message'):
            raise HTTPException(status_code=400, detail=e.message)
        raise HTTPException(status_code=400, detail=f"Não foi possível criar usuário: {str(e)}")


@router.post("/login", response_model=TokenResponse)
async def login(user_data: UserLogin):
    """Autentica um usuário e retorna um token JWT."""
    if not settings.SUPABASE_URL or not settings.SUPABASE_SERVICE_KEY:
        raise _SUPABASE_UNAVAILABLE
    supabase = get_supabase_client()
    try:
        session = supabase.auth.sign_in_with_password({
            "email": user_data.email,
            "password": user_data.password
        })
        if session.session:
            return TokenResponse(
                access_token=session.session.access_token,
                refresh_token=session.session.refresh_token
            )
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    except Exception as e:
        logger.error(f"Erro no login: {e}")
        if hasattr(e, 'message'):
            raise HTTPException(status_code=401, detail=e.message)
        raise HTTPException(status_code=401, detail="Email ou senha incorretos")