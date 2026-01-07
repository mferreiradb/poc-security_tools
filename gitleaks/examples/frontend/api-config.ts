// Exemplo de código frontend com secrets expostas
// PROBLEMA: API keys e tokens hardcoded no código

export const apiConfig = {
  // JWT Token hardcoded
  jwtSecret: 'my-super-secret-jwt-key-that-nobody-should-know-123456789',
  jwtRefreshToken: 'refresh-token-secret-key-abcdef1234567890xyz',
  
  // API Key genérica
  internalApiKey: 'internal-api-key-abcdef1234567890xyz',
  
  // Token de autenticação Bearer
  authToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  
  // Database credentials
  databasePassword: 'MyS3cr3tDatabaseP@ssw0rd2024',
  mongoUri: 'mongodb://admin:M0ng0_P@ssw0rd@localhost:27017/mydb',
  
  // Webhook secret
  webhookSecret: 'webhook-secret-for-signature-verification-12345',
  
  // Encryption key
  encryptionKey: '0123456789abcdef0123456789abcdef',
};

// Admin password hardcoded
const adminPassword = 'Admin123!SuperSecretPassword';

// Session e Cookie secrets
const sessionConfig = {
  sessionSecret: 'express-session-secret-key-1234567890abcdef',
  cookieSecret: 'cookie-secret-key-for-sessions-xyz123',
  csrfSecret: 'csrf-token-secret-key-protection',
};

// API URL com credenciais embutidas
const apiUrlWithCredentials = 'https://admin:P@ssw0rd123!@api.example.com/data';
const redisUrl = 'redis://:R3d1s_S3cr3t_K3y@redis.example.com:6379';
