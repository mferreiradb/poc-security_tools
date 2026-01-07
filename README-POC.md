# POC - Ferramentas de Segurança

Esta POC (Proof of Concept) demonstra a implementação e uso de ferramentas de segurança para análise estática de código e detecção de vulnerabilidades.

## 🛡️ Ferramentas Incluídas

### 1. ESLint
Análise estática de código TypeScript/JavaScript para detectar vulnerabilidades de segurança, bugs e problemas de qualidade.

📁 **Localização:** [`eslint/`](eslint/)

**Vulnerabilidades detectadas:**
- XSS (Cross-Site Scripting)
- Injection attacks
- Insecure cryptography
- Unsafe regex
- Security misconfigurations

### 2. Gitleaks
Detecção de secrets, credenciais e API keys expostas no código e histórico Git.

📁 **Localização:** [`gitleaks/`](gitleaks/)

**Secrets detectadas:**
- API Keys (AWS, Stripe, SendGrid, etc)
- Database credentials
- JWT secrets
- OAuth tokens
- Private keys (RSA, SSH)
- Environment variables

## 📁 Estrutura do Projeto

```
poc-security/
├── eslint/                      # POC do ESLint
│   ├── examples/               # Exemplos de código vulnerável
│   │   ├── api-security/
│   │   ├── backend-vulnerabilities/
│   │   ├── complex-code/
│   │   └── frontend-xss/
│   └── [arquivos de configuração ESLint]
│
├── gitleaks/                    # POC do Gitleaks
│   ├── examples/               # Exemplos com secrets expostas
│   │   ├── frontend/
│   │   │   ├── api-config.ts
│   │   │   ├── oauth-handler.tsx
│   │   │   └── payment-service.ts
│   │   └── backend/
│   │       ├── database-config.ts
│   │       ├── .env.production
│   │       ├── auth-service.ts
│   │       └── external-services.ts
│   │
│   ├── .gitleaks.toml          # Configuração do Gitleaks
│   ├── pre-commit-hook.sh      # Hook para validação local
│   ├── install-hook.sh         # Script de instalação
│   ├── github-actions.yml      # Pipeline GitHub Actions
│   ├── gitlab-ci.yml           # Pipeline GitLab CI
│   ├── azure-pipelines.yml     # Pipeline Azure DevOps
│   ├── bitbucket-pipelines.yml # Pipeline Bitbucket
│   └── README.md               # Documentação Gitleaks
│
├── package.json
├── tsconfig.json
└── README.md                    # Este arquivo
```

## 🚀 Quick Start

### ESLint

```bash
# Instalar dependências
npm install

# Executar análise
npm run lint

# Ver exemplos de vulnerabilidades
cd eslint/examples
```

📖 **Documentação completa:** [eslint/README.md](eslint/README.md)

### Gitleaks

```bash
# Instalar Gitleaks
brew install gitleaks  # macOS
# ou baixar de: https://github.com/gitleaks/gitleaks/releases

# Instalar pre-commit hook
./gitleaks/install-hook.sh

# Executar análise manual
gitleaks detect --source=gitleaks/examples --verbose --redact

# Testar frontend
gitleaks detect --source=gitleaks/examples/frontend --verbose

# Testar backend
gitleaks detect --source=gitleaks/examples/backend --verbose
```

📖 **Documentação completa:** [gitleaks/README.md](gitleaks/README.md)

## 📊 Comparação das Ferramentas

| Característica | ESLint | Gitleaks |
|----------------|--------|----------|
| **Foco** | Qualidade e segurança do código | Detecção de secrets |
| **Linguagens** | JavaScript/TypeScript | Agnóstico (qualquer arquivo) |
| **Tipo** | SAST | Secret Scanner |
| **Execução** | Durante desenvolvimento | Pre-commit + CI/CD |
| **Correção** | Alguns fixes automáticos | Manual |
| **Performance** | Rápida | Muito rápida |
| **Integração** | IDE, CLI, CI/CD | Pre-commit, CI/CD |

## 🔄 Fluxo de Segurança Recomendado

### 1. Desenvolvimento Local
```
Código → ESLint (IDE) → Fix automático
                      ↓
            Gitleaks (pre-commit) → Bloqueia commit se secrets
                      ↓
                  Git commit
```

### 2. Pipeline CI/CD
```
Push/PR → ESLint (CI) → Falha se vulnerabilidades críticas
              ↓
        Gitleaks (CI) → Falha se secrets detectadas
              ↓
        Security Report → Review obrigatório
              ↓
           Aprovação
              ↓
           Deploy
```

## 🛠️ Configuração por Ambiente

### Desenvolvimento
- ESLint integrado ao IDE (VS Code, WebStorm)
- Gitleaks pre-commit hook instalado
- Feedback imediato durante codificação

### CI/CD

#### GitHub Actions
```yaml
# .github/workflows/security.yml
name: Security Checks
on: [push, pull_request]
jobs:
  eslint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint
  
  gitleaks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: gitleaks/gitleaks-action@v2
```

#### GitLab CI
```yaml
# .gitlab-ci.yml
stages:
  - security

eslint:
  stage: security
  script:
    - npm ci
    - npm run lint

gitleaks:
  stage: security
  image: zricethezav/gitleaks:latest
  script:
    - gitleaks detect --source=. --config=.gitleaks.toml
```

## 📈 Resultados Esperados

### ESLint
- Detecta ~20+ tipos de vulnerabilidades
- Exemplos incluem XSS, injection, crypto issues
- Fix automático disponível para ~60% dos problemas

### Gitleaks
- Detecta ~80+ secrets nos exemplos
- Frontend: ~30 secrets (API keys, OAuth, payment)
- Backend: ~50 secrets (DB, JWT, private keys)
- 0 falsos positivos com configuração adequada

## 🎯 Casos de Uso

### Para Desenvolvedores
1. **Prevenir vulnerabilidades:** ESLint avisa durante desenvolvimento
2. **Evitar commits de secrets:** Pre-commit hook bloqueia automaticamente
3. **Aprender boas práticas:** Mensagens explicativas sobre cada erro

### Para Tech Leads
1. **Code review automatizado:** Pipeline falha se houver problemas críticos
2. **Métricas de segurança:** Relatórios de vulnerabilidades por sprint
3. **Enforcement:** Políticas de segurança aplicadas automaticamente

### Para Security Team
1. **Auditoria contínua:** Análise em cada commit
2. **Histórico de melhorias:** Track de vulnerabilidades ao longo do tempo
3. **Compliance:** Evidências para auditorias de segurança

## 🔐 Boas Práticas de Segurança

### Código
✅ **FAZER:**
- Usar variáveis de ambiente
- Validar e sanitizar inputs
- Usar bibliotecas seguras e atualizadas
- Code review obrigatório

❌ **EVITAR:**
- Hardcode de credentials
- Uso de `eval()` ou `dangerouslySetInnerHTML`
- Regex suscetíveis a ReDoS
- Cryptografia weak (MD5, SHA1)

### Secrets
✅ **FAZER:**
- Usar gerenciadores de secrets (Vault, AWS Secrets Manager)
- Configurar secrets no CI/CD
- Adicionar .env ao .gitignore
- Rotacionar credentials regularmente

❌ **EVITAR:**
- Commit de arquivos .env
- API keys no código
- Secrets em comentários
- Compartilhar credentials via chat/email

## 📚 Recursos Adicionais

### Documentação
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [ESLint Security Plugin](https://github.com/eslint-community/eslint-plugin-security)
- [Gitleaks Documentation](https://github.com/gitleaks/gitleaks)
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_CheatSheet.html)

### Treinamento
- OWASP Secure Coding Practices
- Web Security Academy (PortSwigger)
- SANS Secure Development

## 🆘 Troubleshooting

### ESLint não detecta vulnerabilidades
```bash
# Verificar se os plugins estão instalados
npm list | grep eslint-plugin-security

# Reinstalar
npm ci
```

### Gitleaks bloqueando commits válidos
```bash
# Adicionar à allowlist em .gitleaks.toml
[allowlist]
paths = ["path/to/false/positive"]
```

### Performance lenta
```bash
# ESLint: usar cache
npm run lint -- --cache

# Gitleaks: limitar profundidade
gitleaks detect --log-opts="--max-count=100"
```

## 🤝 Contribuindo

Esta é uma POC para demonstração. Para uso em produção:

1. Ajuste as configurações conforme suas necessidades
2. Configure níveis de severidade apropriados
3. Integre com suas ferramentas de CI/CD
4. Treine a equipe sobre as ferramentas
5. Estabeleça processos de remediação

## 📝 Licença

Esta POC é para fins educacionais e de demonstração.

---

**⚠️ IMPORTANTE:** Os exemplos contêm código INTENCIONALMENTE vulnerável e secrets FAKE para demonstração. NUNCA use em produção ou com valores reais!

## 📧 Contato

Para dúvidas sobre esta POC, consulte a documentação específica de cada ferramenta ou entre em contato com a equipe de segurança.
