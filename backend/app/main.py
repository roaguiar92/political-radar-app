import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.core.config import settings
from app.core.errors import (
    CamaraAPIError,
    camara_api_exception_handler,
    http_exception_handler,
    general_exception_handler
)
from app.routes.deputados import router as deputados_router, set_limiter
from app.services.camara_api import get_camara_client
from app.routes.auth import router as auth_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Iniciando aplicação...")
    set_limiter(limiter)
    yield
    logger.info("Encerrando aplicação...")
    client = await get_camara_client()
    await client.close()


app = FastAPI(
    title="Backend Dados Abertos Câmara",
    description="Backend proxy com cache para API Dados Abertos da Câmara dos Deputados",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],    
    allow_headers=["*"],
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_exception_handler(CamaraAPIError, camara_api_exception_handler)
app.add_exception_handler(Exception, general_exception_handler)
app.include_router(deputados_router)
app.include_router(auth_router)


@app.get("/")
async def root():
    return {
        "message": "Backend Dados Abertos Câmara",
        "version": "1.0.0",
        "docs": "/docs"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=settings.PORT,
        reload=True
    )

