// /**
//  * EXEMPLOS DE PROBLEMAS DETECTADOS PELO eslint-plugin-sonarjs
//  * 
//  * Este plugin detecta código complexo, duplicações e bugs lógicos
//  */

// interface OrderItem {
//   price: number;
//   quantity: number;
//   inStock: boolean;
//   allowBackorder?: boolean;
// }

// interface Order {
//   items: OrderItem[];
//   isExpress?: boolean;
// }

// interface User {
//   loyaltyPoints: number;
//   isActive?: boolean;
// }

// interface Discount {
//   type: 'percentage' | 'fixed';
//   value: number;
// }

// type UserType = 'premium' | 'regular' | 'guest';
// type PaymentMethod = 'credit' | 'debit' | 'cash';
// type Status = 'active' | 'inactive';

// // ❌ PROBLEMA: Cognitive Complexity muito alta
// // sonarjs/cognitive-complexity
// function processOrder(order: Order, user: User, discount: Discount | null, isVIP: boolean): number {
//   let total = 0;
  
//   if (order.items) {
//     for (let i = 0; i < order.items.length; i++) {
//       if (order.items[i].price) {
//         if (order.items[i].quantity > 0) {
//           if (order.items[i].inStock) {
//             total += order.items[i].price * order.items[i].quantity;
            
//             if (discount) {
//               if (discount.type === 'percentage') {
//                 if (discount.value > 0 && discount.value <= 100) {
//                   total = total - (total * discount.value / 100);
                  
//                   if (isVIP) {
//                     if (total > 1000) {
//                       total = total * 0.9; // 10% extra para VIP
                      
//                       if (user.loyaltyPoints > 500) {
//                         total = total - 50;
                        
//                         if (order.isExpress) {
//                           total = total + 20;
//                         }
//                       }
//                     }
//                   }
//                 }
//               } else if (discount.type === 'fixed') {
//                 total = total - discount.value;
//               }
//             }
//           } else {
//             if (order.items[i].allowBackorder) {
//               total += order.items[i].price * order.items[i].quantity;
//             }
//           }
//         }
//       }
//     }
//   }
  
//   return total;
// }

// // ❌ PROBLEMA: Duplicate strings
// // sonarjs/no-duplicate-string
// function showUserMessages(): void {
//   console.log("User not found");
//   alert("User not found");
//   throw new Error("User not found");
//   document.title = "User not found";
// }

// // ❌ PROBLEMA: Funções idênticas (código duplicado)
// // sonarjs/no-identical-functions
// function calculateTaxA(amount: number): number {
//   const tax = amount * 0.15;
//   const total = amount + tax;
//   return Math.round(total * 100) / 100;
// }

// function calculateTaxB(amount: number): number {
//   const tax = amount * 0.15;
//   const total = amount + tax;
//   return Math.round(total * 100) / 100;
// }

// // ❌ PROBLEMA: If statements que podem ser colapsados
// // sonarjs/no-collapsible-if
// function checkUserAccess(user: User | null): boolean {
//   if (user) {
//     if (user.isActive) {
//       return true;
//     }
//   }
//   return false;
// }

// // ❌ PROBLEMA: Branches duplicados
// // sonarjs/no-duplicated-branches
// function getDiscount(userType: UserType): number {
//   if (userType === 'premium') {
//     return 0.2;
//   } else if (userType === 'regular') {
//     return 0.1;
//   } else {
//     return 0.1;
//   }
// }

// // ❌ PROBLEMA: Condições idênticas
// // sonarjs/no-identical-conditions
// function processPayment(amount: number, method: PaymentMethod): number {
//   if (method === 'credit') {
//     return amount * 1.03;
//   } else if (method === 'debit') {
//     return amount * 1.01;
//   } else if (method === 'cash') {
//     return amount * 1.05;
//   }
//   return amount;
// }

// // ❌ PROBLEMA: Collection size mischeck
// // sonarjs/no-collection-size-mischeck
// function processItems(items: OrderItem[]): string | undefined {
//   if (items.length > 0) {
//     return items[1].toString();
//   }
// }

// // ❌ PROBLEMA: Unused collection
// // sonarjs/no-unused-collection
// function createUserList(): void {
//   const users: string[] = [];
//   users.push('John');
//   users.push('Jane');
// }

// // ❌ PROBLEMA: Switch com poucos cases
// // sonarjs/no-small-switch
// function getStatusMessage(status: Status): string {
//   switch(status) {
//     case 'active':
//       return 'User is active';
//     default:
//       return 'Unknown status';
//   }
// }

// // ❌ PROBLEMA: Pode retornar imediatamente
// // sonarjs/prefer-immediate-return
// function calculateTotal(price: number, quantity: number): number {
//   return price * quantity;
// }

// export {
//   processOrder,
//   showUserMessages,
//   calculateTaxA,
//   calculateTaxB,
//   checkUserAccess,
//   getDiscount,
//   processPayment,
//   processItems,
//   createUserList,
//   getStatusMessage,
//   calculateTotal
// };
