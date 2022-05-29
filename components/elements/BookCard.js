import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { API } from "../../constants/path";
import Modal from "react-responsive-modal";
import Image from "next/image";
//import { Rating } from "react-simple-star-rating";
import ReactStars from "react-rating-stars-component";

const bookRate = {
  size: 25,
  edit: true,
};

const BookCard = ({
  id,
  title,
  authors,
  publisher,
  publish_year,
  publish_number,
  comment,
  rate,
  status,
  cover,
  books,
  setBooks,
  setUpdate,
  book,
  setBook,
}) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const ratingChange = (newRating) => {
    setRating(newRating);
    console.log("new rating: ", newRating);
    const token = localStorage.getItem("token");
    console.log("state: ");
    axios
      .put(
        `${API}/api/books/${id}`,
        {
          publisher_name: publisher,
          author_name: authors,
          title: title,
          publication_year: publish_year,
          publication_number: publish_number,
          comment: comment,
          rate: newRating,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setUpdate(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (event) => {
    console.log("books: ", books);
    console.log(event.target.id);
    var array = books.filter((item) => item.id != event.target.id);
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
      id: id,
      publisher_name: publisher,
      author_name: authors,
      title: title,
      publication_year: publish_year,
      publication_number: publish_number,
      comment: comment,
      rate: rate,
      status: status,
      cover: cover,
    });
    setUpdate(true);
  };
  return (
    <div className="p-5 max-w-lg" id={id}>
      <div className="w-full rounded overflow-hidden shadow-lg bg-stone-300">
        <div className="px-6 py-4 bg-stone-300">
          <div className="font-bold text-3xl mb-2">{title}</div>
          {/*TODO: Image book cover */}
          <div>
            <img src={cover} alt={cover} width={150} height={200} />
          </div>
          <p className="text-gray-700 text-xl font-bold">{authors}</p>
          <p className="text-gray-700 text-base mt-4">{comment}</p>
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
          {/*
          <div className="flex flex-col">
            <div className="w-full flex-row justify-between">
              <input
                type="radio"
                id="toRead"
                name="toRead"
                value="Do przeczytania"
                onChange={handleReadingChange}
                checked={status === 0}
              />
              <label htmlFor="toRead">Do przeczytania</label>
            </div>
            <div className="justify-between">
              <input
                type="radio"
                id="reading"
                name="reading"
                value="Czytam"
                onChange={handleReadingChange}
                checked={status === 1}
              />
              <label htmlFor="reading">W trakcie czytania</label>
            </div>
            <div className="justify-between">
              <input
                type="radio"
                id="read"
                name="read"
                value="Przeczytana"
                onChange={handleReadingChange}
                checked={status === 2}
              />
              <label htmlFor="read">Przeczytana</label>
            </div>
          </div>          */}
        </div>

        {/*TODO: rating */}
        <div className="flex justify-end p-2">
          <ReactStars {...bookRate} value={rate} onChange={ratingChange} />
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
