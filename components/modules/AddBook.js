import axios from "axios";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { API } from "../../constants/path";
import LoadingSpinner from "../elements/LoadingSpinner";
import getBooks from "../../api/getBooks";
import ReactStars from "react-rating-stars-component";
import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";



const AddBook = ({ setOpen, books, setBooks }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState({
    publisher_name: "",
    author_name: "",
    title: "",
    publication_year: 0,
    publication_number: 0,
    comment: "",
    rate: 0,
    status: 0,
    cover: "",
  });
  // TODO: dodawanie zdjęcia
  function getImageFileObject(imageFile) {
    console.log("imageFile", imageFile );
    setBook({ ...book, [book.cover]: imageFile})
  }
  function runAfterImageDelete(file) {
    console.log({ onDele: file });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBook((values) => ({ ...values, [name]: value }));
  };

  const handleRate = (newRating) => {
    console.log(newRating);
    setBook({ ...book, [book.rate]: newRating });
  };

  const handleAddBook = (event) => {
    setBooks([...books, book]);
    setIsLoading(true);
    //event.preventDefault();
    const token = localStorage.getItem("token");
    console.log("dodawanie książki: ", book);
    axios
      .post(`${API}/api/books/`, book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        //setBooks(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
    //setBooks({...books, book});
    setOpen(false);
    //Router.reload();
    setIsLoading(false);
  };

  useEffect(() => {
    getBooks({ setBooks });
  }, [setBooks]);

  if (isLoading === false) {
    return (
      <div>
        <form>
          <div className="mb-3 pt-0 justify-end">
            <h3>Dodaj nową pozycję</h3>
            <input
              type="text"
              name="title"
              placeholder="Tytuł ..."
              className="my-4 px-2 py-1 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              value={book.title || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              name="author_name"
              placeholder="Autorzy ..."
              className="my-4 px-2 py-1 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              value={book.author_name || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              name="publisher_name"
              placeholder="Wydawnictwo ..."
              className="my-4 px-2 py-1 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              value={book.publisher_name || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              name="publication_year"
              placeholder="Rok wydania ..."
              className="my-4 px-2 py-1 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              value={book.publication_year || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              name="publication_number"
              placeholder="Numer wydania ..."
              className="my-4 px-2 py-1 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              value={book.publication_number || ""}
              onChange={handleChange}
            />
            <textarea
              name="comment"
              placeholder="Twój komentarz ..."
              className="my-4 px-2 py-1 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
              value={book.comment || ""}
              onChange={handleChange}
            />
            {/* TODO: adding to add new book */}
            <div className="flex justify-between items-center">
              <select className="focus:outline-none" defaultValue={book.status || 0} onChange={(e) => setBook({...book, [book.status]: e.target.value})}>
                <option value="">Status pozycji</option>
                <option value="0">Do przeczytania</option>
                <option value="1">Czytam ...</option>
                <option value="2">Przeczytana</option>
              </select>
              <div className="flex items-center">
                <p className="mr-2">Twoja ocena</p>
                <ReactStars
                  count={5}
                  size={20}
                  onChange={handleRate}
                  value={book.rate || 0}
                />
              </div>
              <div>
                <h4>Dodaj okładkę</h4>
                <ImageUploader
                //onFileAdded={(img) => setBook({...book, [book.cover]: img})}
                  onFileAdded={(img) => getImageFileObject(img)} // function that runs to confirm that your image actually exists
                  onFileRemoved={(img) => runAfterImageDelete(img)} // function runs on once you delete your image
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button
              className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-gray-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setOpen(false)}
            >
              Anuluj
            </button>
            <button
              className="bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-gray-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleAddBook}
            >
              Zapisz
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return <div className="text-gray-900">Loading ...</div>;
  }
};

export default AddBook;
