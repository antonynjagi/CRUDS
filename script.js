let users = JSON.parse(localStorage.getItem("users")) || [];

function saveData() {
  localStorage.setItem("users", JSON.stringify(users));
}

function fetchUsers(data = users) {
  const list = document.getElementById("userList");
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML = "<p>No users found.</p>";
    return;
  }

  data.forEach((user, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${user.name} - ${user.email}
      <div class="actions">
        <button class="edit" onclick='editUser(${index})'>Edit</button>
        <button class="delete" onclick='deleteUser(${index})'>Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function editUser(index) {
  const user = users[index];
  document.getElementById("userId").value = index;
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
}

function deleteUser(index) {
  if (confirm("Are you sure you want to delete this user?")) {
    users.splice(index, 1);
    saveData();
    fetchUsers();
  }
}

function searchUsers() {
  const term = document.getElementById("searchInput").value.toLowerCase();
  const results = users.filter(user =>
    user.name.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term)
  );
  fetchUsers(results);
}

document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const id = document.getElementById("userId").value;

  if (!name || !email) return;

  if (id) {
    // Update
    users[id] = { name, email };
    document.getElementById("userId").value = "";
  } else {
    // Add new
    users.push({ name, email });
  }

  saveData();
  fetchUsers();

  // Reset form
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
});

// Initial load
fetchUsers();