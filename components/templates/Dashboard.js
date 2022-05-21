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
import MyClock from "../elements/Clock";
import Clock from "react-clock";
import Link from "next/link";

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
      rate: 0,
      status: 0,
      cover: "",
    },
  ]);
  const [book, setBook] = useState(books[0]);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [dasboardContent, setDasboardContent] = useState("library");
  const [value, setValue] = useState(new Date());
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

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleAddBook = () => {
    setOpen(true);
  };

  const options = books.map((item) => ({
    value: item.title,
    label: item.title,
  }));

  return (
    <>
      <header className="w-full bg-gray-600 p-4 z-10 flex justify-between sticky top-0">
        {/*} <nav className="flex items-center">
          <div className="text-white text-xs hidden sm:block ml-2">
            <a
              href=""
              className="bg-gray-900 hover:bg-gray-700 p-2 rounded cursor-pointer"
            >
              BookApp
            </a>
            <a
              href=""
              className="bg-gray-900 hover:bg-gray-700 p-2 rounded cursor-pointer ml-1"
            >
              Ustawienia
            </a>
            <a
              href=""
              className="bg-gray-900 hover:bg-gray-700 p-2 rounded cursor-pointer ml-1"
            >
              {`Ilość książek: ${books.length}`}
            </a>
            <a
              href=""
              className="bg-gray-900 hover:bg-gray-700 p-2 rounded cursor-pointer ml-1"
              onClick={handleAddBook}
            >
              Dodaj pozycję
            </a>
          </div>
        </nav>
  */}
        <div className="flex w-full justify-between items-center">
          <div className="text-white">
            <h2 className="font-mono text-5xl text-gray-200">BookApp</h2>
          </div>
          <div className="w-1/4">
            <SearchInput options={options} />
          </div>
        </div>
      </header>

      <main className="flex w-full h-screen">
        <aside className="w-80 h-screen bg-gray shadow-md w-fulll hidden sm:block">
          <div className="flex flex-col justify-between h-screen px-4 bg-gray-600">
            <div className="text-sm">
              <button onClick={() => setDasboardContent("library")}className="bg-gray-900 text-white p-2 w-full rounded cursor-pointer hover:bg-gray-700 hover:text-blue-300">
                Moja biblioteka
              </button>

              <button
                className="bg-gray-900 text-white p-2 w-full rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300"
                onClick={handleAddBook}
              >
                Dodaj pozycję
              </button>
              <button onClick={() => setDasboardContent("profile")} className="bg-gray-900 text-white p-2 w-full rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300">
                Mój profil
              </button>
                <button onClick={() => setDasboardContent("about")} className="bg-gray-900 text-white p-2 w-full rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300">
                  O nas
                </button>
              <button
                className="bg-gray-900 text-white p-2 w-full rounded mt-2"
                disabled
              >
                {`Ilość książek: ${books.length}`}
              </button>
              <div className="bg-gray-900 text-white p-2 w-full h-60 rounded mt-2 cursor-pointer">
                Planuję przeczytać:
                <textarea className="bg-gray-900 text-white w-full h-40 rounded mt-4 cursor-pointer hover:bg-gray-700 focus:outline-none focus:bg-gray-700"></textarea>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Clock value={value} />
            </div>
            <div className="flex p-3 text-white bg-red-500 rounded cursor-pointer text-center text-sm">
              <button
                className="rounded inline-flex justify-between   items-center"
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

        { dasboardContent === "library" ? 

        <section className="w-full max-h-full overflow-y-scroll z-0 p-4 bg-gray-200">
          <div className="w-full h-auto flex flex-wrap text-md ">
            
            {books && books.length > 0 ? (
              books &&
              books.map((item) => {
                return (
                  <BookCard
                    // @ts-ignore
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
                    rate={item.rate}
                    status={item.status}
                    cover={item.cover}
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
        :
        dasboardContent === "about" ? 
        <section className="w-full max-h-full overflow-y-scroll z-0 p-4 bg-gray-200 flex flex-col justify-center items-center">
          <p>Aplikacja BookApp</p>
          <p>Zarządzaj swoją domową biblioteką</p>
          <p>Powstała jako projekt w ramach przedmiotu Aplikacje internetowe</p>
          <p>PUW semestr 4 grupa 2</p>
          <p>Autorzy</p>
          <p>Tomasz Ciuła nr indeksu: 148791</p>
          <p>Rafał Klepacz nr indeksu: </p>
          <p>Lucjan Bąkowski nr indeksu: </p>
          <p>20.05.2022 r.</p>
        </section> 
        :
        <section className="w-full max-h-full overflow-y-scroll z-0 p-4 bg-gray-200 flex justify-center items-center">Profil</section>
            }

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
