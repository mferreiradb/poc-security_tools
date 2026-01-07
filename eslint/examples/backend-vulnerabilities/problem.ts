// /**
//  * EXEMPLOS DE VULNERABILIDADES DETECTADAS PELO eslint-plugin-security
//  * 
//  * Este arquivo contém código intencionalmente inseguro para demonstrar
//  * as capacidades de detecção do plugin.
//  */

// import * as fs from 'fs';
// import { exec } from 'child_process';

// // ❌ VULNERABILIDADE: eval() é extremamente perigoso
// // Permite execução de código arbitrário
// function calculateUserInput(userInput: string): any {
//   // security/detect-eval-with-expression
//   return eval(userInput); // NUNCA use eval com input do usuário!
// }

// // ❌ VULNERABILIDADE: RegEx Denial of Service (ReDoS)
// // Esta regex pode causar travamento do servidor
// function validateEmail(email: string): boolean {
//   // security/detect-unsafe-regex
//   const regex = /^([a-zA-Z0-9]+)*@/; // ReDoS vulnerability
//   return regex.test(email);
// }

// // ❌ VULNERABILIDADE: Directory Traversal
// // Permite que usuário acesse arquivos fora do diretório permitido
// function readUserFile(filename: string): string {
//   // security/detect-non-literal-fs-filename
//   const userInput = filename; // Vem do usuário
//   return fs.readFileSync(userInput, 'utf8'); // Pode acessar /etc/passwd ou qualquer arquivo!
// }

// // ❌ VULNERABILIDADE: Command Injection
// // Execução de comandos do sistema com input do usuário
// function pingServer(address: string): void {
//   // security/detect-child-process
//   exec(`ping -c 4 ${address}`); // Input não sanitizado pode executar comandos maliciosos
// }

// // ❌ VULNERABILIDADE: Non-literal require
// // Pode carregar módulos maliciosos
// function loadPlugin(pluginName: string): any {
//   // security/detect-non-literal-require
//   return require(pluginName); // Usuário pode carregar qualquer módulo
// }

// // ❌ VULNERABILIDADE: Object Injection
// // Pode levar a prototype pollution
// function getUserData(userData: Record<string, any>, key: string): any {
//   // security/detect-object-injection
//   return userData[key]; // Se key = "__proto__", pode modificar Object.prototype
// }

// // ❌ VULNERABILIDADE: Weak Random Number Generator
// // Não use para segurança (tokens, senhas, etc)
// function generateToken(): string {
//   // security/detect-pseudoRandomBytes
//   const crypto = require('crypto');
//   return crypto.pseudoRandomBytes(16).toString('hex'); // Use randomBytes ao invés!
// }

// // ❌ VULNERABILIDADE: Timing Attack
// // Comparação de strings pode vazar informações
// function comparePasswords(userPassword: string, correctPassword: string): boolean {
//   // security/detect-possible-timing-attacks
//   return userPassword === correctPassword; // Use crypto.timingSafeEqual()
// }

// export {
//   calculateUserInput,
//   validateEmail,
//   readUserFile,
//   pingServer,
//   loadPlugin,
//   getUserData,
//   generateToken,
//   comparePasswords
// };
