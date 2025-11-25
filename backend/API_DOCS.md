# Documentação da API - Retornos Esperados

Base URL: `http://localhost:8000/api/v1`

## GET /deputados

Lista deputados com paginação e filtros opcionais.

### Parâmetros de Query

- `pagina` (int, padrão: 1): Número da página
- `itens` (int, padrão: 20, máx: 100): Itens por página
- `nome` (string, opcional): Filtro por nome

### Exemplo de Requisição

```
GET /api/v1/deputados?pagina=1&itens=20&nome=Silva
```

### Exemplo de Resposta

```json
{
  "dados": [
    {
      "id": 204554,
      "nome": "Deputado Exemplo",
      "sigla_partido": "PT",
      "sigla_uf": "SP",
      "url_foto": "https://www.camara.leg.br/internet/deputado/bandep/204554.jpg"
    },
    {
      "id": 204555,
      "nome": "Outro Deputado",
      "sigla_partido": "PSDB",
      "sigla_uf": "RJ",
      "url_foto": "https://www.camara.leg.br/internet/deputado/bandep/204555.jpg"
    }
  ],
  "pagina": 1,
  "itens": 20,
  "total": null
}
```

## GET /deputados/{id}

Obtém dados detalhados de um deputado específico.

### Parâmetros de Path

- `id` (int): ID do deputado

### Exemplo de Requisição

```
GET /api/v1/deputados/204554
```

### Exemplo de Resposta

```json
{
  "id": 204554,
  "nome": "Deputado Exemplo",
  "sigla_partido": "PT",
  "sigla_uf": "SP",
  "url_foto": "https://www.camara.leg.br/internet/deputado/bandep/204554.jpg",
  "email": "deputado.exemplo@camara.leg.br",
  "data_nascimento": "1970-01-15",
  "escolaridade": "Superior",
  "municipio_nascimento": "São Paulo",
  "uf_nascimento": "SP"
}
```

## GET /deputados/{id}/despesas

Obtém despesas da cota parlamentar de um deputado.

### Parâmetros de Path

- `id` (int): ID do deputado

### Parâmetros de Query

- `ano` (int, opcional, mín: 2008): Ano das despesas. Se não informado, usa o ano atual.

### Exemplo de Requisição

```
GET /api/v1/deputados/204554/despesas?ano=2024
```

### Exemplo de Resposta

```json
{
  "deputado_id": 204554,
  "deputado_nome": "Deputado Exemplo",
  "ano": 2024,
  "total_gastos": 125000.50,
  "despesas": [
    {
      "ano": 2024,
      "mes": 1,
      "tipo_despesa": "Combustível",
      "valor_documento": 1500.00,
      "valor_liquido": 1450.00,
      "fornecedor": "Posto ABC"
    },
    {
      "ano": 2024,
      "mes": 1,
      "tipo_despesa": "Alimentação",
      "valor_documento": 800.00,
      "valor_liquido": 750.00,
      "fornecedor": "Restaurante XYZ"
    }
  ]
}
```

## GET /votacoes/{id}/votos

Obtém todos os votos de uma votação específica.

### Parâmetros de Path

- `id` (int): ID da votação

### Exemplo de Requisição

```
GET /api/v1/votacoes/12345/votos
```

### Exemplo de Resposta

```json
{
  "votacao_id": 12345,
  "votos": [
    {
      "deputado_id": 204554,
      "deputado_nome": "Deputado Exemplo",
      "sigla_partido": "PT",
      "sigla_uf": "SP",
      "voto": "Sim"
    },
    {
      "deputado_id": 204555,
      "deputado_nome": "Outro Deputado",
      "sigla_partido": "PSDB",
      "sigla_uf": "RJ",
      "voto": "Não"
    },
    {
      "deputado_id": 204556,
      "deputado_nome": "Terceiro Deputado",
      "sigla_partido": "MDB",
      "sigla_uf": "MG",
      "voto": "Abstenção"
    }
  ]
}
```

## Códigos de Status HTTP

- `200 OK`: Requisição bem-sucedida
- `404 Not Found`: Recurso não encontrado (ex: deputado não existe)
- `503 Service Unavailable`: Erro ao acessar API da Câmara
- `500 Internal Server Error`: Erro interno do servidor
- `429 Too Many Requests`: Rate limit excedido

## Tratamento de Erros

### Erro 404

```json
{
  "detail": "Deputado não encontrado"
}
```

### Erro 503

```json
{
  "error": "Serviço temporariamente indisponível",
  "message": "Não foi possível acessar a API da Câmara dos Deputados. Tente novamente mais tarde."
}
```

### Erro 500

```json
{
  "error": "Erro interno do servidor",
  "message": "Ocorreu um erro inesperado. Tente novamente mais tarde."
}
```

### Erro 429 (Rate Limit)

```json
{
  "error": "Too Many Requests"
}
```

## Notas Importantes

- Todos os campos opcionais podem retornar `null`
- Valores monetários são retornados como números decimais (float)
- Datas são retornadas no formato ISO 8601 (YYYY-MM-DD)
- O campo `voto` pode conter valores como: "Sim", "Não", "Abstenção", "Obstrução", ou `null`
- O cache é aplicado automaticamente, então requisições repetidas podem retornar dados em cache
- Rate limit: máximo de 100 requisições a cada 15 minutos por IP

