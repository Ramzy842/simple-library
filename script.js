// DOM
const title = document.querySelector(".title");
const author = document.querySelector(".author");
const table = document.querySelector(".table tbody");
const addBookBtn = document.querySelector(".add-book");
let readStatusBtn = null;
let deleteBtn = null;

let myLibrary = [];

let idx = 0;

function renderBook(book) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-book-id", book.id);
    const titleData = document.createElement("td");
    const authorData = document.createElement("td");
    const readStatusData = document.createElement("button");
    const deleteBtn = document.createElement("button");
    readStatusData.setAttribute("class", "btn read-status-btn");
    deleteBtn.setAttribute("class", "btn delete-btn");
    titleData.textContent = book.title;
    authorData.textContent = book.author;
    readStatusData.textContent = book.isRead ? "Already Read" : "Not yet read";
    deleteBtn.textContent = "Delete";
    tr.append(titleData);
    tr.append(authorData);
    tr.append(readStatusData);
    tr.append(deleteBtn);
    table.append(tr);
}

function renderTable(lib) {
    lib.forEach((book) => {
        renderBook(book);
    });
}
// book class

class Book {
    constructor(title, author) {
        this.id = idx++;
        this.title = title;
        this.author = author;
        this.isRead = false;
    }
    // GETTERS
    get _id() {
        return this.id;
    }
    get _title() {
        return this.title;
    }
    get _author() {
        return this.author;
    }
    get _isRead() {
        return this.isRead;
    }
    // SETTERS
    set _id(value) {
        this.id = value;
    }
    set _title(value) {
        this.title = value;
    }
    set _author(value) {
        this.author = value;
    }
    set _isRead(value) {
        this.isRead = value;
    }
    // METHODS
    toggleStatus() {
        this.isRead = !this.isRead;
    }
    addBookToLibrary() {
        table.innerHTML = "";
        myLibrary.push(this);
        renderTable(myLibrary);
        displayBooks(myLibrary);
    }
    removeBookFromLibrary() {
        let id = myLibrary.indexOf(this);
        myLibrary.splice(id, 1);
        table.innerHTML = "";
        renderTable(myLibrary);
        displayBooks(myLibrary);
    }
    display() {
        console.log("Title of book", this.id, "is:", this.title);
        console.log("Author of book", this.id, "is:", this.author);
    }
}

function displayBooks(lib) {
    console.log("--------------- BOOKS -------------");
    lib.forEach((element) => {
        element.display();
    });
    console.log("--------------- END -------------");
}

function handleBook() {
    let book = new Book(title.value, author.value);
    title.value = "";
    author.value = "";
    book.addBookToLibrary();
}

function handleStatus(target) {
    const id = target.parentElement.dataset.bookId;
    myLibrary[id].toggleStatus();
    target.textContent = myLibrary[id].isRead ? "Already Read" : "Not yet read";
}

function handleDelete(target) {
    const id = target.parentElement.dataset.bookId;
    const book = myLibrary.find((el) => el.id == id);
    book.removeBookFromLibrary();
}

addBookBtn.addEventListener("click", handleBook);
document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("read-status-btn")) {
        handleStatus(target);
    } else if (target.classList.contains("delete-btn")) {
        handleDelete(target);
    }
});
