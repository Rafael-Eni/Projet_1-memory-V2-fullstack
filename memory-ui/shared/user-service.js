export async function authenticate(credentials) {
  const response = await fetch(`http://localhost:8080/users/auth`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Authentication issue");
  }

  const body = await response.json();

  return body;
}

export async function register(user) {
  const response = await fetch(`http://localhost:8080/users/register`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Register issue");
  }
}

export async function updateUser(user) {
  const response = await fetch(`http://localhost:8080/users/`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Register probleme");
  }

  const body = await response.json();

  return body;
}

export async function getUserById(id) {
  const response = await fetch(`http://localhost:8080/users/${id}`);

  if (!response.ok) {
    throw new Error("No user found with the provided id");
  }

  const body = await response.json();

  return body;
}
