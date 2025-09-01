const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

const libraryDisplay = document.getElementById("library");

function displayBooks() {
  libraryDisplay.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-id", book.id);

    // Book details
    const bookDetails = document.createElement("div");
    bookDetails.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${book.read ? "Read ✅" : "Not Read ❌"}</p>
    `;
    bookCard.appendChild(bookDetails);

    // Toggle read button
    const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("toggle-read");
    toggleBtn.textContent = book.read ? "Mark as Unread" : "Mark as Read";

    if (book.read) {
      toggleBtn.classList.add("read"); // green
    } else {
      toggleBtn.classList.add("not-read"); // red
    }

    toggleBtn.addEventListener("click", () => {
      book.toggleReadStatus();
      displayBooks();
    });
    bookCard.appendChild(toggleBtn);

    // Remove button
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-book");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      removeBook(book.id);
    });
    bookCard.appendChild(removeBtn);

    // Add card to display
    libraryDisplay.appendChild(bookCard);
  });
}

function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

// ----------- FORM & DIALOG ----------
const dialog = document.getElementById("bookDialog");
const newBookBtn = document.getElementById("newBookBtn");
const bookForm = document.getElementById("bookForm");

newBookBtn.addEventListener("click", () => dialog.showModal());

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, read);

  dialog.close();
  bookForm.reset();
});

// ----------- Test books -----------
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
