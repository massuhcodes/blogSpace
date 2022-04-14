// Will hold posts
let postsArray = [];
// DOM elements
const titleInput = document.getElementById("post-title");
const bodyInput = document.getElementById("post-body");
const form = document.getElementById("new-post");

// Will render posts for when initial code runs or new post is created
function renderPosts() {
  const html = postsArray
    .map((post) => {
      return `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr/>
        `;
    })
    .join("");
  document.getElementById("blog-list").innerHTML = html;
}

// Using fetch API to get posts from scrimba server
fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
  method: "GET",
})
  .then((response) => response.json())
  .then((posts) => {
      // get only 10 posts from server
    postsArray = posts.slice(0, 10);
    renderPosts();
  });

// Using fetch API for new post onto the server
form.addEventListener("submit", function (event) {
  // prevents from refreshing page when button is clicked
  event.preventDefault();
  // create a new post
  const newPost = {
    title: titleInput.value,
    body: bodyInput.value,
  };

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
    method: "POST",
    body: JSON.stringify(newPost), // must convert object to json
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json()) // convert back from json
    .then((post) => {
      postsArray.unshift(post); // adds to the front of array
      renderPosts();
    });
});
