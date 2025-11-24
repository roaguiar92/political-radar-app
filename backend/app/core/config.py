import os
from typing import List
from dotenv import load_dotenv

load_dotenv()


class Settings:
    PORT: int = int(os.getenv("PORT", "8000"))
    CACHE_TTL_LISTS: int = int(os.getenv("CACHE_TTL_LISTS", "1800"))
    CACHE_TTL_AGGREGATES: int = int(os.getenv("CACHE_TTL_AGGREGATES", "7200"))
    RATE_LIMIT_WINDOW: int = int(os.getenv("RATE_LIMIT_WINDOW", "900"))
    RATE_LIMIT_MAX: int = int(os.getenv("RATE_LIMIT_MAX", "100"))
    ALLOWED_ORIGINS: List[str] = os.getenv(
        "ALLOWED_ORIGINS", 
        "http://localhost:5173,http://localhost:3000"
    ).split(",")
    CAMARA_API_BASE_URL: str = os.getenv(
        "CAMARA_API_BASE_URL",
        "https://dadosabertos.camara.leg.br/api/v2"
    )
    HTTP_TIMEOUT: int = 10
    HTTP_MAX_RETRIES: int = 2
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_SERVICE_KEY: str = os.getenv("SUPABASE_SERVICE_KEY", "")


settings = Settings()

