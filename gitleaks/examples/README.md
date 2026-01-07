# Gitleaks - Exemplos de Código com Secrets Expostas

Esta pasta contém exemplos INTENCIONALMENTE vulneráveis para demonstrar como o Gitleaks detecta secrets e credenciais expostas no código.

⚠️ **ATENÇÃO:** Todos os valores aqui são FAKE e apenas para demonstração. NUNCA use valores reais!

## 📁 Estrutura

```
examples/
├── frontend/                    # Exemplos de secrets em código frontend
│   ├── api-config.ts           # API keys e tokens hardcoded
│   ├── oauth-handler.tsx       # OAuth client secrets (React)
│   └── payment-service.ts      # Credenciais de gateways de pagamento
│
└── backend/                     # Exemplos de secrets em código backend
    ├── database-config.ts      # Connection strings e senhas de DB
    ├── .env.production         # Arquivo .env exposto (NUNCA commitar!)
    ├── auth-service.ts         # JWT secrets e private keys
    └── external-services.ts    # API keys de serviços externos
```

## 🚨 Frontend - Secrets Detectadas

### api-config.ts (~15 secrets)

**Tipos de secrets:**
- ✅ Stripe API Keys (Public & Secret)
- ✅ Google Maps API Key
- ✅ JWT Authentication Token
- ✅ AWS Access Keys
- ✅ Slack Webhook URL
- ✅ SendGrid API Key
- ✅ GitHub Personal Access Token
- ✅ Firebase Configuration
- ✅ URLs com credenciais embutidas

**Comando de teste:**
```bash
gitleaks detect --source=frontend/api-config.ts --verbose
```

### oauth-handler.tsx (~10 secrets)

**Tipos de secrets:**
- ✅ Google OAuth Client ID & Secret
- ✅ Facebook App ID & Secret
- ✅ GitHub OAuth Credentials
- ✅ Twitter API Keys & Bearer Token
- ✅ Dropbox App Keys

**Por que é crítico:**
- Client secrets NUNCA devem estar no frontend
- Podem ser extraídos do bundle JavaScript
- Permitem autenticação não autorizada

**Comando de teste:**
```bash
gitleaks detect --source=frontend/oauth-handler.tsx --verbose
```

### payment-service.ts (~12 secrets)

**Tipos de secrets:**
- ✅ Mercado Pago Access Token
- ✅ PayPal Client ID & Secret
- ✅ Iugu API Key & Account ID
- ✅ Pagarme API & Encryption Keys
- ✅ PicPay Tokens
- ✅ URLs de webhook com credenciais

**Impacto:**
- Acesso não autorizado a contas de pagamento
- Possibilidade de fraude financeira
- Exposição de dados de clientes

**Comando de teste:**
```bash
gitleaks detect --source=frontend/payment-service.ts --verbose
```

## 🔐 Backend - Secrets Detectadas

### database-config.ts (~25 secrets)

**Tipos de secrets:**
- ✅ PostgreSQL password & connection string
- ✅ MongoDB URI com credenciais
- ✅ MySQL root password
- ✅ Redis password & URL
- ✅ SQL Server credentials
- ✅ Oracle system password
- ✅ Elasticsearch auth
- ✅ RabbitMQ credentials

**Impacto:**
- Acesso direto aos bancos de dados de produção
- Possibilidade de exfiltração de dados
- Modificação ou exclusão de dados

**Comando de teste:**
```bash
gitleaks detect --source=backend/database-config.ts --verbose
```

### .env.production (~30 secrets)

**Tipos de secrets:**
- ✅ Database credentials (múltiplos providers)
- ✅ JWT secrets
- ✅ API Keys (Stripe, SendGrid, Twilio)
- ✅ AWS credentials
- ✅ Redis password
- ✅ OAuth client secrets
- ✅ Slack tokens
- ✅ Payment gateway keys
- ✅ Encryption keys
- ✅ Admin passwords
- ✅ Monitoring tools (Datadog, New Relic, Sentry)
- ✅ SMTP credentials

**Por que é CRÍTICO:**
- Arquivo .env NUNCA deve ser commitado
- Contém TODAS as credenciais do ambiente
- Acesso completo a todos os serviços

**Comando de teste:**
```bash
gitleaks detect --source=backend/.env.production --verbose
```

### auth-service.ts (~15 secrets)

**Tipos de secrets:**
- ✅ JWT Secret & Refresh Secret
- ✅ RSA Private Key
- ✅ API Keys (internal & external)
- ✅ Encryption Keys (AES)
- ✅ Session Secret
- ✅ Admin credentials hardcoded
- ✅ OAuth Client Secrets
- ✅ GitHub/GitLab tokens
- ✅ SSH Private Key

**Impacto:**
- Geração de tokens válidos sem autenticação
- Descriptografia de dados
- Acesso administrativo total

**Comando de teste:**
```bash
gitleaks detect --source=backend/auth-service.ts --verbose
```

### external-services.ts (~40 secrets)

**Tipos de secrets:**
- ✅ AWS (Access Key, Secret Key)
- ✅ Google Cloud (Service Account)
- ✅ Azure (Subscription, Client Secret)
- ✅ Monitoring (Datadog, New Relic, Sentry)
- ✅ Communication (Twilio, Slack)
- ✅ Email (SendGrid, Mailgun)
- ✅ Analytics (Mixpanel, Segment)
- ✅ Payment Processors (Iugu, Pagarme, Mercado Pago)
- ✅ CI/CD (GitHub Actions, GitLab CI)
- ✅ Databases (MongoDB Atlas, Redis Cloud)

**Impacto:**
- Acesso a TODOS os serviços de terceiros
- Possibilidade de abusar de quotas/custos
- Comprometimento completo da infraestrutura

**Comando de teste:**
```bash
gitleaks detect --source=backend/external-services.ts --verbose
```

## 🧪 Como Testar

### Escanear Tudo

```bash
# Todos os exemplos
gitleaks detect --source=. --verbose --redact

# Você deverá ver ~80+ secrets detectadas! 🔐
```

### Escanear por Categoria

```bash
# Apenas Frontend (~30 secrets)
gitleaks detect --source=frontend/ --verbose

# Apenas Backend (~50 secrets)
gitleaks detect --source=backend/ --verbose
```

### Gerar Relatório

```bash
# Relatório JSON
gitleaks detect --source=. --report-path=report.json --report-format=json --verbose

# Ver o relatório
cat report.json | jq .

# Contar secrets por arquivo
cat report.json | jq -r '.[].File' | sort | uniq -c
```

### Testar Tipos Específicos

```bash
# Apenas secrets de AWS
gitleaks detect --source=. --verbose 2>&1 | grep -i "aws"

# Apenas secrets de banco de dados
gitleaks detect --source=. --verbose 2>&1 | grep -i "password"

# Apenas API keys
gitleaks detect --source=. --verbose 2>&1 | grep -i "api"
```

## 📊 Estatísticas Esperadas

### Por Arquivo

| Arquivo | Secrets | Tipos Principais |
|---------|---------|------------------|
| `frontend/api-config.ts` | ~15 | API Keys, AWS, Firebase |
| `frontend/oauth-handler.tsx` | ~10 | OAuth Secrets |
| `frontend/payment-service.ts` | ~12 | Payment Gateways |
| `backend/database-config.ts` | ~25 | DB Credentials |
| `backend/.env.production` | ~30 | Mixed (All Types) |
| `backend/auth-service.ts` | ~15 | JWT, Private Keys |
| `backend/external-services.ts` | ~40 | Third-party APIs |
| **TOTAL** | **~140+** | - |

### Por Categoria

| Categoria | Quantidade |
|-----------|------------|
| API Keys | ~35 |
| Database Credentials | ~25 |
| OAuth Secrets | ~15 |
| JWT/Encryption Keys | ~20 |
| Payment Gateway Keys | ~15 |
| Cloud Provider Credentials | ~15 |
| Private Keys (RSA/SSH) | ~5 |
| Monitoring/Logging | ~10 |
| Others | ~10 |

## 🛡️ Como Corrigir

### ❌ ERRADO - Hardcoded

```typescript
// NUNCA faça isso!
const apiKey = 'sk_live_123456789abcdef';
const dbPassword = 'MyS3cr3tP@ssw0rd';
```

### ✅ CORRETO - Environment Variables

```typescript
// Use variáveis de ambiente
const apiKey = process.env.STRIPE_API_KEY;
const dbPassword = process.env.DB_PASSWORD;

// Validar que existem
if (!apiKey || !dbPassword) {
  throw new Error('Missing required environment variables');
}
```

### ✅ CORRETO - Secrets Manager

```typescript
// Use um secrets manager
import { SecretsManager } from '@aws-sdk/client-secrets-manager';

async function getSecret(secretName: string) {
  const client = new SecretsManager({ region: 'us-east-1' });
  const response = await client.getSecretValue({ SecretId: secretName });
  return JSON.parse(response.SecretString);
}

const dbCredentials = await getSecret('prod/database/credentials');
```

### ✅ CORRETO - .gitignore

```bash
# Adicione ao .gitignore
.env
.env.local
.env.production
.env.*.local
*.key
*.pem
secrets/
config/secrets.json
```

## 🔍 Detalhamento por Arquivo

### Frontend

#### api-config.ts
- **Linha 6-7:** Stripe keys
- **Linha 10:** Google Maps API
- **Linha 13:** JWT token
- **Linha 16-17:** AWS credentials
- **Linha 20:** Slack webhook
- **Linha 23:** SendGrid key
- **Linha 28:** GitHub token
- **Linha 31-38:** Firebase config
- **Linha 42:** URL com credentials

#### oauth-handler.tsx
- **Linha 10-11:** Google OAuth
- **Linha 13-14:** Facebook OAuth
- **Linha 16-17:** GitHub OAuth
- **Linha 20-22:** Twitter API
- **Linha 25-26:** Dropbox OAuth

#### payment-service.ts
- **Linha 7-8:** Mercado Pago
- **Linha 11-12:** PayPal
- **Linha 15-16:** Iugu
- **Linha 19-20:** Pagarme
- **Linha 23-24:** PicPay
- **Linha 32-33:** URLs com credentials

### Backend

#### database-config.ts
- **Linha 7-11:** PostgreSQL
- **Linha 15-18:** MongoDB
- **Linha 22-27:** MySQL
- **Linha 31-34:** Redis
- **Linha 38-43:** SQL Server
- **Linha 47-50:** Oracle
- **Linha 55-59:** Elasticsearch
- **Linha 63-66:** RabbitMQ

#### .env.production
- **Linha 2-7:** Database
- **Linha 9-12:** JWT
- **Linha 14-19:** API Keys
- **Linha 21-25:** AWS
- **Linha 27-31:** Redis
- **Linha 33-37:** OAuth
- **Linha 39-42:** Slack
- **Linha 44-48:** Payment
- **Linha 50-53:** Encryption
- **Linha 55-58:** API Auth
- **Linha 60-63:** Monitoring
- **Linha 65-69:** Email
- **Linha 71-73:** Other

#### auth-service.ts
- **Linha 9-10:** JWT secrets
- **Linha 13-18:** RSA private key
- **Linha 21-24:** API keys
- **Linha 27-28:** Encryption
- **Linha 31:** Session secret
- **Linha 34-36:** Admin credentials
- **Linha 39-47:** OAuth secrets
- **Linha 50-51:** Git tokens
- **Linha 76-80:** SSH key

#### external-services.ts
- **Linha 7-11:** AWS
- **Linha 14-17:** Datadog
- **Linha 19-22:** New Relic
- **Linha 24-27:** Sentry
- **Linha 30-34:** Twilio
- **Linha 36-40:** Slack
- **Linha 43-45:** SendGrid
- **Linha 47-50:** Mailgun
- **Linha 53-63:** Google Cloud
- **Linha 65-70:** Azure
- **Linha 73-76:** Mixpanel
- **Linha 78-80:** Segment
- **Linha 83-87:** Iugu
- **Linha 89-92:** Pagarme
- **Linha 94-97:** Mercado Pago
- **Linha 100-103:** GitHub
- **Linha 105-108:** GitLab
- **Linha 111-114:** MongoDB Atlas
- **Linha 116-120:** Redis Cloud

## 📚 Recursos para Aprendizado

- [OWASP - Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_CheatSheet.html)
- [Gitleaks Rules](https://github.com/gitleaks/gitleaks/blob/master/config/gitleaks.toml)
- [12 Factor App - Config](https://12factor.net/config)
- [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)
- [HashiCorp Vault](https://www.vaultproject.io/)

## 🆘 E se eu já commitei um secret?

1. **REVOGUE a credencial IMEDIATAMENTE**
2. **Remova do histórico:**
   ```bash
   # Usando git-filter-repo
   git filter-repo --invert-paths --path path/to/file.ts
   
   # Ou BFG Repo-Cleaner
   bfg --delete-files file-with-secret.ts
   ```
3. **Force push (cuidado!):**
   ```bash
   git push origin --force --all
   ```
4. **Notifique a equipe de segurança**
5. **Atualize todos os sistemas que usam a credencial**

---

**⚠️ LEMBRE-SE:** Estes exemplos são para DEMONSTRAÇÃO. Use o Gitleaks para garantir que seu código real não contém secrets expostas!
