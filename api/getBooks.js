import axios from "axios";
import { API } from "../constants/path";

export default async function getBooks({ setBooks }) {
  const token = localStorage.getItem("token");
  axios
    .get(`${API}/api/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      setBooks(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}
