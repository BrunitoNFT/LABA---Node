"use strict";
//Part 1: export  Design
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.Cart = exports.User = exports.BookNonFiction = exports.BookFiction = exports.Book = void 0;
/**
 * Represents a Book in the bookstore.
 */
class Book {
    /**
     * Constructs a new Book instance.
     * @param title - The title of the book.
     * @param author - The author of the book.
     * @param isbn - The ISBN of the book.
     * @param price - The price of the book.
     * @param availability - The availability of the book (number of copies available).
     */
    constructor(title, author, isbn, price, availability) {
        this._title = title;
        this._author = author;
        this._isbn = isbn;
        this._price = price;
        this._availability = availability;
    }
    // Getters and setters for book properties
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get author() {
        return this._author;
    }
    set author(value) {
        this._author = value;
    }
    get isbn() {
        return this._isbn;
    }
    set isbn(value) {
        this._isbn = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get availability() {
        return this._availability;
    }
    set availability(value) {
        this._availability = value;
    }
    /**
     * Checks if the book is available for purchase.
     * @returns A boolean indicating availability.
     */
    get isAvailable() {
        if (this._availability > 0) {
            return true;
        }
        return false;
    }
}
exports.Book = Book;
/**
 * Represents a Fiction Book, inheriting from Book export class.
 */
class BookFiction extends Book {
    /**
     * Constructs a new BookFiction instance.
     * @param title - The title of the book.
     * @param author - The author of the book.
     * @param isbn - The ISBN of the book.
     * @param price - The price of the book.
     * @param availability - The availability of the book (number of copies available).
     */
    constructor(title, author, isbn, price, availability) {
        super(title, author, isbn, price, availability);
        this._type = 'fiction';
    }
    /**
     * Gets the type of the book.
     * @returns The type of the book (fiction).
     */
    get type() {
        return this._type;
    }
}
exports.BookFiction = BookFiction;
/**
 * Represents a Non-Fiction Book, inheriting from Book export class.
 */
class BookNonFiction extends Book {
    /**
     * Constructs a new BookFiction instance.
     * @param title - The title of the book.
     * @param author - The author of the book.
     * @param isbn - The ISBN of the book.
     * @param price - The price of the book.
     * @param availability - The availability of the book (number of copies available).
     */
    constructor(title, author, isbn, price, availability) {
        super(title, author, isbn, price, availability);
        this._type = 'non-fiction';
    }
    get type() {
        return this._type;
    }
}
exports.BookNonFiction = BookNonFiction;
/**
 * Represents a User of the bookstore.
 */
class User {
    /**
     * Constructs a new User instance.
     * @param name - The name of the user.
     * @param email - The email of the user.
     * @param userId - The ID of the user.
     */
    constructor(name, email, userId) {
        this._name = name;
        this._email = email;
        this._userId = userId;
    }
    // Getters and setters for user properties
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get userId() {
        return this._userId;
    }
    set userId(value) {
        this._userId = value;
    }
}
exports.User = User;
/**
 * Represents a Cart in the bookstore.
 */
class Cart {
    /**
     * Constructs a new Cart instance.
     * @param books - An array of books in the cart.
     * @param user - The user associated with the cart.
     */
    constructor(books, user) {
        this._books = books;
        this._user = user;
    }
    // Getters and setters for cart properties
    get books() {
        return this._books;
    }
    set books(value) {
        this._books = value;
    }
    get user() {
        return this._user;
    }
    set user(value) {
        this._user = value;
    }
    /**
     * Adds a book to the cart.
     * @param book - The book to add to the cart.
     */
    addBook(book) {
        this._books.push(book);
    }
    /**
     * Removes a book from the cart.
     * @param book - The book to remove from the cart.
     */
    removeBook(book) {
        this._books = this._books.filter(b => b.isbn !== book.isbn);
    }
    /**
     * Calculates the total price of all books in the cart.
     * @returns The total price of all books in the cart.
     */
    calculateTotalPrice() {
        return this._books.reduce((total, book) => total + book.price, 0);
    }
    /**
     * Removes all books from the cart.
     */
    removeAll() {
        this._books = [];
    }
}
exports.Cart = Cart;
/**
 * Represents an Order in the bookstore.
 */
class Order {
    /**
     * Constructs a new Order instance.
     * @param user - The user placing the order.
     * @param books - The cart containing the books to be ordered.
     * @throws Error if the cart is empty.
     */
    constructor(user, books) {
        this._user = user;
        if (books instanceof Cart && books.books.length > 0) {
            this._books = books;
        }
        else {
            throw new Error('Orders are done with Carts greater than 0.');
        }
    }
    /**
     * Calculates the total price of the order.
     * @returns The total price of the order.
     */
    totalPrice() {
        return this._books.calculateTotalPrice();
    }
    /**
     * Processes the payment for the order.
     * @throws Error if any book in the order is not available.
     */
    pay() {
        this._books.books.forEach(book => {
            if (!book.isAvailable) {
                throw new Error("There isn't stock for the book " + book.title);
            }
        });
        let length = this._books.books.length;
        console.log(`User ${this._user.name} paid ${length} ${length > 1 ? 'books' : 'book'} for a total of $${this._books.calculateTotalPrice()}`);
    }
}
exports.Order = Order;
