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