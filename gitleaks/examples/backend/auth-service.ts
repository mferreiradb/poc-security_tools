// Serviço de autenticação com secrets expostos
// PROBLEMA: Tokens, API keys e credenciais hardcoded

class AuthService {
  // JWT Secrets hardcoded
  private jwtSecret = 'jwt-super-secret-key-should-be-in-env-not-code';
  private jwtRefreshSecret = 'jwt-refresh-secret-different-key-for-refresh-tokens';
  
  // Database admin credentials
  private dbAdminUser = 'db_admin';
  private dbAdminPassword = 'DB_Admin_P@ssw0rd_2024!';
  
  // OAuth generic credentials
  private oauthClientId = 'oauth-client-id-1234567890abcdef';
  private oauthClientSecret = 'oauth-client-secret-abcdef1234567890xyz';
  
  // API Keys
  private internalApiKey = 'internal-api-key-for-microservices-communication';
  private serviceToken = 'service-to-service-authentication-token-xyz123';
  
  // Session secrets
  private sessionSecret = 'express-session-secret-key-for-cookies';
  private cookieSecret = 'cookie-parser-secret-key-signed-cookies';
  
  // Encryption keys
  private encryptionKey = 'aes-256-encryption-key-32-characters';
  private signingKey = 'hmac-sha256-signing-key-for-tokens';

  generateToken(userId: string): string {
    // Usando secret hardcoded (NUNCA FAZER!)
    return this.signJWT({ userId }, this.jwtSecret);
  }

  private signJWT(payload: any, secret: string): string {
    // Implementação simplificada
    return `${Buffer.from(JSON.stringify(payload)).toString('base64')}.${secret}`;
  }

  // Admin password hardcoded
  async authenticateAdmin(username: string, password: string): Promise<boolean> {
    const ADMIN_USER = 'admin';
    const ADMIN_PASS = 'Admin123!SuperSecret';
    
    return username === ADMIN_USER && password === ADMIN_PASS;
  }

  // Private key hardcoded
  private readonly rsaPrivateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA1234567890abcdefghijklmnopqrstuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/abcdefghijklmnop
-----END RSA PRIVATE KEY-----`;

  // URLs com credenciais
  private authServiceUrl = 'https://admin:SecretPass123@auth.internal.com/api/v1';
  private databaseUrl = 'postgresql://auth_user:Auth_DB_P@ss@db.internal.com:5432/auth_db';
}

export default AuthService;
