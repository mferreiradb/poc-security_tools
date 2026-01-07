# Gitleaks - POC de Segurança

Este diretório contém a configuração e exemplos para detectar secrets expostas usando [Gitleaks](https://github.com/gitleaks/gitleaks).

## 📋 Índice

- [O que é Gitleaks?](#o-que-é-gitleaks)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Exemplos de Código Vulnerável](#exemplos-de-código-vulnerável)
- [Configuração Pre-Commit](#configuração-pre-commit)
- [Integração com CI/CD](#integração-com-cicd)
- [Como Executar](#como-executar)
- [Instalação](#instalação)

## 🔍 O que é Gitleaks?

Gitleaks é uma ferramenta SAST (Static Application Security Testing) que detecta secrets, senhas, API keys e outras credenciais hardcoded em repositórios Git. Ele escaneia todo o histórico do Git em busca de padrões que indicam credenciais expostas.

### Principais Funcionalidades

- ✅ Detecta mais de 140 tipos de secrets
- ✅ Configurável via arquivo TOML
- ✅ Integração nativa com CI/CD
- ✅ Pre-commit hooks
- ✅ Análise de histórico completo do Git
- ✅ Relatórios em JSON, SARIF, CSV

## 📁 Estrutura de Arquivos

```
gitleaks/
├── .gitleaks.toml              # Configuração do Gitleaks
├── pre-commit-hook.sh          # Script do pre-commit hook
├── install-hook.sh             # Script para instalar o hook
├── github-actions.yml          # Workflow do GitHub Actions
├── gitlab-ci.yml               # Pipeline do GitLab CI
├── azure-pipelines.yml         # Pipeline do Azure DevOps
├── bitbucket-pipelines.yml     # Pipeline do Bitbucket
├── README.md                   # Esta documentação
└── examples/                   # Exemplos de código vulnerável
    ├── frontend/               # Exemplos frontend
    │   ├── api-config.ts       # API keys expostas
    │   ├── oauth-handler.tsx   # OAuth secrets
    │   └── payment-service.ts  # Credenciais de pagamento
    └── backend/                # Exemplos backend
        ├── database-config.ts  # Connection strings
        ├── .env.production     # Arquivo .env exposto
        ├── auth-service.ts     # JWT secrets
        └── external-services.ts # API keys de serviços externos
```

## 🚨 Exemplos de Código Vulnerável

### Frontend

1. **api-config.ts** - API keys hardcoded
   - Stripe API keys
   - Google Maps API
   - AWS credentials
   - Firebase config
   - Slack webhooks

2. **oauth-handler.tsx** - OAuth secrets no frontend
   - Google OAuth client secrets
   - Facebook App secrets
   - GitHub OAuth tokens
   - Twitter API keys

3. **payment-service.ts** - Credenciais de gateways
   - Mercado Pago
   - PayPal
   - Iugu
   - Pagarme

### Backend

1. **database-config.ts** - Credenciais de banco de dados
   - PostgreSQL, MySQL, MongoDB
   - Redis, SQL Server, Oracle
   - Elasticsearch, RabbitMQ

2. **.env.production** - Arquivo de ambiente exposto
   - Todas as variáveis de ambiente
   - JWT secrets
   - API keys de terceiros

3. **auth-service.ts** - Secrets de autenticação
   - JWT secrets
   - Private keys (RSA, SSH)
   - Encryption keys
   - Admin passwords

4. **external-services.ts** - Integração com serviços externos
   - AWS, Google Cloud, Azure
   - Datadog, New Relic, Sentry
   - Twilio, SendGrid, Slack
   - Payment processors

## ⚙️ Configuração Pre-Commit

### Instalação do Hook

```bash
# Método 1: Script automático
./gitleaks/install-hook.sh

# Método 2: Manual
cp gitleaks/pre-commit-hook.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
cp gitleaks/.gitleaks.toml .gitleaks.toml
```

### Como Funciona

1. Antes de cada commit, o hook é executado automaticamente
2. Gitleaks escaneia apenas os arquivos staged
3. Se secrets forem detectadas, o commit é bloqueado
4. O desenvolvedor deve remover as credenciais antes de commitar

### Teste Manual

```bash
# Testar o hook sem fazer commit
gitleaks protect --staged --verbose --config=.gitleaks.toml

# Testar em um arquivo específico
gitleaks detect --source=examples/frontend/api-config.ts --verbose
```

## 🚀 Integração com CI/CD

### GitHub Actions ✅ CONFIGURADO

O workflow do Gitleaks já está configurado e pronto para uso em:
📁 [`.github/workflows/gitleaks.yml`](../.github/workflows/gitleaks.yml)

**Características:**
- ✅ Executa em push e pull requests
- ✅ Comenta automaticamente em PRs se secrets forem encontradas
- ✅ Gera artefatos com relatórios
- ✅ Usa a action oficial do Gitleaks

**Como funciona:**
1. Dispara automaticamente em pushes para `main`, `develop` e branches `feature/**`
2. Também executa em todos os pull requests
3. Se secrets forem detectadas, o workflow falha
4. Um comentário é adicionado automaticamente ao PR com instruções

**Para testar localmente antes de fazer push:**
```bash
# Simular o que o GitHub Actions fará
gitleaks detect --source=. --config=gitleaks/.gitleaks.toml --verbose
```

### GitLab CI

Para integração com GitLab CI, use o arquivo de exemplo:
📁 [`gitlab-ci.yml`](gitlab-ci.yml)

```yaml
# Adicione o conteúdo ao seu .gitlab-ci.yml
```

**Características:**
- Stage de security
- Suporte a SAST reports
- Artifacts com relatórios JSON

## 🎯 Como Executar

### Instalação do Gitleaks

```bash
# macOS
brew install gitleaks

# Linux (via wget)
wget https://github.com/gitleaks/gitleaks/releases/download/v8.18.1/gitleaks_8.18.1_linux_x64.tar.gz
tar -xzf gitleaks_8.18.1_linux_x64.tar.gz
sudo mv gitleaks /usr/local/bin/

# Windows (via Chocolatey)
choco install gitleaks

# Docker
docker pull zricethezav/gitleaks:latest
```

### Comandos Básicos

```bash
# Escanear repositório completo
gitleaks detect --source=. --config=.gitleaks.toml --verbose

# Escanear apenas arquivos staged (para pre-commit)
gitleaks protect --staged --config=.gitleaks.toml --verbose

# Gerar relatório JSON
gitleaks detect --source=. --report-path=report.json --report-format=json

# Gerar relatório SARIF (para GitHub Security)
gitleaks detect --source=. --report-path=report.sarif --report-format=sarif

# Escanear com redação de secrets (mascara valores)
gitleaks detect --source=. --verbose --redact

# Escanear um commit específico
gitleaks detect --log-opts="--all" --verbose

# Via Docker
docker run -v $(pwd):/path zricethezav/gitleaks:latest detect --source=/path --verbose
```

### Testar com os Exemplos

```bash
# Escanear apenas os exemplos
gitleaks detect --source=gitleaks/examples --verbose --redact

# Escanear frontend
gitleaks detect --source=gitleaks/examples/frontend --verbose

# Escanear backend
gitleaks detect --source=gitleaks/examples/backend --verbose

# Escanear um arquivo específico
gitleaks detect --source=gitleaks/examples/backend/.env.production --verbose
```

## 📊 Resultados Esperados

Ao executar o Gitleaks nos exemplos, você deve ver:

- **Frontend:**
  - ~30+ secrets detectadas
  - API keys de Stripe, AWS, Google
  - OAuth secrets
  - Firebase configs
  - Payment gateway credentials

- **Backend:**
  - ~50+ secrets detectadas
  - Database connection strings
  - JWT secrets
  - Private keys (RSA, SSH)
  - Múltiplos API tokens
  - Environment variables

## 🛡️ Boas Práticas

### O que FAZER ✅

1. **Use variáveis de ambiente**
   ```typescript
   const apiKey = process.env.STRIPE_API_KEY;
   ```

2. **Use gerenciadores de secrets**
   - AWS Secrets Manager
   - HashiCorp Vault
   - Azure Key Vault
   - Google Secret Manager

3. **Configure secrets no CI/CD**
   - GitHub Secrets
   - GitLab CI/CD Variables
   - Azure DevOps Variable Groups

4. **Use arquivos .env (NÃO commite!)**
   ```bash
   # Adicione ao .gitignore
   .env
   .env.local
   .env.production
   ```

### O que NÃO FAZER ❌

1. ❌ Hardcode de API keys
2. ❌ Commit de arquivos .env
3. ❌ Credenciais em comentários
4. ❌ Secrets em variáveis públicas
5. ❌ Connection strings com senha no código

## 🔧 Configuração Customizada

Edite [.gitleaks.toml](gitleaks/.gitleaks.toml) para:

- Adicionar regras customizadas
- Configurar allowlist (falsos positivos)
- Definir paths a ignorar
- Criar regras específicas da empresa

Exemplo:

```toml
[[rules]]
id = "my-custom-secret"
description = "Minha API Key customizada"
regex = '''my-api-key-[a-zA-Z0-9]{32}'''
tags = ["key", "custom"]
```

## 📚 Recursos Adicionais

- [Documentação Oficial](https://github.com/gitleaks/gitleaks)
- [Gitleaks Rules](https://github.com/gitleaks/gitleaks/blob/master/config/gitleaks.toml)
- [OWASP - Secret Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_CheatSheet.html)

## 🆘 Suporte

Se você commitou secrets acidentalmente:

1. **Revogue a credencial imediatamente**
2. **Remova do histórico do Git:**
   ```bash
   # Usando git filter-repo
   git filter-repo --invert-paths --path path/to/file

   # Ou usando BFG Repo-Cleaner
   bfg --delete-files arquivo-com-secret.txt
   ```
3. **Force push (com cuidado!)**
4. **Notifique a equipe de segurança**

---

**⚠️ IMPORTANTE:** Esta POC contém exemplos de secrets FAKE para demonstração. NUNCA use valores reais em exemplos ou commits!
