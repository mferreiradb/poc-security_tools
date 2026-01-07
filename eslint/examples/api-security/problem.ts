// /**
//  * EXEMPLOS DE VULNERABILIDADES DETECTADAS PELO eslint-plugin-security-node
//  * 
//  * Focado em configurações inseguras de APIs Node.js/Express
//  */

// import express, { Request, Response, Application } from 'express';
// import session from 'express-session';
// import * as https from 'https';

// const app: Application = express();

// // ❌ VULNERABILIDADE: Cookie sem configuração segura
// // security-node/detect-insecure-cookie
// app.use((req: Request, res: Response) => {
//   // Cookie sem httpOnly, secure, sameSite
//   res.cookie('sessionId', '12345', {
//     httpOnly: false, // ❌ Vulnerável a XSS
//     secure: false,   // ❌ Pode ser interceptado em HTTP
//     sameSite: 'none' // ❌ Vulnerável a CSRF
//   });
// });

// // ❌ VULNERABILIDADE: Session sem nome customizado
// // security-node/detect-absence-of-name-option-in-exrpress-session
// app.use(session({
//   secret: 'my-secret',
//   // Faltando 'name' - usa o padrão 'connect.sid' que indica Express
//   resave: false,
//   saveUninitialized: true
// }));

// // ❌ VULNERABILIDADE: Random inseguro para tokens
// // security-node/detect-insecure-randomness
// function generateSessionToken(): string {
//   return Math.random().toString(36).substring(7); // NUNCA use Math.random() para segurança!
// }

// // ❌ VULNERABILIDADE: Desabilitar verificação de certificado SSL
// // security-node/detect-option-rejectunauthorized-in-nodejs-httpsrequest
// function makeInsecureRequest(): void {
//   const options: https.RequestOptions = {
//     hostname: 'example.com',
//     port: 443,
//     path: '/',
//     method: 'GET',
//     rejectUnauthorized: false // ❌ Desabilita verificação SSL!
//   };
  
//   https.request(options, (res) => {
//     console.log(res.statusCode);
//   });
// }

// // ❌ VULNERABILIDADE: Buffer allocation insegura
// // security-node/detect-buffer-unsafe-allocation
// function createUnsafeBuffer(size: number): Buffer {
//   // Buffer() é deprecated e pode expor dados sensíveis da memória
//   return new Buffer(size); // Use Buffer.alloc() ou Buffer.from()
// }

// // ❌ VULNERABILIDADE: CRLF Injection
// // security-node/detect-crlf
// function setHeaderFromUserInput(res: Response, userInput: string): void {
//   // Se userInput contém \r\n, pode injetar headers adicionais
//   res.setHeader('X-User-Data', userInput);
// }

// // ❌ VULNERABILIDADE: RegEx insegura
// // security-node/detect-insecure-regex-expressions
// function validateInput(input: string): boolean {
//   // Esta regex pode causar ReDoS
//   const regex = /^(a+)+$/;
//   return regex.test(input);
// }

// // ❌ VULNERABILIDADE: runInThisContext pode executar código não confiável
// // security-node/detect-runinthiscontext-method-usage
// function executeUserCode(code: string): void {
//   const vm = require('vm');
//   vm.runInThisContext(code); // Perigoso - executa código no contexto atual
// }

// export {
//   app,
//   generateSessionToken,
//   makeInsecureRequest,
//   createUnsafeBuffer,
//   setHeaderFromUserInput,
//   validateInput,
//   executeUserCode
// };
