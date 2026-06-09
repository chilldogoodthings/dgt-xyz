#!/bin/bash
# =============================================================================
# DGT - Ensure correct Node version via NVM
# Robust version that handles common MacBook Pro / non-interactive shell cases
# =============================================================================

# Try to load NVM if it's not already available
if ! command -v nvm &> /dev/null; then
    # Common NVM locations on macOS
    if [ -s "$HOME/.nvm/nvm.sh" ]; then
        source "$HOME/.nvm/nvm.sh"
    elif [ -s "/opt/homebrew/opt/nvm/nvm.sh" ]; then
        source "/opt/homebrew/opt/nvm/nvm.sh"
    elif [ -s "/usr/local/opt/nvm/nvm.sh" ]; then
        source "/usr/local/opt/nvm/nvm.sh"
    else
        echo "❌ NVM is not installed or could not be found."
        echo "   Please install NVM: https://github.com/nvm-sh/nvm"
        echo "   Then restart your terminal or run: source ~/.nvm/nvm.sh"
        exit 1
    fi
fi

# Now that NVM is loaded, use the version from .nvmrc
nvm use --silent

echo "✅ Node version verified: $(node -v) (from .nvmrc)"