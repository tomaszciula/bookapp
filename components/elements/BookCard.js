import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { API } from "../../constants/path";
import Modal from "react-responsive-modal";

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
  setUpdate,
  book,
  setBook,
}) => {
  const [open, setOpen] = useState(false);
  const handleDelete = event => {
    console.log("books: ", books);
    console.log(event.target.id);
    var array = books.filter(item => item.id != event.target.id)
    console.log("array: ", array);
    setBooks(array);
    console.log(event.target.id);
    const token = localStorage.getItem("token");
    axios
      .delete(`${API}/api/books/${event.target.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setOpen(false);
        //setBooks(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdate = () => {
    setBook({
      publisher_name: publisher,
      author_name: authors,
      title: title,
      publication_year: publish_year,
      publication_number: publish_number,
      comment: comment,
    });
    setUpdate(true);
  };
  return (
    <div className="p-10" id={id}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
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
            onClick={handleUpdate}
          >
            Edytuj
          </button>
          <button
            className="bg-gray-900 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md hover:bg-gray-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setOpen(true)}
          >
            Usuń
          </button>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} center>
        <div className="flex flex-col w-80 rounded-sm">
          <span>Czy napewno chcesz usunąć?</span>
          <div className="flex w-full justify-between mt-10">
            <div>
              <button
                className="bg-gray-900 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md hover:bg-gray-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setOpen(false)}
              >
                Anuluj
              </button>
            </div>
            <div>
              <button
                className="bg-gray-900 text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md hover:bg-gray-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleDelete}
                id={id}
              >
                Usuń
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookCard;
