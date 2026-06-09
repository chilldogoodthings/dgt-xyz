#!/bin/bash
# =============================================================================
# DGT Sidekick LiteLLM Proxy Launcher
# Starts the LiteLLM OpenAI-compatible proxy on port 4000 for Roo Code.
# Supports loading variables from .env.local or .env
# =============================================================================

# Get absolute path to the project root
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

# ====================== NODE VERSION ENFORCEMENT ======================
# Ensure correct Node.js version (via .nvmrc) before any other operations
source "$PROJECT_ROOT/.ai/scripts/ensure-node.sh"
# =====================================================================

VENV="$PROJECT_ROOT/.ai/infra/venv/bin/activate"
CONFIG="$PROJECT_ROOT/.ai/infra/router-config.yaml"
LOG="$PROJECT_ROOT/.ai/infra/litellm.log"
PORT=4000

echo "🚀 Loading environment variables..."

# 1. Determine which env file to use (prioritize .env.local)
if [ -f "$PROJECT_ROOT/.env.local" ]; then
    ENV_FILE="$PROJECT_ROOT/.env.local"
    echo "   → Found .env.local"
elif [ -f "$PROJECT_ROOT/.env" ]; then
    ENV_FILE="$PROJECT_ROOT/.env"
    echo "   → Found .env"
else
    echo "⚠️  No .env or .env.local found. Ensure your API keys are set elsewhere."
fi

# 2. Export variables if an env file was found
if [ -n "$ENV_FILE" ]; then
    # Export variables, handling potential spaces/quotes
    export $(grep -v '^#' "$ENV_FILE" | xargs)
fi

echo "🚀 Starting DGT LiteLLM Router..."

# 3. Kill any existing instances to avoid "Port already in use" errors
pkill -f litellm && sleep 1

# 4. Activate the virtual environment
if [ -f "$VENV" ]; then
    source "$VENV"
else
    echo "❌ Error: Virtual environment not found at $VENV"
    echo "   Run the setup phase first."
    exit 1
fi

# 5. Start the proxy in the background
# Removed --log_level as it is no longer a valid CLI argument
nohup litellm --config "$CONFIG" --port $PORT --num_workers 4 > "$LOG" 2>&1 &

# 6. Wait and Verify
sleep 3

if ps aux | grep -v grep | grep -q "litellm"; then
    echo "✅ LiteLLM router started! PID: $!"
    echo "   → Endpoint: http://localhost:$PORT"
    echo "   → Models available: dgt-smart-coder, dgt-arch-model"
    echo "   → Logs: tail -f .ai/infra/litellm.log"
    echo ""
    echo "You can now safely close this terminal or press Enter."
else
    echo "❌ Error: LiteLLM failed to start. Printing last 10 lines of log:"
    tail -n 10 "$LOG"
fi