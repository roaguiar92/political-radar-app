# Backend - API Dados Abertos Câmara

Backend FastAPI que funciona como proxy e cache para a API Dados Abertos da Câmara dos Deputados.

## 📋 Pré-requisitos

- Python 3.12 ou superior
- pip (gerenciador de pacotes Python)
- Supabase (para banco de dados opcional)

## 🚀 Como Usar

### 1. Instalação das Dependências

Primeiro, certifique-se de estar no diretório `backend`:

```bash
cd backend
```

Se você estiver usando um ambiente virtual (venv), ative-o:

```bash
# Se o venv estiver no diretório pai
source ../venv/bin/activate

# Ou crie um novo ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

### 2. Configuração do Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure as variáveis de ambiente:

```env
# Porta do servidor (padrão: 8000)
PORT=8000

# URLs permitidas para CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Configurações do Supabase (obrigatórias)
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_KEY=sua-service-key-aqui
```

**Nota**: Se você não estiver usando o Supabase para cache persistente, pode deixar `SUPABASE_URL` e `SUPABASE_SERVICE_KEY` vazios, mas algumas funcionalidades podem não funcionar.

### 3. Executar o Backend

#### Opção 1: Executar diretamente com Python

```bash
python -m app.main
```

ou

```bash
python app/main.py
```

#### Opção 2: Executar com Uvicorn (recomendado)

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

O parâmetro `--reload` ativa o reload automático quando você modifica arquivos.

### 4. Verificar se está funcionando

Acesse no navegador ou faça uma requisição:

- **Página inicial**: http://localhost:8000
- **Documentação interativa (Swagger)**: http://localhost:8000/docs
- **Documentação alternativa (ReDoc)**: http://localhost:8000/redoc
- **Health check**: http://localhost:8000/api/v1/health

## 📡 Endpoints Disponíveis

### Autenticação

- `POST /api/v1/auth/signup` - Criar novo usuário
- `POST /api/v1/auth/login` - Login e obter token

### Deputados

- `GET /api/v1/deputados` - Listar deputados (com paginação e filtros)
- `GET /api/v1/deputados/{id}` - Obter detalhes de um deputado
- `GET /api/v1/deputados/{id}/despesas` - Obter despesas de um deputado
- `GET /api/v1/gastos/top` - Obter top gastadores

### Votações

- `GET /api/v1/votacoes/{id}/votos` - Obter votos de uma votação

Para mais detalhes sobre os endpoints, consulte o arquivo `API_DOCS.md` ou acesse `/docs` no servidor.

## 🐳 Executar com Docker

Se preferir usar Docker:

```bash
# Construir a imagem
docker build -t backend-camara .

# Executar o container
docker run -p 8000:8000 --env-file .env backend-camara
```

## 🧪 Testes

Para executar os testes:

```bash
pytest
```

## 📝 Variáveis de Ambiente

| Variável | Descrição | Padrão | Obrigatória |
|----------|-----------|--------|-------------|
| `PORT` | Porta do servidor | `8000` | Não |
| `ALLOWED_ORIGINS` | URLs permitidas para CORS (separadas por vírgula) | `http://localhost:5173,http://localhost:3000` | Não |
| `SUPABASE_URL` | URL do projeto Supabase | - | Sim (para cache persistente) |
| `SUPABASE_SERVICE_KEY` | Service key do Supabase | - | Sim (para cache persistente) |
| `CAMARA_API_BASE_URL` | URL base da API da Câmara | `https://dadosabertos.camara.leg.br/api/v2` | Não |
| `CACHE_TTL_LISTS` | TTL do cache para listas (segundos) | `1800` | Não |
| `CACHE_TTL_AGGREGATES` | TTL do cache para agregações (segundos) | `7200` | Não |
| `RATE_LIMIT_WINDOW` | Janela de tempo para rate limit (segundos) | `900` | Não |
| `RATE_LIMIT_MAX` | Máximo de requisições por janela | `100` | Não |

## 🔧 Características

- ✅ **Cache em memória** para listas e agregações
- ✅ **Cache persistente** no Supabase para dados de deputados
- ✅ **Rate limiting** para proteger contra abuso
- ✅ **Retry automático** com backoff para chamadas à API externa
- ✅ **Tratamento de erros** robusto
- ✅ **CORS configurável**
- ✅ **Documentação interativa** com Swagger/OpenAPI

## 📚 Estrutura do Projeto

```
backend/
├── app/
│   ├── core/          # Configurações e utilitários
│   ├── models/        # Schemas Pydantic
│   ├── routes/        # Rotas da API
│   ├── services/      # Serviços de negócio
│   └── main.py        # Aplicação principal
├── tests/             # Testes automatizados
├── requirements.txt   # Dependências Python
├── Dockerfile         # Imagem Docker
└── API_DOCS.md        # Documentação da API
```

## 🐛 Solução de Problemas

### Erro ao conectar com Supabase

Certifique-se de que `SUPABASE_URL` e `SUPABASE_SERVICE_KEY` estão corretos no arquivo `.env`.

### CORS bloqueando requisições

Adicione a URL do seu frontend em `ALLOWED_ORIGINS` no arquivo `.env`.

### Porta já em uso

Altere a porta no arquivo `.env` ou use `--port` no comando uvicorn:

```bash
uvicorn app.main:app --reload --port 8001
```


