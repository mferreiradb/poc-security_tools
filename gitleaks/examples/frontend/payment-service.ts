// Exemplo de serviço de pagamento com credenciais expostas
// PROBLEMA: Chaves privadas e secrets de payment providers hardcoded

class PaymentService {
  // Payment Gateway API Keys (genéricos)
  private paymentApiKey = 'payment-api-key-1234567890abcdef';
  private paymentSecretKey = 'payment-secret-key-abcdef1234567890xyz';
  
  // Merchant credentials
  private merchantId = 'merchant-id-1234567890';
  private merchantPassword = 'Merchant_P@ssw0rd_2024!';
  
  // Webhook secrets
  private webhookSecret = 'webhook-secret-for-payment-verification';
  private callbackToken = 'callback-token-abcdef1234567890';
  
  // Encryption keys
  private encryptionKey = 'encryption-key-1234567890abcdef';
  private signatureKey = 'signature-key-fedcba0987654321';
  
  // API tokens
  private apiAccessToken = 'api-access-token-xyz123abc456';
  private refreshToken = 'refresh-token-789def012ghi345';

  async processPayment(amount: number, method: string) {
    // Implementação vulnerável
    const headers = {
      'Authorization': `Bearer ${this.apiAccessToken}`,
      'X-API-Key': this.paymentApiKey,
      'X-Merchant-Secret': this.merchantPassword,
    };
    
    // ... resto do código
  }
  
  // URLs com credenciais
  private readonly webhookUrl = 'https://user:SecretP@ss123@webhook.example.com/payment/callback';
  private readonly apiEndpoint = 'https://api-key-12345:secret-67890@api.payment.com/v1/charge';
}

export default PaymentService;
