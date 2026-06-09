#!/bin/bash
set -e

VENV_DIR=".ai/infra/venv"
echo "🚀 Setting up LiteLLM virtual environment..."

# Only create venv if it doesn't exist
if [ ! -d "$VENV_DIR" ]; then
    echo "→ Creating new virtual environment..."
    python3 -m venv "$VENV_DIR" --upgrade-deps
else
    echo "→ Virtual environment already exists. Skipping creation."
fi

# Always upgrade pip and ensure litellm is installed (idempotent)
echo "→ Installing / upgrading LiteLLM..."
"$VENV_DIR/bin/pip" install --upgrade pip
"$VENV_DIR/bin/pip" install --upgrade 'litellm[proxy]'

echo "✅ LiteLLM setup complete!"
echo "   You can now run: npm run sidekick:up"