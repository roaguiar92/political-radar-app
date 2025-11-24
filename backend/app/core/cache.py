from cachetools import TTLCache
from app.core.config import settings

lists_cache: TTLCache = TTLCache(
    maxsize=1000,
    ttl=settings.CACHE_TTL_LISTS
)

aggregates_cache: TTLCache = TTLCache(
    maxsize=500,
    ttl=settings.CACHE_TTL_AGGREGATES
)


def get_cache_key(prefix: str, **kwargs) -> str:
    params = "_".join(f"{k}_{v}" for k, v in sorted(kwargs.items()) if v is not None)
    return f"{prefix}_{params}" if params else prefix

