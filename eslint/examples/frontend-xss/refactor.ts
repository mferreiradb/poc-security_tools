/**
 * ✅ SOLUÇÕES SEGURAS - Frontend XSS
 * 
 * Este arquivo mostra como prevenir ataques XSS no frontend
 */

import DOMPurify from 'dompurify';

// ✅ SOLUÇÃO 1: Use textContent ao invés de innerHTML
function displayUserCommentSafe(comment: string): void {
  const div = document.getElementById('comment-section');
  if (div) {
    // textContent não interpreta HTML - apenas texto puro
    div.textContent = comment; // ✅ SEGURO
  }
}

// ✅ SOLUÇÃO 2: Crie elementos programaticamente
function createUserCardSafe(userName: string, userBio: string): void {
  const card = document.createElement('div');
  card.className = 'user-card';
  
  const title = document.createElement('h3');
  title.textContent = userName; // ✅ SEGURO - escapado automaticamente
  
  const bio = document.createElement('p');
  bio.textContent = userBio; // ✅ SEGURO
  
  card.appendChild(title);
  card.appendChild(bio);
  document.body.appendChild(card);
}

// ✅ SOLUÇÃO 3: Use DOMPurify quando REALMENTE precisar de HTML
function displayRichContentSafe(htmlContent: string): void {
  const div = document.getElementById('content');
  if (!div) return;
  
  // DOMPurify remove tags/atributos perigosos
  // npm install dompurify
  // npm install --save-dev @types/dompurify
  
  // Para usar no browser:
  // import DOMPurify from 'dompurify';
  
  // Para Node.js (servidor):
  // import createDOMPurify from 'dompurify';
  // import { JSDOM } from 'jsdom';
  // const window = new JSDOM('').window;
  // const DOMPurify = createDOMPurify(window);
  
  // Configuração restritiva (whitelist)
  const clean = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'title'],
    ALLOW_DATA_ATTR: false
  });
  
  // eslint-disable-next-line no-unsanitized/property
  div.innerHTML = clean; // ✅ SEGURO após sanitização com DOMPurify
}

// ✅ SOLUÇÃO 4: Use frameworks que escapam automaticamente
function reactExample(comment: string): void {
  // React escapa automaticamente:
  // return <div>{comment}</div>  // ✅ SEGURO
  
  // Se PRECISAR de HTML, use dangerouslySetInnerHTML COM DOMPurify:
  // <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(comment)}} />
}

// ✅ SOLUÇÃO 5: Valide e sanitize no backend TAMBÉM
interface SanitizedData {
  text: string;
  html?: string;
}

function submitComment(comment: string): SanitizedData {
  // No backend (Node.js):
  // 1. Valide o formato
  // 2. Sanitize com biblioteca (DOMPurify, sanitize-html)
  // 3. Armazene apenas o necessário
  // 4. Retorne versão limpa
  
  return {
    text: comment.trim().substring(0, 500), // Limite de tamanho
    html: undefined // Não permita HTML do usuário
  };
}

// ✅ SOLUÇÃO 6: Use Content Security Policy (CSP)
function setupCSP(): void {
  // No HTML ou no backend, adicione header:
  // Content-Security-Policy: default-src 'self'; script-src 'self'
  
  // Exemplo em Express:
  /*
  app.use((req, res, next) => {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
    );
    next();
  });
  */
}

// ✅ SOLUÇÃO 7: Liste branca de URLs para links
function createSafeLink(url: string, text: string): HTMLAnchorElement {
  const link = document.createElement('a');
  link.textContent = text; // ✅ SEGURO
  
  // Valide URLs
  try {
    const parsed = new URL(url);
    
    // Whitelist de protocolos permitidos
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      link.href = url;
      link.rel = 'noopener noreferrer'; // Segurança adicional
    } else {
      throw new Error('Protocolo não permitido');
    }
  } catch {
    link.href = '#'; // URL inválida
  }
  
  return link;
}

// ✅ SOLUÇÃO 8: Escape manual se necessário
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ✅ SOLUÇÃO 9: Use setAttribute para atributos
function setAttributeSafe(element: HTMLElement, value: string): void {
  // setAttribute escapa automaticamente
  element.setAttribute('data-user', value); // ✅ SEGURO
  
  // NUNCA faça:
  // element.innerHTML = `<div data-user="${value}"></div>`; // ❌ VULNERÁVEL
}

// ✅ SOLUÇÃO 10: Valide tipos de arquivo em uploads
function validateFileUpload(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  
  // Valide MIME type
  if (!allowedTypes.includes(file.type)) {
    return false;
  }
  
  // Valide extensão
  const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
  if (!allowedExtensions.includes(extension)) {
    return false;
  }
  
  return true;
}

// ✅ CHECKLIST DE SEGURANÇA FRONTEND
const SECURITY_CHECKLIST = {
  '1. Use textContent, não innerHTML': true,
  '2. Sanitize com DOMPurify quando precisar de HTML': true,
  '3. Valide URLs antes de usar em links': true,
  '4. Use CSP headers': true,
  '5. Frameworks (React/Vue) escapam automaticamente': true,
  '6. Valide no backend também': true,
  '7. Limite tamanhos de input': true,
  '8. Use setAttribute para atributos': true,
  '9. Valide uploads de arquivo': true,
  '10. Teste com payloads XSS conhecidos': true
};

export {
  displayUserCommentSafe,
  createUserCardSafe,
  displayRichContentSafe,
  reactExample,
  submitComment,
  setupCSP,
  createSafeLink,
  escapeHtml,
  setAttributeSafe,
  validateFileUpload,
  SECURITY_CHECKLIST
};
