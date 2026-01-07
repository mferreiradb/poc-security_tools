// Exemplo de componente React com OAuth secrets hardcoded
// PROBLEMA: Client secrets e tokens OAuth expostos no código frontend

import React, { useEffect } from 'react';

const OAuthHandler: React.FC = () => {
    // OAuth Client Secrets (NUNCA devem estar no frontend!)
    const OAUTH_CLIENT_ID = 'oauth-client-id-1234567890abcdef';
    const OAUTH_CLIENT_SECRET = 'oauth-client-secret-abcdef1234567890xyz';

    // API Keys hardcoded
    const API_KEY = 'api-key-abcdefghijklmnopqrstuvwxy';
    const API_SECRET = 'api-secret-1234567890abcdefghijklmnop';
    const BEARER_TOKEN = 'Bearer-Token-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

    // JWT Tokens
    const JWT_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIn0.abcdef1234567890';
    const JWT_REFRESH_TOKEN = 'refresh.token.1234567890.abcdef.xyz';

    // Admin credentials
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'Admin123!Password';

    useEffect(() => {
        // Código de autenticação (exemplo vulnerável)
        const authenticate = async () => {
            const response = await fetch('https://api.example.com/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${BEARER_TOKEN}`,
                },
                body: JSON.stringify({
                    client_id: OAUTH_CLIENT_ID,
                    client_secret: OAUTH_CLIENT_SECRET, // NUNCA expor isso!
                    username: ADMIN_USERNAME,
                    password: ADMIN_PASSWORD,
                }),
            });
        };
    }, []);

    return (
        <div>
            <h1>OAuth Handler</h1>
            <p>This component contains hardcoded secrets that should never be exposed!</p>
        </div>
    );
};

export default OAuthHandler;
