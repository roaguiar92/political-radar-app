#!/bin/bash
# Inicia o backend (porta 8003) e o frontend (porta 5500) em paralelo.
# Use Ctrl+C para encerrar ambos.

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Iniciando backend em http://localhost:8003 ..."
(cd "$SCRIPT_DIR/backend" && venv/bin/python -m app.main) &
BACKEND_PID=$!

echo "Iniciando frontend em http://localhost:5500 ..."
(cd "$SCRIPT_DIR/frontend" && python3 -m http.server 5500) &
FRONTEND_PID=$!

echo ""
echo "Backend:  http://localhost:8003"
echo "Frontend: http://localhost:5500"
echo "Swagger:  http://localhost:8003/docs"
echo ""
echo "Pressione Ctrl+C para encerrar."

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" SIGINT SIGTERM
wait
