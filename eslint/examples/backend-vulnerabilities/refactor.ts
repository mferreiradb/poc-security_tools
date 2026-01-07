/**
 * ✅ SOLUÇÕES SEGURAS - Backend Vulnerabilities
 * 
 * Este arquivo mostra como corrigir as vulnerabilidades do problem.ts
 */

import * as fs from 'fs';
import { execFile } from 'child_process';
import * as crypto from 'crypto';
import * as path from 'path';

// ✅ SOLUÇÃO: Evite eval(), use alternativas seguras
function calculateUserInputSafe(operation: string, a: number, b: number): number {
  // Use um objeto com operações permitidas (whitelist)
  const operations: Record<string, (x: number, y: number) => number> = {
    'add': (x, y) => x + y,
    'subtract': (x, y) => x - y,
    'multiply': (x, y) => x * y,
    'divide': (x, y) => x / y
  };
  
  // eslint-disable-next-line security/detect-object-injection
  if (operations[operation]) {
    // eslint-disable-next-line security/detect-object-injection
    return operations[operation](a, b);
  }
  throw new Error('Operação inválida');
}

// ✅ SOLUÇÃO: Use regex simples ou bibliotecas validadas
function validateEmailSafe(email: string): boolean {
  // Regex simples e segura (sem backtracking catastrófico)
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
  
  // Ou use uma biblioteca como validator.js:
  // import validator from 'validator';
  // return validator.isEmail(email);
}

// ✅ SOLUÇÃO: Valide e sanitize paths (previne Directory Traversal)
function readUserFileSafe(filename: string): string {
  // 1. Define um diretório base permitido
  const baseDir = '/var/uploads';
  
  // 2. Normalize e valide o path
  const safePath = path.normalize(path.join(baseDir, filename));
  
  // 3. Garanta que o path está dentro do diretório permitido
  if (!safePath.startsWith(baseDir)) {
    throw new Error('Acesso negado - path fora do diretório permitido');
  }
  
  // 4. Verifique se o arquivo existe
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  if (!fs.existsSync(safePath)) {
    throw new Error('Arquivo não encontrado');
  }
  
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  return fs.readFileSync(safePath, 'utf8');
}

// ✅ SOLUÇÃO: Use execFile com array de argumentos (previne Command Injection)
function pingServerSafe(address: string): void {
  // 1. Valide o input primeiro (whitelist de caracteres permitidos)
  if (!/^[a-zA-Z0-9.-]+$/.test(address)) {
    throw new Error('Endereço inválido');
  }
  
  // 2. Use execFile ao invés de exec (não passa por shell)
  // 3. Argumentos separados (não interpolados em string)
  execFile('ping', ['-c', '4', address], (error, stdout, stderr) => {
    if (error) {
      // Em produção, use um logger apropriado
      return;
    }
    // Processa o resultado
    // Em produção, use um logger: logger.info(stdout)
  });
}

// ✅ SOLUÇÃO: Use whitelist de módulos permitidos
function loadPluginSafe(pluginName: string): unknown {
  // Lista de plugins permitidos (whitelist)
  const allowedPlugins = ['plugin-a', 'plugin-b', 'plugin-c'];
  
  if (!allowedPlugins.includes(pluginName)) {
    throw new Error('Plugin não permitido');
  }
  
  // Use path seguro com whitelist validada
  // eslint-disable-next-line security/detect-non-literal-require, @typescript-eslint/no-var-requires
  return require(`./plugins/${pluginName}`);
}

// ✅ SOLUÇÃO: Valide chaves antes de acessar (previne Prototype Pollution)
function getUserDataSafe(userData: Record<string, unknown>, key: string): unknown {
  // Lista de campos permitidos (whitelist)
  const allowedFields = ['name', 'email', 'age', 'address'];
  
  if (!allowedFields.includes(key)) {
    throw new Error('Campo não permitido');
  }
  
  // Use hasOwnProperty para evitar prototype pollution
  if (Object.prototype.hasOwnProperty.call(userData, key)) {
    // eslint-disable-next-line security/detect-object-injection
    return userData[key];
  }
  
  return undefined;
}

// ✅ SOLUÇÃO: Use crypto.randomBytes para segurança
function generateTokenSafe(): string {
  // Use randomBytes (criptograficamente seguro)
  // NÃO use Math.random() ou pseudoRandomBytes()
  return crypto.randomBytes(32).toString('hex');
}

// ✅ SOLUÇÃO: Use timing-safe comparison (previne Timing Attacks)
function comparePasswordsSafe(userPassword: string, correctPassword: string): boolean {
  // Converta para Buffers
  const userBuf = Buffer.from(userPassword, 'utf8');
  const correctBuf = Buffer.from(correctPassword, 'utf8');
  
  // Use timingSafeEqual (tempo constante)
  try {
    return userBuf.length === correctBuf.length && 
           crypto.timingSafeEqual(userBuf, correctBuf);
  } catch (e) {
    return false;
  }
}

export {
  calculateUserInputSafe,
  validateEmailSafe,
  readUserFileSafe,
  pingServerSafe,
  loadPluginSafe,
  getUserDataSafe,
  generateTokenSafe,
  comparePasswordsSafe
};
