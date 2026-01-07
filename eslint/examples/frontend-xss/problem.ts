// /**
//  * EXEMPLOS DE VULNERABILIDADES XSS DETECTADAS PELO eslint-plugin-no-unsanitized
//  * 
//  * Plugin da Mozilla focado em prevenir Cross-Site Scripting (XSS)
//  */

// import DOMPurify from 'dompurify';

// // ❌ VULNERABILIDADE: innerHTML com dados não sanitizados
// // no-unsanitized/property
// function displayUserComment(comment: string): void {
//   const div = document.getElementById('comment-section');
//   // Se comment contém <script>alert('XSS')</script>, será executado!
//   if (div) {
//     div.innerHTML = comment; // ❌ NUNCA use innerHTML com input do usuário
//   }
// }

// // ❌ VULNERABILIDADE: outerHTML com dados não sanitizados
// // no-unsanitized/property
// function replaceElement(userContent: string): void {
//   const element = document.getElementById('content');
//   if (element) {
//     element.outerHTML = userContent; // ❌ Pode injetar scripts maliciosos
//   }
// }

// // ❌ VULNERABILIDADE: insertAdjacentHTML sem sanitização
// // no-unsanitized/method
// function addNotification(message: string): void {
//   const container = document.getElementById('notifications');
//   // Se message = '<img src=x onerror="alert(1)">', será executado
//   if (container) {
//     container.insertAdjacentHTML('beforeend', message); // ❌ Vulnerável a XSS
//   }
// }

// // ❌ VULNERABILIDADE: document.write com input do usuário
// // no-unsanitized/method
// function renderUserContent(content: string): void {
//   document.write(content); // ❌ Extremamente perigoso
// }

// // ❌ VULNERABILIDADE: document.writeln
// // no-unsanitized/method
// function appendContent(html: string): void {
//   document.writeln(html); // ❌ Igual ao document.write
// }

// // ❌ VULNERABILIDADE: Construção de HTML com concatenação
// // no-unsanitized/property
// function createUserCard(userName: string, userBio: string): void {
//   const card = document.createElement('div');
//   // Se userName contém tags HTML, será interpretado
//   card.innerHTML = `
//     <h3>${userName}</h3>
//     <p>${userBio}</p>
//   `; // ❌ Template literals não sanitizam automaticamente
  
//   document.body.appendChild(card);
// }

// // ❌ VULNERABILIDADE: Range.createContextualFragment
// // no-unsanitized/method
// function insertUserHTML(htmlString: string): void {
//   const range = document.createRange();
//   const fragment = range.createContextualFragment(htmlString); // ❌ Pode executar scripts
//   document.body.appendChild(fragment);
// }

// // ✅ ALTERNATIVA SEGURA: Use textContent ao invés de innerHTML
// function displayUserCommentSafe(comment: string): void {
//   const div = document.getElementById('comment-section');
//   if (div) {
//     div.textContent = comment; // ✅ Seguro - não interpreta HTML
//   }
// }

// // ✅ ALTERNATIVA SEGURA: Crie elementos e use textContent
// function createUserCardSafe(userName: string, userBio: string): void {
//   const card = document.createElement('div');
  
//   const title = document.createElement('h3');
//   title.textContent = userName; // ✅ Seguro
  
//   const bio = document.createElement('p');
//   bio.textContent = userBio; // ✅ Seguro
  
//   card.appendChild(title);
//   card.appendChild(bio);
//   document.body.appendChild(card);
// }

// // ✅ ALTERNATIVA SEGURA: Use DOMPurify para sanitizar HTML
// function displayUserCommentWithSanitizer(comment: string): void {
//   const div = document.getElementById('comment-section');
//   if (!div) return;
  
//   // ✅ SEGURO: Usando DOMPurify para sanitizar antes de innerHTML
//   div.innerHTML = DOMPurify.sanitize(comment); // ✅ Seguro com sanitização
// }

// // ❌ VULNERABILIDADE: jQuery html() com dados não sanitizados
// // no-unsanitized/method
// function jQueryExample(userInput: string): void {
//   // Nota: Requer configuração adicional para jQuery
//   // $('#result').html(userInput); // ❌ Vulnerável a XSS
// }

// // EXEMPLOS DE ATAQUES XSS COMUNS:

// // 1. Script básico
// const xss1: string = '<script>alert("XSS")</script>';

// // 2. Event handler
// const xss2: string = '<img src=x onerror="alert(1)">';

// // 3. Link malicioso
// const xss3: string = '<a href="javascript:alert(1)">Click me</a>';

// // 4. SVG com script
// const xss4: string = '<svg onload="alert(1)">';

// // 5. Iframe
// const xss5: string = '<iframe src="javascript:alert(1)"></iframe>';

// // 6. Object/Embed
// const xss6: string = '<object data="javascript:alert(1)">';

// export {
//   displayUserComment,
//   replaceElement,
//   addNotification,
//   renderUserContent,
//   appendContent,
//   createUserCard,
//   insertUserHTML,
//   displayUserCommentSafe,
//   createUserCardSafe,
//   displayUserCommentWithSanitizer
// };
