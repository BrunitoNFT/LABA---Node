//Part 1: export  Design

/**
 * Represents a Book in the bookstore.
 */
export class Book {
  private _title: string;
  private _author: string;
  private _isbn: string;
  private _price: number;
  private _availability: number;

  /**
   * Constructs a new Book instance.
   * @param title - The title of the book.
   * @param author - The author of the book.
   * @param isbn - The ISBN of the book.
   * @param price - The price of the book.
   * @param availability - The availability of the book (number of copies available).
   */

  constructor(
    title: string,
    author: string,
    isbn: string,
    price: number,
    availability: number
  ) {
    this._title = title;
    this._author = author;
    this._isbn = isbn;
    this._price = price;
    this._availability = availability;
  }

  // Getters and setters for book properties

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

  public set availability(value: number) {
    this._availability = value;
  }

  /**
   * Checks if the book is available for purchase.
   * @returns A boolean indicating availability.
   */

  public get isAvailable() {
    if (this._availability > 0) {
      return true;
    }
    return false;
  }
}

/**
 * Represents a Fiction Book, inheriting from Book export class.
 */
export class BookFiction extends Book {
  private _type: string; // The fixed type of the book

  /**
   * Constructs a new BookFiction instance.
   * @param title - The title of the book.
   * @param author - The author of the book.
   * @param isbn - The ISBN of the book.
   * @param price - The price of the book.
   * @param availability - The availability of the book (number of copies available).
   */

  constructor(
    title: string,
    author: string,
    isbn: string,
    price: number,
    availability: number
  ) {
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

/**
 * Represents a Non-Fiction Book, inheriting from Book export class.
 */
export class BookNonFiction extends Book {
  private _type: string;
  /**
   * Constructs a new BookFiction instance.
   * @param title - The title of the book.
   * @param author - The author of the book.
   * @param isbn - The ISBN of the book.
   * @param price - The price of the book.
   * @param availability - The availability of the book (number of copies available).
   */
  constructor(
    title: string,
    author: string,
    isbn: string,
    price: number,
    availability: number
  ) {
    super(title, author, isbn, price, availability);
    this._type = 'non-fiction';
  }
  get type() {
    return this._type;
  }
}

/**
 * Represents a User of the bookstore.
 */
export class User {
  private _name: string;
  private _email: string;
  private _userId: string;

  /**
   * Constructs a new User instance.
   * @param name - The name of the user.
   * @param email - The email of the user.
   * @param userId - The ID of the user.
   */

  constructor(name: string, email: string, userId: string) {
    this._name = name;
    this._email = email;
    this._userId = userId;
  }

  // Getters and setters for user properties

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
export class Cart {
  private _books: Book[];
  private _user: User;

  /**
   * Constructs a new Cart instance.
   * @param books - An array of books in the cart.
   * @param user - The user associated with the cart.
   */

  constructor(books: Book[], user: User) {
    this._books = books;
    this._user = user;
  }

  // Getters and setters for cart properties

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

  /**
   * Adds a book to the cart.
   * @param book - The book to add to the cart.
   */
  addBook(book: Book) {
    this._books.push(book);
  }

  /**
   * Removes a book from the cart.
   * @param book - The book to remove from the cart.
   */
  removeBook(book: Book) {
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

/**
 * Represents an Order in the bookstore.
 */
export class Order {
  private _user: User;
  private _books: Cart;

  /**
   * Constructs a new Order instance.
   * @param user - The user placing the order.
   * @param books - The cart containing the books to be ordered.
   * @throws Error if the cart is empty.
   */

  constructor(user: User, books: Book[] | Cart) {
    this._user = user;
    if (books instanceof Cart && books.books.length > 0) {
      this._books = books;
    } else {
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
    console.log(
      `User ${this._user.name} paid ${length} ${
        length > 1 ? 'books' : 'book'
      } for a total of $${(this._books as Cart).calculateTotalPrice()}`
    );
  }
}
