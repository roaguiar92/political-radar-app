import pytest
from app.core.cache import get_cache_key, lists_cache, aggregates_cache


def test_geracao_chave_cache():
    chave1 = get_cache_key("deputados", pagina=1, itens=20, nome="Silva")
    chave2 = get_cache_key("deputados", pagina=1, itens=20, nome="Silva")
    chave3 = get_cache_key("deputados", pagina=2, itens=20)
    
    assert chave1 == chave2
    assert chave1 != chave3
    assert "deputados" in chave1
    assert "pagina_1" in chave1


def test_cache_armazenamento():
    chave = "test_key"
    valor = {"test": "data"}
    
    lists_cache[chave] = valor
    assert chave in lists_cache
    assert lists_cache[chave] == valor
    
    del lists_cache[chave]

