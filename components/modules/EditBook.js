import axios from "axios";
import React, { useState } from "react";
import { API } from "../../constants/path";

const EditBook = ({ setUpdate, book }) => {

    const handleChange = (event) => {
        console.log(event);
      };
      const handleUpdateBook = () => {
        const token = localStorage.getItem("token");
        axios
          .put(`${API}/api/books/${book.id}`, book, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      
    return(
        <div>
        <form>
          <div className="mb-3 pt-0 justify-end">
            <h3>Edytuj pozycję</h3>
            <input
              type="text"
              name="title"
              //placeholder="Tytuł ..."
              className="my-4 px-2 py-1 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              value={book.title}
              onChange={handleChange}
            />
            <input
              type="text"
              name="author_name"
              placeholder="Autorzy ..."
              className="my-4 px-2 py-1 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              value={book.author_name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="publisher_name"
              placeholder="Wydawnictwo ..."
              className="my-4 px-2 py-1 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              value={book.publisher_name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="publication_year"
              placeholder="Rok wydania ..."
              className="my-4 px-2 py-1 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              value={book.publication_year}
              onChange={handleChange}
            />
            <input
              type="text"
              name="publication_number"
              placeholder="Numer wydania ..."
              className="my-4 px-2 py-1 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              value={book.publication_number}
              onChange={handleChange}
            />
            <textarea
              name="comment"
              placeholder="Twój komentarz ..."
              className="my-4 px-2 py-1 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              value={book.comment}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex justify-end">
            <button
              className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-gray-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setUpdate(false)}
            >
              Anuluj
            </button>
            <button
              className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-gray-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleUpdateBook}
            >
              Zapisz
            </button>
          </div>
        </form>
      </div>
    )

}

export default EditBook