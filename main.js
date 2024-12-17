const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read yet"
    }`;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

function addBookToLibrary(library, book) {
  library.push(book);
}

function createBookElement(book) {
  // create li element
  let bookView = document.createElement("li");
  bookView.classList.add("book");
  // bookView.textContent = book.info();

  // create div inside for the book info
  let bookInfo = document.createElement("div");
  bookInfo.classList.add("book-info");
  // inside divs make 4 p elements
  let title = document.createElement("p");
  title.textContent = "Title: " + book.title;
  bookInfo.appendChild(title);
  let author = document.createElement("p");
  author.textContent = "Author: " + book.author;
  bookInfo.appendChild(author);
  let pages = document.createElement("p");
  pages.textContent = "Pages: " + book.pages;
  bookInfo.appendChild(pages);
  let read = document.createElement("p");
  read.textContent = "Read Status: " + (book.read ? "read" : "not read yet");
  bookInfo.appendChild(read);

  bookView.appendChild(bookInfo);

  // add read toggle button to li
  let readBtn = document.createElement("button");
  readBtn.classList.add("read-btn");
  readBtn.textContent = "Toggle Read Status";
  bookView.appendChild(readBtn);
  // add event listener to read-btn
  readBtn.addEventListener("click", (e) => {
    book.toggleRead();
    console.log(book.read);
    // NEED TO UPDATE THE VIEW SOMEHOW
    read.textContent = "Read Status: " + (book.read ? "read" : "not read yet");
  });

  // add remove book button to li
  let removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-btn");
  removeBtn.textContent = "Remove This Book";
  bookView.appendChild(removeBtn);
  // add event listener for remove button
  removeBtn.addEventListener("click", (e) => {
    if (!myLibrary.includes(book)) {
      return;
    }
    // remove book from library array
    removedBook = myLibrary.splice(myLibrary.indexOf(book), 1);
    // remove bookView from DOM
    bookView.remove();
  });

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

const new_book_btn = document.querySelector("#new-book-btn");
const add_book_dialog = document.querySelector("dialog");
const close_dialog_btn = document.querySelector("#close-dialog-btn");

new_book_btn.addEventListener("click", () => {
  add_book_dialog.showModal();
});

close_dialog_btn.addEventListener("click", () => {
  add_book_dialog.close();
});

// form logic
const form = add_book_dialog.querySelector("form");
form.addEventListener("submit", (event) => {
  // get form data and parse
  let form_data = new FormData(form);

  // create book and bookView from form data
  let new_book = new Book(...Object.fromEntries(form_data.entries()));
  new_book.read = form_data.has("read-status");
  addBookToLibrary(myLibrary, new_book);
  let new_bookView = createBookElement(new_book);
  library_list.appendChild(new_bookView);
});
