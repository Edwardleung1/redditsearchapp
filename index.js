// import reddit
import reddit from "./redditapi";

// element selector
// 1. Search-form
const searchForm = document.getElementById("search-form");
// 2. Search-input
const searchInput = document.getElementById("search-input");

// addEventlistener when SUBMIT form
searchForm.addEventListener("submit", (e) => {
  // get search input value
  const searchTerm = searchInput.value;
  // get CHECKED sort (checkboxes)
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // get limit
  const searchLimit = document.getElementById("limit").value;

  // check input in form
  if (searchTerm === "") {
    // show alert bootstrap message
    showMessage("Please add a search term", "alert-danger");
  }

  // clear input
  searchInput.value = "";

  // search Reddit, passing it to our reddit search function
  reddit.search(searchTerm, searchLimit, sortBy);

  // prevent form from submitting
  e.preventDefault();
});

// show message alert
function showMessage(message, className) {
  // create alert div from scratch (DOM manipulation)
  const div = document.createElement("div");
  // add class
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  // get parent container
  const searchContainer = document.getElementById("search-container");
  // get search (before)
  const search = document.getElementById("search");

  // insert div message alert before search element
  searchContainer.insertBefore(div, search);

  // remove timeout alert div after 3s
  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}
