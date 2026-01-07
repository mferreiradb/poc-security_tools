# 🚀 Quick Start - POC Ferramentas de Segurança

Este guia rápido mostra como testar as ferramentas em menos de 5 minutos.

## ⚡ Teste Rápido do Gitleaks

### 1. Instalar Gitleaks

```bash
# macOS
brew install gitleaks

# Linux (Ubuntu/Debian)
wget https://github.com/gitleaks/gitleaks/releases/download/v8.18.1/gitleaks_8.18.1_linux_x64.tar.gz
tar -xzf gitleaks_8.18.1_linux_x64.tar.gz
sudo mv gitleaks /usr/local/bin/
rm gitleaks_8.18.1_linux_x64.tar.gz

# Verificar instalação
gitleaks version
```

### 2. Escanear os Exemplos (30 segundos)

```bash
# Escanear TODOS os exemplos e ver secrets detectadas
gitleaks detect --source=gitleaks/examples --verbose --redact

# Você deverá ver ~80 secrets detectadas! 🔐
```

### 3. Ver Secrets Específicas

```bash
# Frontend - API Keys, OAuth, Payment
gitleaks detect --source=gitleaks/examples/frontend --verbose

# Backend - Database, JWT, Private Keys
gitleaks detect --source=gitleaks/examples/backend --verbose

# Arquivo específico
gitleaks detect --source=gitleaks/examples/backend/.env.production --verbose
```

### 4. Gerar Relatório JSON

```bash
# Gerar relatório detalhado
gitleaks detect \
  --source=gitleaks/examples \
  --report-path=gitleaks-report.json \
  --report-format=json \
  --verbose

# Ver o relatório
cat gitleaks-report.json | jq .
```

### 5. Instalar Pre-Commit Hook

```bash
# Instalar o hook (requer git init)
./gitleaks/install-hook.sh

# Testar (vai bloquear o commit!)
git add gitleaks/examples/frontend/api-config.ts
git commit -m "test: commit com secrets"

# Você verá: ❌ COMMIT BLOQUEADO!
```

## ⚡ Teste Rápido do ESLint

### 1. Instalar Dependências

```bash
npm install
```

### 2. Executar Análise

```bash
# Analisar todos os exemplos
npm run lint

# Ver problemas específicos
npm run lint -- eslint/examples/frontend-xss/problem.ts
npm run lint -- eslint/examples/api-security/problem.ts
npm run lint -- eslint/examples/backend-vulnerabilities/problem.ts
```

### 3. Ver Fix Automático

```bash
# Ver o que pode ser corrigido automaticamente
npm run lint -- --fix-dry-run eslint/examples/complex-code/problem.ts
```

## 📊 O Que Você Verá

### Gitleaks (~80 secrets detectadas)

#### Frontend (~30 secrets)
- ✅ Stripe API Keys (public & secret)
- ✅ AWS Credentials
- ✅ Google Maps API Key
- ✅ JWT Tokens
- ✅ Firebase Config
- ✅ OAuth Client Secrets (Google, Facebook, GitHub)
- ✅ Twitter API Keys
- ✅ Dropbox OAuth
- ✅ Payment Gateway Keys (Mercado Pago, PayPal, Iugu, Pagarme, PicPay)
- ✅ Slack Webhooks
- ✅ SendGrid API Key
- ✅ GitHub Personal Access Token

#### Backend (~50 secrets)
- ✅ Database Passwords (PostgreSQL, MongoDB, MySQL, Redis, SQL Server, Oracle)
- ✅ Database Connection Strings
- ✅ JWT Secrets
- ✅ Private Keys (RSA, SSH, OpenSSH)
- ✅ Encryption Keys (AES, RSA)
- ✅ OAuth Secrets (Backend)
- ✅ Admin/Root Passwords
- ✅ AWS/GCP/Azure Credentials
- ✅ Monitoring Tools (Datadog, New Relic, Sentry)
- ✅ Communication APIs (Twilio, Slack)
- ✅ Email Services (SendGrid, Mailgun)
- ✅ CI/CD Tokens (GitHub, GitLab)
- ✅ Managed Database URLs (MongoDB Atlas, Redis Cloud)

### ESLint (~20+ tipos de vulnerabilidades)

#### Frontend XSS
- ❌ dangerouslySetInnerHTML
- ❌ innerHTML assignment
- ❌ document.write()
- ❌ Unvalidated user input

#### API Security
- ❌ API keys in code
- ❌ Unsafe HTTP methods
- ❌ Missing authentication
- ❌ CORS misconfiguration

#### Backend Vulnerabilities
- ❌ SQL Injection
- ❌ Command Injection
- ❌ Path Traversal
- ❌ Weak crypto (MD5)
- ❌ Unsafe eval()

## 🎯 Cenários de Teste

### Cenário 1: Bloqueio de Commit com Secrets

```bash
# 1. Criar arquivo com secret
echo 'const apiKey = "sk_live_123456789abcdef";' > test-secret.js

# 2. Tentar commitar
git add test-secret.js
git commit -m "test secret"

# 3. Ver bloqueio do Gitleaks
# ❌ COMMIT BLOQUEADO!

# 4. Limpar
git reset HEAD test-secret.js
rm test-secret.js
```

### Cenário 2: Detecção de XSS

```bash
# Analisar arquivo com XSS
npm run lint -- eslint/examples/frontend-xss/problem.ts

# Ver a versão corrigida
cat eslint/examples/frontend-xss/refactor.ts
```

### Cenário 3: Pipeline CI/CD

```bash
# Simular execução do pipeline
echo "=== Rodando Gitleaks ==="
gitleaks detect --source=gitleaks/examples --exit-code=1 || echo "❌ Pipeline falhou - Secrets detectadas!"

echo ""
echo "=== Rodando ESLint ==="
npm run lint || echo "❌ Pipeline falhou - Vulnerabilidades encontradas!"
```

## 📈 Métricas de Demonstração

Execute este script para ver um resumo:

```bash
#!/bin/bash

echo "🔍 POC - Análise de Segurança"
echo "=============================="
echo ""

echo "📊 Gitleaks - Detecção de Secrets"
echo "----------------------------------"
GITLEAKS_COUNT=$(gitleaks detect --source=gitleaks/examples --report-format=json 2>/dev/null | jq '. | length' 2>/dev/null || echo "Instale 'jq' para ver métricas")
echo "Secrets detectadas: $GITLEAKS_COUNT"
echo ""

echo "📊 ESLint - Vulnerabilidades"
echo "----------------------------"
npm run lint -- --format=json 2>/dev/null | jq '[.[].messages] | flatten | length' 2>/dev/null || echo "Vários problemas detectados"
echo ""

echo "✅ Testes completados!"
```

## 🔄 Workflow Completo de Desenvolvimento

```bash
# 1. Desenvolvimento
code gitleaks/examples/frontend/new-feature.ts

# 2. ESLint detecta problemas (no IDE)
# 💡 Warnings aparecem em tempo real

# 3. Tentar commitar
git add .
git commit -m "feat: nova feature"

# 4. Gitleaks bloqueia se houver secrets
# ❌ Se detectar: commit bloqueado
# ✅ Se não detectar: commit permitido

# 5. Push aciona pipeline
git push origin feature/new-feature

# 6. CI/CD executa ambas as ferramentas
# - GitHub Actions: .github/workflows/
# - GitLab CI: gitleaks/gitlab-ci.yml
# - Azure: gitleaks/azure-pipelines.yml
```

## 🛠️ Comandos Úteis

### Gitleaks

```bash
# Escanear apenas staged files
gitleaks protect --staged --verbose

# Escanear com configuração customizada
gitleaks detect --config=custom-config.toml --source=.

# Ignorar arquivos específicos
gitleaks detect --source=. --no-git

# Gerar relatório SARIF (para GitHub)
gitleaks detect --report-format=sarif --report-path=report.sarif

# Docker
docker run -v $(pwd):/path zricethezav/gitleaks:latest detect --source=/path --verbose
```

### ESLint

```bash
# Analisar arquivo específico
npx eslint eslint/examples/frontend-xss/problem.ts

# Fix automático
npx eslint eslint/examples/ --fix

# Apenas warnings
npx eslint eslint/examples/ --quiet

# Formato JSON
npx eslint eslint/examples/ --format=json > eslint-report.json
```

## 📚 Próximos Passos

Depois de testar a POC:

1. **Leia a documentação completa:**
   - [README-POC.md](README-POC.md) - Visão geral
   - [gitleaks/README.md](gitleaks/README.md) - Gitleaks detalhado
   - Documentos em markdown na raiz (INDICE.md, INTEGRACAO.md, etc)

2. **Configure para seu projeto:**
   - Ajuste `.gitleaks.toml` com suas regras
   - Customize `.eslintrc.json` conforme necessário
   - Configure CI/CD com seus pipelines

3. **Treine a equipe:**
   - Compartilhe os exemplos
   - Explique os bloqueios do pre-commit
   - Estabeleça processo de remediação

4. **Monitore métricas:**
   - Track de vulnerabilidades por sprint
   - Tempo médio de correção
   - False positives

## ❓ Troubleshooting Rápido

### Gitleaks não está instalado
```bash
which gitleaks || echo "❌ Instale: brew install gitleaks"
```

### Node modules faltando
```bash
npm install
```

### Pre-commit hook não funciona
```bash
# Verificar se existe
ls -la .git/hooks/pre-commit

# Reinstalar
./gitleaks/install-hook.sh
```

### Muitos falsos positivos
```bash
# Editar allowlist
code gitleaks/.gitleaks.toml

# Adicionar path ou regex para ignorar
```

## 🎓 Aprenda Mais

Depois de executar os testes, explore:

1. **Exemplos de código vulnerável:**
   - `gitleaks/examples/frontend/` - Secrets em frontend
   - `gitleaks/examples/backend/` - Credentials em backend
   - `eslint/examples/` - Vulnerabilidades de código

2. **Configurações:**
   - `gitleaks/.gitleaks.toml` - Regras customizadas
   - `.eslintrc.json` - Regras do ESLint
   - Arquivos de pipeline em `gitleaks/`

3. **Documentação:**
   - [OWASP Top 10](https://owasp.org/www-project-top-ten/)
   - [Gitleaks Docs](https://github.com/gitleaks/gitleaks)
   - [ESLint Security](https://github.com/eslint-community/eslint-plugin-security)

---

**🎉 Pronto!** Em menos de 5 minutos você testou ambas as ferramentas e viu ~80 secrets e ~20 tipos de vulnerabilidades sendo detectadas!

**💡 Dica:** Compartilhe este guia com a equipe para alinhamento rápido!
