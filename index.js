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
  reddit.search(searchTerm, searchLimit, sortBy).then((results) => {
    // output results to UI
    let output = `<div class="card-columns">`;
    // loop through posts
    results.forEach((post) => {
      // check for image is available
      const image = post.preview ? post.preview.images[0].source.url : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";

      output += `
      <div class="card>
        <img class="card-img-top" src="${image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${truncateText(post.selftext, 100)}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      `;
    });

    // add ending div
    output += "</div>";

    // output card to UI
    document.getElementById("results").innerHTML = output;
  });

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

// Truncate Text
function truncateText(text, limit) {
  // making sure its end of a word " "
  const shortened = text.indexOf(" ", limit);
  // if it doesn't match a space it will return -1
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
