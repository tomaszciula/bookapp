import axios from "axios";
import { useRouter } from "next/router";
import react, { useEffect, useState } from "react";
import { API } from "../../constants/path";
import BookCard from "../elements/BookCard";
import SearchInput from "../elements/SearchInput";
import AddBook from "../modules/AddBook";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import EditBook from "../modules/EditBook";

const Dashboard = () => {
  const [books, setBooks] = useState([
    {
      id: 0,
      publisher_name: "",
      author_name: "",
      title: "",
      publication_year: 0,
      publication_number: 0,
      comment: "",
    },
  ]);
  const [book, setBook] = useState(books[0]);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    open ? setOpen(false) : setUpdate(false);
  };
  const handleClick = (event) => {
    localStorage.removeItem("token");
    router.push("/");
  };
  const fetchBooks = async () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API}/api/books`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = () => {
    setOpen(true);
  };
  return (
    <>
      <header className="w-full bg-gray-600 p-4 flex justify-between items-center ">
        <nav className="flex items-center">
          <div className="text-white text-xs hidden sm:block ml-2">
            <a
              href="#"
              className="bg-gray-900 hover:bg-gray-700 p-2 rounded cursor-pointer"
            >
              BookApp
            </a>
            <a
              href="#"
              className="bg-gray-900 hover:bg-gray-700 p-2 rounded cursor-pointer ml-1"
            >
              Ustawienia
            </a>
            <a
              href="#"
              className="bg-gray-900 hover:bg-gray-700 p-2 rounded cursor-pointer ml-1"
            >
              {`Ilość książek: ${books.length}`}
            </a>
            <a
              href="#"
              className="bg-gray-900 hover:bg-gray-700 p-2 rounded cursor-pointer ml-1"
              onClick={handleAddBook}
            >
              Dodaj pozycję
            </a>
          </div>
        </nav>

        <div className="w-1/3 ">
          <SearchInput />
        </div>
      </header>

      <main className="flex w-full h-screen">
        <aside className="w-80 h-screen bg-gray shadow-md w-fulll hidden sm:block ">
          <div className="flex flex-col justify-between h-screen p-4 bg-gray-600">
            <div className="text-sm">
              <div className="bg-gray-900 text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300">
                Moja biblioteka
              </div>

              <div className="bg-gray-900 flex justify-between items-center text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300">
                <span>Wiadomości</span>
                <span className="w-4 h-4 bg-blue-600 rounded-full text-white text-center font-normal text-xs">
                  5
                </span>
              </div>
              <div className="bg-gray-900 text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300">
                Mój profil
              </div>
              <div className="bg-gray-900 text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300">
                XXX
              </div>
              <div className="bg-gray-900 text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300">
                YYY
              </div>
            </div>

            <div className="flex p-3 text-white bg-red-500 rounded cursor-pointer text-center text-sm">
              <button
                className="rounded inline-flex items-center"
                onClick={handleClick}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">Wyloguj mnie</span>
              </button>
            </div>
          </div>
        </aside>

        <section className="w-full p-4">
          <div className="w-full h-auto flex flex-wrap text-md">
            {books && books.length > 0 ? (
              books &&
              books.map((item) => {
                return (
                  <BookCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    authors={item.author_name}
                    publisher={item.publisher_name}
                    publish_year={item.publication_year}
                    publish_number={item.publication_number}
                    comment={item.comment}
                    setBooks={setBooks}
                    setUpdate={setUpdate}
                    book={book}
                    setBook={setBook}
                    books={books}
                  />
                );
              })
            ) : (
              <p>
                Nie masz jeszcze żadnych książek, dodaj pozycję klikając w Dodaj
                pozycję
              </p>
            )}
          </div>
        </section>
      </main>
      <Modal open={open} onClose={onCloseModal} center>
        <AddBook setOpen={setOpen} books={books} setBooks={setBooks} />
      </Modal>
      <Modal open={update} onClose={onCloseModal} center>
        <EditBook setUpdate={setUpdate} book={book} />
      </Modal>
    </>
  );
};

export default Dashboard;
