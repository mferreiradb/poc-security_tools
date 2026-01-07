// Configuração de banco de dados com credenciais expostas
// PROBLEMA: Credenciais hardcoded no código

export const databaseConfig = {
  // PostgreSQL
  postgres: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'P0stgr3s_S3cr3t_P@ssw0rd',
    database: 'production_db',
    connectionString: 'postgresql://admin:SecretPass123!@db.example.com:5432/proddb',
  },
  
  // MongoDB
  mongodb: {
    uri: 'mongodb://root:M0ng0_R00t_P@ss@localhost:27017',
    username: 'mongodb_admin',
    password: 'MongoDBSecretPassword2024!',
  },
  
  // Redis
  redis: {
    host: 'localhost',
    port: 6379,
    password: 'R3d1s_C@ch3_S3cr3t_K3y',
    url: 'redis://:RedisSecretPass123@redis.example.com:6379',
  },
  
  // MySQL
  mysql: {
    host: 'mysql.example.com',
    user: 'root',
    password: 'MySQL_R00t_P@ss_2024!',
    database: 'prod_db',
  },
  
  // JWT Configuration
  jwt: {
    secret: 'jwt-super-secret-key-for-token-generation-xyz123',
    refreshSecret: 'jwt-refresh-secret-key-different-from-main-abc456',
    expiresIn: '1h',
  },
  
  // Encryption keys
  encryption: {
    key: 'aes-256-encryption-key-32-chars-long',
    iv: '16-byte-iv-vector',
  },
};

// Admin credentials (NUNCA fazer isso!)
export const adminCredentials = {
  username: 'admin',
  password: 'Admin_P@ssw0rd_2024!',
  apiToken: 'admin-api-token-abcdef1234567890',
  rootPassword: 'Root_S3cr3t_P@ss123!',
};

// Private Keys
export const privateKeys = {
  rsaPrivateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKL
MNOPQRSTUVWXYZ0123456789+/abcdefghijklmnopqrstuvwxyzABCDEFGHIJ
-----END RSA PRIVATE KEY-----`,
  
  sshPrivateKey: `-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn
NhAAAAAwEAAQAAAQEA1234567890abcdefghijklmnopqrstuvwxyz
-----END OPENSSH PRIVATE KEY-----`,
};

// URLs com credenciais embutidas
export const urlsWithCredentials = {
  databaseUrl: 'postgresql://user:P@ssw0rd123@db.example.com:5432/mydb',
  redisUrl: 'redis://:SecretRedisPass@redis.example.com:6379',
  rabbitMqUrl: 'amqp://admin:RabbitMQ_Pass123@rabbitmq.example.com:5672',
};
