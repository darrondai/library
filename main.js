const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${
    this.read ? "read" : "not read yet"
  }`;
};

function addBookToLibrary(library, book) {
  library.push(book);
}

function createBookElement(book) {
  let bookView = document.createElement("li");
  bookView.classList.add("book");
  bookView.textContent = book.info();
  return bookView;
}

// instantiate books and add to lib list
addBookToLibrary(myLibrary, new Book("The Hobbit", "J.R.R Tolkien", 295, true));

addBookToLibrary(myLibrary, new Book("Today", "Q", 23, false));

addBookToLibrary(myLibrary, new Book("Passport", "Redacted", 15, false));

addBookToLibrary(
  myLibrary,
  new Book("A Court of Thorns and Roses", "Sarah J. Maas", 448, false)
);

addBookToLibrary(myLibrary, new Book("Funny Story", "Emily Henry", 400, false));

addBookToLibrary(
  myLibrary,
  new Book("Crying in H Mart: A Memoir", "Michelle Zauner", 256, false)
);

// query DOM to get library HTML element
const library_list = document.querySelector(".library-list");

// make an element for each book in the library
for (let book of myLibrary) {
  let bookView = createBookElement(book);
  library_list.appendChild(bookView);
}
