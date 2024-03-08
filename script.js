// DOM
const title = document.querySelector(".title");
const author = document.querySelector(".author");
const table = document.querySelector(".table tbody");
const addBookBtn = document.querySelector(".add-book");
let readStatusBtn = null;
let deleteBtn = null;

let myLibrary = [];

let idx = 0;

function Book(title, author) {
  this.id = idx++;
  this.title = title;
  this.author = author;
  this.isRead = false;
  this.toggleStatus = function () {
    this.isRead = !this.isRead;
  };
}

Book.prototype.addBookToLibrary = function () {
  table.innerHTML = "";
  myLibrary.push(this);
  renderTable(myLibrary);
  displayBooks(myLibrary);
};

Book.prototype.removeBookFromLibrary = function () {
  let id = myLibrary.indexOf(this);
  myLibrary.splice(id, 1);
  table.innerHTML = "";
  renderTable(myLibrary);
  displayBooks(myLibrary);
};

function displayBook(element) {
  console.log("Title of book", element.id, "is:", element.title);
  console.log("Author of book", element.id, "is:", element.author);
}

function displayBooks(lib) {
  console.log("--------------- BOOKS -------------");
  lib.forEach((element) => {
    displayBook(element);
  });
  console.log("--------------- END -------------");
}

function renderTable(lib) {
  lib.forEach((book) => {
    renderBook(book);
  });
}

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

function handleBook() {
  const book = new Book(title.value, author.value);
  title.value = "";
  author.value = "";
  book.addBookToLibrary();

  console.log(readStatusBtn);
}

function handleStatus(target) {
  const id = target.parentElement.dataset.bookId;
  myLibrary[id].toggleStatus();
  console.log(myLibrary[id]);
  target.textContent = myLibrary[id].isRead ? "Already Read" : "Not yet read";
}

function handleDelete(target) {
  const id = target.parentElement.dataset.bookId;
  const book = myLibrary.find(el => el.id == id)
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
