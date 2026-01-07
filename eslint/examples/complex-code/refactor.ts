/**
 * ✅ CÓDIGO REFATORADO - Complex Code
 * 
 * Este arquivo mostra como simplificar e melhorar a qualidade do código
 */

interface OrderItem {
  price: number;
  quantity: number;
  inStock: boolean;
  allowBackorder?: boolean;
}

interface Order {
  items: OrderItem[];
  isExpress?: boolean;
}

interface User {
  loyaltyPoints: number;
  isActive?: boolean;
}

interface Discount {
  type: 'percentage' | 'fixed';
  value: number;
}

type UserType = 'premium' | 'regular' | 'guest';
type PaymentMethod = 'credit' | 'debit' | 'cash';
type Status = 'active' | 'inactive';

// ✅ SOLUÇÃO: Divida em funções menores (reduz complexidade)
function processOrderRefactored(order: Order, user: User, discount: Discount | null, isVIP: boolean): number {
  // Divida em funções menores e mais legíveis
  let total = calculateItemsTotal(order.items);
  
  if (discount) {
    total = applyDiscount(total, discount);
  }
  
  if (isVIP) {
    total = applyVIPBenefits(total, user, order);
  }
  
  return total;
}

function calculateItemsTotal(items: OrderItem[]): number {
  if (!items || items.length === 0) return 0;
  
  return items
    .filter(item => item.inStock || item.allowBackorder)
    .reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function applyDiscount(total: number, discount: Discount): number {
  if (discount.type === 'percentage' && discount.value > 0 && discount.value <= 100) {
    return total * (1 - discount.value / 100);
  }
  if (discount.type === 'fixed') {
    return Math.max(0, total - discount.value);
  }
  return total;
}

function applyVIPBenefits(total: number, user: User, order: Order): number {
  if (total > 1000) {
    total *= 0.9; // 10% de desconto VIP
  }
  
  if (user.loyaltyPoints > 500) {
    total -= 50;
  }
  
  if (order.isExpress) {
    total += 20;
  }
  
  return total;
}

// ✅ SOLUÇÃO: Use constantes ao invés de strings duplicadas
const USER_NOT_FOUND_MESSAGE = 'User not found';

function showUserMessagesRefactored(): void {
  // Em produção, use um logger apropriado (winston, pino, etc)
  // logger.error(USER_NOT_FOUND_MESSAGE);
  alert(USER_NOT_FOUND_MESSAGE);
  throw new Error(USER_NOT_FOUND_MESSAGE);
  document.title = USER_NOT_FOUND_MESSAGE;
}

// ✅ SOLUÇÃO: Extraia funções duplicadas (DRY - Don't Repeat Yourself)
function calculateTax(amount: number, rate: number = 0.15): number {
  const tax = amount * rate;
  const total = amount + tax;
  return Math.round(total * 100) / 100;
}

// Agora pode reusar:
const taxA = (amount: number) => calculateTax(amount);
const taxB = (amount: number) => calculateTax(amount);

// ✅ SOLUÇÃO: Combine condições (evite if aninhados)
function checkUserAccessRefactored(user: User | null): boolean {
  // Use && ao invés de if aninhados
  return user !== null && user.isActive === true;
}

// ✅ SOLUÇÃO: Remova branches duplicados
function getDiscountRefactored(userType: UserType): number {
  if (userType === 'premium') {
    return 0.2;
  }
  // Combine regular e guest
  return 0.1;
}

// ✅ SOLUÇÃO: Remova condições idênticas (código morto)
function processPaymentRefactored(amount: number, method: PaymentMethod): number {
  if (method === 'credit') {
    return amount * 1.03;
  }
  if (method === 'debit') {
    return amount * 1.01;
  }
  // Removida condição duplicada de 'credit'
  return amount;
}

// ✅ SOLUÇÃO: Valide tamanho correto da collection
function processItemsRefactored(items: OrderItem[]): string | undefined {
  if (items.length > 1) { // ✅ Checa length > 1 antes de acessar items[1]
    return items[1].toString();
  }
  return undefined;
}

// ✅ SOLUÇÃO: Use ou retorne a collection
function createUserListRefactored(): string[] {
  const users: string[] = [];
  users.push('John');
  users.push('Jane');
  return users; // ✅ Agora retorna o array
}

// ✅ SOLUÇÃO: Use if-else para poucos casos
function getStatusMessageRefactored(status: Status): string {
  // Switch com 2 casos → use if-else
  return status === 'active' ? 'User is active' : 'Unknown status';
}

// ✅ SOLUÇÃO: Retorne diretamente (sem variável temporária)
function calculateTotalRefactored(price: number, quantity: number): number {
  return price * quantity; // ✅ Retorno imediato
}

// ✅ BÔNUS: Use métodos de array ao invés de loops
function processOrderItems(items: OrderItem[]): number {
  // Ao invés de for loops, use map/filter/reduce
  return items
    .filter(item => item.inStock && item.quantity > 0)
    .map(item => item.price * item.quantity)
    .reduce((sum, itemTotal) => sum + itemTotal, 0);
}

export {
  processOrderRefactored,
  calculateItemsTotal,
  applyDiscount,
  applyVIPBenefits,
  showUserMessagesRefactored,
  calculateTax,
  checkUserAccessRefactored,
  getDiscountRefactored,
  processPaymentRefactored,
  processItemsRefactored,
  createUserListRefactored,
  getStatusMessageRefactored,
  calculateTotalRefactored,
  processOrderItems,
  USER_NOT_FOUND_MESSAGE
};
