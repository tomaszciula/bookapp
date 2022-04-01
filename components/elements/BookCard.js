import axios from "axios";
import Router from "next/router";
import React, { useEffect } from "react";
import { API } from "../../constants/path";

const BookCard = ({
  id,
  title,
  authors,
  publisher,
  publish_year,
  publish_number,
  comment,
  books,
  setBooks,
}) => {
  const handleDelete = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .delete(`${API}/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBooks(res.data);
        Router.reload(); 
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="p-10">
      <div className="max-w-sm rounded overflow-hidden shadow-lg" id={id}>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{authors}</p>
          <p className="text-gray-700 text-base">{comment}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {publisher}
          </span>
          {publish_year ? (
            <span className="inline-block bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {publish_year}
            </span>
          ) : (
            ""
          )}
          {publish_number ? (
            <span className="inline-block bg-gray-200 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {publish_number}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="w-full flex justify-end p-2 ">
          <button
            className="bg-gray-900 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md hover:bg-gray-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Edytuj
          </button>
          <button
            className="bg-gray-900 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md hover:bg-gray-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={handleDelete}
          >
            Usuń
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
