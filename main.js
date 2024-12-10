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
  // create li element
  let bookView = document.createElement("li");
  bookView.classList.add("book");
  bookView.textContent = book.info();

  // add button to li
  let removeBtn = document.createElement("button");
  removeBtn.classList.add("removeBtn");
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
