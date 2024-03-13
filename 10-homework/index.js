"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("./classes");
//Part 2: Implementation
// Instances of Books
let book1 = new classes_1.Book('Book 1', 'Author 1', '123', 10, 34);
let book2 = new classes_1.BookFiction('Book 2', 'Author 2', '456', 20, 12);
let book3 = new classes_1.BookNonFiction('Book 3', 'Author 3', '789', 30, 2);
let book4 = new classes_1.Book('Book 4', 'Author 4', '101112', 40, 45);
// Instances of Users
let user1 = new classes_1.User('John Doe', 'john@example.com', '123');
let user2 = new classes_1.User('Jane Doe', 'jane@example.com', '456');
// Instances of Carts
let cartUser1 = new classes_1.Cart([], user1);
let cartUser2 = new classes_1.Cart([], user2);
//Part 3: Demonstration
// Create a scenario where users browse books, add them to their carts, and place orders
console.log('Scenario: Users browsing books, adding to carts, and placing orders\n');
// User 1 browsing books
console.log(`User ${user1.name} (${user1.email}) is browsing books:`);
console.log(`- ${book1.title} by ${book1.author}`);
console.log(`- ${book2.title} by ${book2.author}`);
console.log('');
// User 1 adding books to cart
console.log(`User ${user1.name} adds ${book1.title} to their cart.`);
cartUser1.addBook(book1);
console.log(`User ${user1.name} adds ${book2.title} to their cart.`);
cartUser1.addBook(book2);
console.log(`User ${user1.name} removes ${book2.title} from their cart.`);
cartUser1.removeBook(book2);
console.log(`User ${user1.name}'s cart total: $${cartUser1.calculateTotalPrice()}`);
console.log('');
// User 2 browsing books
console.log(`User ${user2.name} (${user2.email}) is browsing books:`);
console.log(`- ${book3.title} by ${book3.author}`);
console.log(`- ${book4.title} by ${book4.author}`);
console.log('');
// User 2 adding books to cart
console.log(`User ${user2.name} adds ${book3.title} to their cart.`);
cartUser2.addBook(book3);
console.log(`User ${user2.name} adds ${book4.title} to their cart.`);
cartUser2.addBook(book4);
console.log(`User ${user2.name} removes ${book4.title} from their cart.`);
cartUser2.removeBook(book4);
console.log(`User ${user2.name}'s cart total: $${cartUser2.calculateTotalPrice()}`);
console.log('');
// Placing orders
console.log('Placing Orders:');
console.log(`User ${user1.name} places an order `);
let orderDemonstration1 = new classes_1.Order(user1, cartUser1);
console.log(`- ${book1.title} by ${book1.author}`);
console.log(`Total Price: $${orderDemonstration1.totalPrice()}`);
orderDemonstration1.pay();
console.log('');
console.log(`User ${user2.name} places an order `);
let orderDemonstration2 = new classes_1.Order(user2, cartUser2);
console.log(`- ${book3.title} by ${book3.author}`);
console.log(`Total Price: $${orderDemonstration2.totalPrice()}`);
orderDemonstration2.pay();
console.log('');
/*
Encapsulation:
Encapsulation is done through the use of private access modifier.
Properties of the classes are accessed through getters and setters, ensuring controlled access to the internal state
of the objects and promoting data integrity.
*/
/*
Polymorphism:
Polymorphism is demonstrated through inheritance. The main Book class serves as a base class
from which two subclasses, BookFiction and BookNonFiction, inherit. Despite being subclasses, instances of
BookFiction and BookNonFiction can be treated as Book, promoting code reuse and flexibility.
*/
