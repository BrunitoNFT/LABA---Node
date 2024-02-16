//Part 1: Class Design

/**
 * Represents a Book in the bookstore.
 */
class Book {
  private _title: string;
  private _author: string;
  private _isbn: string;
  private _price: number;
  private _availability: boolean;
  constructor(
    title: string,
    author: string,
    isbn: string,
    price: number,
    availability: boolean
  ) {
    this._title = title;
    this._author = author;
    this._isbn = isbn;
    this._price = price;
    this._availability = availability;
  }
  public get title() {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
  }

  public get author() {
    return this._author;
  }

  public set author(value: string) {
    this._author = value;
  }

  public get isbn() {
    return this._isbn;
  }

  public set isbn(value: string) {
    this._isbn = value;
  }

  public get price() {
    return this._price;
  }

  public set price(value: number) {
    this._price = value;
  }

  public get availability() {
    return this._availability;
  }

  public set availability(value: boolean) {
    this._availability = value;
  }
}

/**
 * Represents a Fiction Book, inheriting from Book class.
 */
class BookFiction extends Book {
  private _type: string = 'fiction';
  constructor(
    title: string,
    author: string,
    isbn: string,
    price: number,
    availability: boolean
  ) {
    super(title, author, isbn, price, availability);
  }

  get type() {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }
}

/**
 * Represents a Non-Fiction Book, inheriting from Book class.
 */
class BookNonFiction extends Book {
  private _type: string = 'non-fiction';
  constructor(
    title: string,
    author: string,
    isbn: string,
    price: number,
    availability: boolean
  ) {
    super(title, author, isbn, price, availability);
  }
  get type() {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }
}

/**
 * Represents a User of the bookstore.
 */
class User {
  private _name: string;
  private _email: string;
  private _userId: string;
  constructor(name: string, email: string, userId: string) {
    this._name = name;
    this._email = email;
    this._userId = userId;
  }
  public get name() {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get email() {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
  public get userId() {
    return this._userId;
  }
  public set userId(value: string) {
    this._userId = value;
  }
}

/**
 * Represents a Cart in the bookstore.
 */
class Cart {
  private _books: Book[];
  private _user: User;
  constructor(books: Book[], user: User) {
    this._books = books;
    this._user = user;
  }

  public get books() {
    return this._books;
  }
  public set books(value: Book[]) {
    this._books = value;
  }
  public get user() {
    return this._user;
  }
  public set user(value: User) {
    this._user = value;
  }

  addBook(book: Book) {
    this._books.push(book);
  }
  removeBook(book: Book) {
    this._books = this._books.filter(b => b.isbn !== book.isbn);
  }
  calculateTotalPrice() {
    return this._books.reduce((total, book) => total + book.price, 0);
  }
  removeAll() {
    this._books = [];
  }
}

/**
 * Represents an Order in the bookstore.
 */
class Order {
  private _user: User;
  private _books: Cart;
  constructor(user: User, books: Book[] | Cart) {
    this._user = user;
    if (books instanceof Cart && books.books.length > 0) {
      this._books = books;
    } else {
      throw new Error('Orders are done with Carts greater than 0.');
    }
  }
  totalPrice() {
    return this._books.calculateTotalPrice();
  }
  pay() {
    let length = this._books.books.length;
    console.log(
      `User ${this._user.name} paid ${length} books for a total of $${(this
        ._books as Cart).calculateTotalPrice()}`
    );
  }
}

//Part 2: Implementation

// Instances of Books
let book1 = new Book('Book 1', 'Author 1', '123', 10, true);
let book2 = new BookFiction('Book 2', 'Author 2', '456', 20, false);
let book3 = new BookNonFiction('Book 3', 'Author 3', '789', 30, true);
let book4 = new Book('Book 4', 'Author 4', '101112', 40, false);

// Instances of Users
let user1 = new User('John Doe', 'john@example.com', '123');
let user2 = new User('Jane Doe', 'jane@example.com', '456');

// Instances of Carts
let cartUser1 = new Cart([], user1);
let cartUser2 = new Cart([], user2);

//Part 3: Demonstration

// Create a scenario where users browse books, add them to their carts, and place orders
console.log(
  'Scenario: Users browsing books, adding to carts, and placing orders\n'
);

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
console.log(
  `User ${user1.name}'s cart total: $${cartUser1.calculateTotalPrice()}`
);
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
console.log(
  `User ${user2.name}'s cart total: $${cartUser2.calculateTotalPrice()}`
);
console.log('');

// Placing orders
console.log('Placing Orders:');

console.log(`User ${user1.name} places an order `);
let orderDemonstration1 = new Order(user1, cartUser1);
console.log(`- ${book1.title} by ${book1.author}`);
console.log(`Total Price: $${orderDemonstration1.totalPrice()}`);
orderDemonstration1.pay();
console.log('');

console.log(`User ${user2.name} places an order `);
let orderDemonstration2 = new Order(user2, cartUser2);
console.log(`- ${book3.title} by ${book3.author}`);
console.log(`Total Price: $${orderDemonstration2.totalPrice()}`);
orderDemonstration2.pay();
console.log('');

/*
Encapsulation:
Encapsulation is well-maintained in this codebase through the use of private access modifier. 
Properties of the classes are accessed through getters and setters, ensuring controlled access to the internal state 
of the objects and promoting data integrity.
*/

/*
Polymorphism:
Polymorphism is demonstrated through inheritance in this codebase. The main Book class serves as a base class 
from which two subclasses, BookFiction and BookNonFiction, inherit. Despite being subclasses, instances of 
BookFiction and BookNonFiction can be treated as instances of Book, promoting code reuse and flexibility.
*/
