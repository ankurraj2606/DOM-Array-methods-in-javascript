const api = `https://randomuser.me/api`;
const addUser = document.getElementById("user-btn");
const dscSortBtn = document.getElementById("sort-desc");
const ascSortBtn = document.getElementById("sort-asc");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");

const appState = [];

class User {
  constructor(title, firstname, lastname, gender, email) {
    this.title = `${title}`;
    this.name = `${firstname} ${lastname}`;
    this.email = email;
    this.gender = gender;
  }
}

addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
  });
  const userJson = await userData.json();
  const user = userJson.results[0];
  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );
  appState.push(classUser);
  console.log(appState);

  domRenderer(appState);
});

const domRenderer = (stateArr) => {
  userList.innerHTML = null;
  stateArr.forEach((userObj) => {
    userList.innerHTML += `<div>
    Name: ${userObj.title} ${userObj.name}
    <ol>
    <li>${userObj.gender}</li>
    <li>${userObj.email}</li>
    </ol>
    </div>`;
  });
};

searchInput.addEventListener("keyup", searchEventHandler);

function searchEventHandler(e) {
  const filterAppState = appState.filter(
    (user) =>
      user.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  domRenderer(filterAppState);
}

dscSortBtn.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name < b.name ? 1 : -1));

  domRenderer(appStateCopy);
});

ascSortBtn.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name < b.name ? -1 : 1));

  domRenderer(appStateCopy);
});
