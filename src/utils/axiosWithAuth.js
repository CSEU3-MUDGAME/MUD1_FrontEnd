import axios from "axios";

export default function withAuth() {
  const token = localStorage.getItem("token");
  const instance = axios.create({
    baseURL: "https://lambda-mud-test.herokuapp.com",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
  });

  return instance;
}
