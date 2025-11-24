from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse
import logging

logger = logging.getLogger(__name__)


class CamaraAPIError(Exception):
    pass


async def camara_api_exception_handler(request: Request, exc: CamaraAPIError):
    logger.error(f"Erro ao acessar API da Câmara: {exc}")
    return JSONResponse(
        status_code=503,
        content={
            "error": "Serviço temporariamente indisponível",
            "message": "Não foi possível acessar a API da Câmara dos Deputados. Tente novamente mais tarde."
        }
    )


async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "status_code": exc.status_code
        }
    )


async def general_exception_handler(request: Request, exc: Exception):
    logger.exception(f"Erro não tratado: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Erro interno do servidor",
            "message": "Ocorreu um erro inesperado. Tente novamente mais tarde."
        }
    )

