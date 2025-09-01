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
    bookCard.innerHTML = `
    <h3>${book.title}</h3>
    <p><strong>Author:</strong> ${book.author}</p>
    <p><strong>Pages:</strong> ${book.pages}</p>
    <p><strong>Status:</strong> ${book.read ? "Read ✅" : "Not Read ❌"}</p>
    <button class="toggle-read">Toggle Read</button>
    <button class="remove-book">Remove</button>
  `;

 // Toggle read button
 bookCard.querySelector(".toggle-read").addEventListener("click", () => {
    book.toggleReadStatus();
    displayBooks();
  });

  // Remove button
  bookCard.querySelector(".remove-book").addEventListener("click", () => {
    removeBook(book.id);
  });

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