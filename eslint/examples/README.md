# 📁 Estrutura de Exemplos

Cada categoria de vulnerabilidade tem sua própria pasta com 2 arquivos:

## 📂 Estrutura de Pastas

```
examples/
├── backend-vulnerabilities/
│   ├── problem.ts      ❌ Código vulnerável
│   └── refactor.ts     ✅ Código seguro
├── api-security/
│   ├── problem.ts      ❌ Configurações inseguras
│   └── refactor.ts     ✅ Configurações seguras
├── complex-code/
│   ├── problem.ts      ❌ Código complexo e duplicado
│   └── refactor.ts     ✅ Código refatorado
├── frontend-xss/
│   ├── problem.ts      ❌ Vulnerabilidades XSS
│   └── refactor.ts     ✅ Código XSS-safe
└── SOLUCOES-SEGURAS.ts (arquivo legado - usar refactor.ts individuais)
```

## 🎯 Como Usar

### 1. Verificar problemas em um arquivo específico:

```bash
# Backend vulnerabilities
npm run lint:backend:problem

# API security
npm run lint:api:problem

# Complex code
npm run lint:complex:problem

# Frontend XSS
npm run lint:frontend:problem
```

### 2. Verificar todos os arquivos problem.ts:

```bash
npm run lint:all-problems
```

### 3. Verificar as soluções (refactor.ts):

```bash
# Backend soluções
npm run lint:backend:refactor

# API soluções
npm run lint:api:refactor

# Complex code soluções
npm run lint:complex:refactor

# Frontend soluções
npm run lint:frontend:refactor
```

### 4. Verificar todos os refactor.ts:

```bash
npm run lint:all-refactors
```

### 5. Verificar pasta completa:

```bash
# Tudo no backend-vulnerabilities
npm run lint:backend

# Tudo no api-security
npm run lint:api

# Tudo no complex-code
npm run lint:complex

# Tudo no frontend-xss
npm run lint:frontend
```

## 📚 Categorias

### 🔴 backend-vulnerabilities
- **Plugin principal**: `eslint-plugin-security`
- **Vulnerabilidades**:
  - ❌ eval() usage
  - ❌ ReDoS (Regular Expression Denial of Service)
  - ❌ Directory Traversal
  - ❌ Command Injection
  - ❌ Object Injection
  - ❌ Weak randomness
  - ❌ Timing attacks

### 🟠 api-security
- **Plugins**: `eslint-plugin-security-node` + `eslint-plugin-security`
- **Vulnerabilidades**:
  - ❌ Insecure cookies (httpOnly: false)
  - ❌ Math.random() para tokens
  - ❌ SSL verification disabled
  - ❌ Buffer() deprecated
  - ❌ CRLF Injection

### 🟡 complex-code
- **Plugin**: `eslint-plugin-sonarjs`
- **Code smells**:
  - ❌ Cognitive complexity (87)
  - ❌ Duplicate strings
  - ❌ Identical functions
  - ❌ Collapsible if statements
  - ❌ Unused collections

### 🔵 frontend-xss
- **Plugin**: `eslint-plugin-no-unsanitized`
- **Vulnerabilidades XSS**:
  - ❌ innerHTML assignments
  - ❌ insertAdjacentHTML
  - ❌ document.write
  - ❌ outerHTML
  - ❌ createContextualFragment

## 🎓 Metodologia de Aprendizado

Para cada categoria:

1. **Leia o problem.ts** - Entenda as vulnerabilidades
2. **Execute o lint** - Veja o que o ESLint detecta
3. **Leia o refactor.ts** - Aprenda as soluções corretas
4. **Compare** - Veja as diferenças entre código vulnerável e seguro

## 🔍 Comparação Rápida

### Exemplo: innerHTML

```typescript
// ❌ problem.ts
div.innerHTML = userInput; // XSS vulnerability

// ✅ refactor.ts
div.textContent = userInput; // Safe - texto puro
```

### Exemplo: eval()

```typescript
// ❌ problem.ts
eval(userInput); // Code injection

// ✅ refactor.ts
const operations = { add: (a,b) => a+b };
operations[userInput](a, b); // Whitelist segura
```

## 📊 Estatísticas

- **Total de vulnerabilidades detectadas**: 51 problemas
  - 43 problemas de segurança
  - 8 avisos TypeScript

- **Plugins ativos**: 4
  - ✅ eslint-plugin-security
  - ✅ eslint-plugin-sonarjs
  - ✅ eslint-plugin-no-unsanitized
  - ✅ eslint-plugin-security-node

## 🚀 Próximos Passos

1. Estude cada par problem/refactor
2. Execute os lints para ver diferenças
3. Teste modificar o código e ver impacto no ESLint
4. Aplique os conceitos no seu projeto
5. Configure CI/CD com esses plugins

## 📖 Documentação Completa

Veja os arquivos na raiz do projeto:
- `README.md` - Guia principal
- `RESULTADOS.md` - Análise detalhada dos problemas
- `INTEGRACAO.md` - Como integrar no seu projeto
- `MIGRACAO-TYPESCRIPT.md` - Guia de migração JS → TS
