import api from "./api";

export async function signUp(email, password, image, username) {
  const response = await api.post("/users", {
    email,
    password,
    image,
    username,
  });
  return response.data;
}
