<#
.SYNOPSIS
    Sets up the required Environment Variables for the Agentic Job Search workflow on Windows.
.DESCRIPTION
    This script prompts the user for their API keys and configures the User-level environment variables
    required for n8n to function correctly in "Bare Metal" mode (Node.js).
    It also disables the n8n security block that prevents Code Nodes from reading env vars.
.NOTES
    Run this script using PowerShell. You may need to restart your terminal or IDE afterwards.
#>

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "🤖 Agentic Job Intelligence - Environment Setup" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# 1. Configure n8n Security Bypass (CRITICAL for Code Nodes)
# This allows your JavaScript nodes to read $env.SERPER_API_KEY
Write-Host "Step 1: Configuring n8n Security Settings..." -ForegroundColor Yellow
[System.Environment]::SetEnvironmentVariable('N8N_BLOCK_ENV_ACCESS_IN_NODE', 'false', 'User')
Write-Host "✅ Success: N8N_BLOCK_ENV_ACCESS_IN_NODE set to 'false'" -ForegroundColor Green
Write-Host ""

# 2. Configure Serper API Key (Search)
Write-Host "Step 2: Configuring Search API (Serper.dev)" -ForegroundColor Yellow
$serperKey = Read-Host "Enter your Serper API Key (starts with gl_...)"

if (-not [string]::IsNullOrWhiteSpace($serperKey)) {
    [System.Environment]::SetEnvironmentVariable('SERPER_API_KEY', $serperKey, 'User')
    Write-Host "✅ Success: SERPER_API_KEY saved." -ForegroundColor Green
} else {
    Write-Host "⚠️  Skipped: Serper Key was empty." -ForegroundColor Red
}
Write-Host ""

# 3. Configure Gemini/PaLM API Key (Intelligence)
Write-Host "Step 3: Configuring AI Model (Google Gemini/PaLM)" -ForegroundColor Yellow
$geminiKey = Read-Host "Enter your Google Gemini API Key"

if (-not [string]::IsNullOrWhiteSpace($geminiKey)) {
    [System.Environment]::SetEnvironmentVariable('GOOGLE_PALM_API_KEY', $geminiKey, 'User')
    # Note: n8n might look for specific env vars depending on the node version, 
    # but usually you map this inside the Credential UI. We set it here just in case custom JS needs it.
    Write-Host "✅ Success: GOOGLE_PALM_API_KEY saved." -ForegroundColor Green
} else {
    Write-Host "⚠️  Skipped: Gemini Key was empty." -ForegroundColor Red
}
Write-Host ""

# 4. Final Instructions
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "🎉 Setup Complete!" -ForegroundColor Cyan
Write-Host "IMPORTANT: Windows terminals do not update variables instantly." -ForegroundColor Yellow
Write-Host "👉 You must CLOSE this terminal and open a new one before running 'n8n start'." -ForegroundColor Yellow
Write-Host "=============================================" -ForegroundColor Cyan

Pause