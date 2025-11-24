import pytest
from app.models.schemas import TopGastosItem


def test_ordenacao_top_gastos():
    items = [
        TopGastosItem(
            deputado_id=1,
            deputado_nome="Deputado A",
            total_gastos=1000.0
        ),
        TopGastosItem(
            deputado_id=2,
            deputado_nome="Deputado B",
            total_gastos=5000.0
        ),
        TopGastosItem(
            deputado_id=3,
            deputado_nome="Deputado C",
            total_gastos=2000.0
        ),
    ]
    
    items_ordenados = sorted(items, key=lambda x: x.total_gastos, reverse=True)
    
    assert items_ordenados[0].deputado_id == 2
    assert items_ordenados[0].total_gastos == 5000.0
    assert items_ordenados[1].deputado_id == 3
    assert items_ordenados[2].deputado_id == 1


def test_calculo_total_gastos():
    despesas = [
        {"valorLiquido": 100.0, "valorDocumento": 120.0},
        {"valorLiquido": 200.0, "valorDocumento": 250.0},
        {"valorLiquido": None, "valorDocumento": 50.0},
        {"valorLiquido": 0, "valorDocumento": None},
    ]
    
    total = sum(
        d.get("valorLiquido", 0) or d.get("valorDocumento", 0) or 0
        for d in despesas
    )
    
    assert total == 470.0

