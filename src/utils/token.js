


export  function saveToken(token) {
  if (typeof token === "string") {
    localStorage.setItem("token", token);
  } else {
    console.warn("Attempted to save non-string token");
  }
}

export function removeToken() {
  localStorage.removeItem("access_token");
}
