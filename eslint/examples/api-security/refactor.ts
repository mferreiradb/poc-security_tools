/**
 * ✅ SOLUÇÕES SEGURAS - API Security
 * 
 * Este arquivo mostra como configurar APIs Node.js/Express de forma segura
 */

import express, { Request, Response, Application } from 'express';
import session from 'express-session';
import * as https from 'https';
import * as crypto from 'crypto';

const app: Application = express();

// ✅ SOLUÇÃO: Configure cookies de forma segura
function setCookieSafe(res: Response, sessionId: string): void {
  res.cookie('sessionId', sessionId, {
    httpOnly: true,      // ✅ Previne acesso via JavaScript (XSS)
    secure: true,        // ✅ Apenas HTTPS
    sameSite: 'strict',  // ✅ Previne CSRF
    maxAge: 3600000,     // 1 hora
    signed: true         // ✅ Assina o cookie
  });
}

// ✅ SOLUÇÃO: Configure session de forma segura
function setupSessionSafe(app: Application): void {
  app.use(session({
    name: 'sid',                              // ✅ Nome customizado (não revela Express)
    secret: process.env.SESSION_SECRET || '', // ✅ Use variável de ambiente
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // ✅ HTTPS em produção
      sameSite: 'strict',
      maxAge: 3600000
    }
    // Em produção, use um store adequado (Redis, MongoDB, etc)
    // store: new RedisStore({ client: redisClient })
  }));
}

// ✅ SOLUÇÃO: Use crypto.randomBytes para tokens (criptograficamente seguro)
function generateSessionTokenSafe(): string {
  // NUNCA use Math.random() para segurança!
  return crypto.randomBytes(32).toString('hex');
}

// ✅ SOLUÇÃO: SEMPRE verifique certificados SSL
function makeSecureRequest(): void {
  const options: https.RequestOptions = {
    hostname: 'example.com',
    port: 443,
    path: '/',
    method: 'GET',
    rejectUnauthorized: true // ✅ SEMPRE true em produção
    // Em desenvolvimento local, use certificados self-signed válidos
  };
  
  https.request(options, (res) => {
    // Em produção, use um logger apropriado (winston, pino, etc)
    // console.log('Status:', res.statusCode);
    res.on('data', (chunk) => {
      // Processa os dados da resposta
    });
  }).end();
}

// ✅ SOLUÇÃO: Use Buffer.alloc ou Buffer.from (seguro)
function createSafeBuffer(size: number): Buffer {
  // Buffer.alloc zera a memória (não expõe dados antigos)
  return Buffer.alloc(size);
  
  // Ou use Buffer.from para criar de uma string/array
  // return Buffer.from('data', 'utf8');
}

// ✅ SOLUÇÃO: Sanitize headers (previne CRLF Injection)
function setHeaderSafe(res: Response, userInput: string): void {
  // Remova caracteres CRLF (\r\n) que podem injetar headers adicionais
  const sanitized = userInput.replace(/[\r\n]/g, '');
  
  // Ou use biblioteca de validação
  if (!/^[a-zA-Z0-9\s-_]+$/.test(sanitized)) {
    throw new Error('Header inválido');
  }
  
  res.setHeader('X-User-Data', sanitized);
}

// ✅ SOLUÇÃO: Use regex simples (previne ReDoS)
function validateInputSafe(input: string): boolean {
  // Regex simples sem backtracking catastrófico
  const regex = /^[a-z]+$/i;
  return regex.test(input);
  
  // Ou use bibliotecas de validação:
  // import { z } from 'zod';
  // import Joi from 'joi';
  // import validator from 'validator';
}

// ✅ SOLUÇÃO: NUNCA use vm.runInThisContext com código não confiável
// Se realmente precisar executar código dinâmico:
function executeUserCodeSafe(code: string): never {
  // Opção 1: Use Web Workers (browser) ou Worker Threads (Node.js)
  // Opção 2: Use sandboxes como vm2 ou isolated-vm
  // Opção 3: Execute em container Docker separado
  // Opção 4: NÃO EXECUTE - reavalie a necessidade
  
  throw new Error('Execução de código dinâmico não permitida por segurança');
}

// ✅ CONFIGURAÇÃO COMPLETA DE SEGURANÇA EXPRESS
function setupSecureExpress(): Application {
  const app = express();
  
  // Helmet - adiciona headers de segurança
  // npm install helmet
  // app.use(helmet());
  
  // CORS configurado corretamente
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://seu-dominio.com'); // ✅ Específico
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
  
  // Rate limiting
  // npm install express-rate-limit
  // app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
  
  // Body parser com limite
  app.use(express.json({ limit: '10kb' }));
  
  return app;
}

export {
  app,
  setCookieSafe,
  setupSessionSafe,
  generateSessionTokenSafe,
  makeSecureRequest,
  createSafeBuffer,
  setHeaderSafe,
  validateInputSafe,
  executeUserCodeSafe,
  setupSecureExpress
};
