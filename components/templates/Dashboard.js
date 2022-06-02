/* eslint-disable react/no-unescaped-entities */
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
import LoadingSpinner from "../elements/LoadingSpinner";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(books[0]);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [dasboardContent, setDasboardContent] = useState("library");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [text, setText] = useState();
  const [index, setIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [value, setValue] = useState(new Date());
  const router = useRouter();
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    open
      ? setOpen(false)
      : update
      ? setUpdate(false)
      : setChangePassword(false);
  };

  const handleClick = (event) => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleChange = (e) => {
    e.preventDefault();
    e.target.name === "old" ? setOldPassword(e.target.value) : null;
    e.target.name === "new" ? setNewPassword(e.target.value) : null;
    e.target.name === "repeat" ? setRepeatPassword(e.target.value) : null;

    console.log(oldPassword);
    console.log(newPassword);
    console.log(repeatPassword);
  };

  const handleChangePassword = () => {
    const token = localStorage.getItem("token");
    let password = {
      old_password: `${oldPassword}`,
      new_password: `${newPassword}`,
    };
    setIsLoading(true);
    axios
      .put(`${API}/api/users/`, password, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setChangePassword(true);
        console.log("user: ", response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
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
        console.log("get books: ", response.data);
        setBooks(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchPlanToRead = async () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${API}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("to read: ", response.data);
        const toRead = document.getElementById("PlanToRead");
        toRead.innerText = response.data.profile.plan_to_read;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchPlanToRead();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchBooks();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchBooks();
  }, [book]);

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleAddBook = () => {
    setOpen(true);
  };

  const PlanToRead = async (e) => {
    console.log(e.target.value);
    const token = localStorage.getItem("token");
    axios
      .patch(
        `${API}/api/users/`,
        {
          plan_to_read: `${e.target.value}`,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("plan to read: ", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onSearchChange = (selectedOption) => {
    setText(selectedOption);
    console.log(`Option selected:`, selectedOption.value);
    const titleToFind = selectedOption.value;
    const index = books.findIndex((el) => el.title === titleToFind);
    console.log(books[index].id);
    setIndex(index);
    setDasboardContent("searchedBook");
  };

  const options = books?.map((item) => ({
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
            <SearchInput
              options={options}
              value={text}
              onChange={onSearchChange}
            />
          </div>
        </div>
      </header>

      <main className="flex w-full h-screen">
        <aside className="w-80 h-screen bg-gray shadow-md w-fulll hidden sm:block">
          <div className="flex flex-col justify-between h-screen px-4 bg-gray-600">
            <div className="text-sm">
              <button
                onClick={() => setDasboardContent("library")}
                className="bg-gray-900 text-white p-2 w-full rounded cursor-pointer hover:bg-gray-700 hover:text-blue-300"
              >
                Moja biblioteka
              </button>
              <button
                className="bg-gray-900 text-white p-2 w-full rounded mt-2"
                disabled
              >
                {`Ilość książek: ${books.length}`}
              </button>
              <button
                className="bg-gray-900 text-white p-2 w-full rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300"
                onClick={handleAddBook}
              >
                Dodaj pozycję
              </button>

              <button
                onClick={() => setDasboardContent("profile")}
                className="bg-gray-900 text-white p-2 w-full rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300"
              >
                Zmiana hasła
              </button>
              <button
                onClick={() => setDasboardContent("about")}
                className="bg-gray-900 text-white p-2 w-full rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300"
              >
                O nas
              </button>
              <div className="bg-gray-900 text-white p-2 w-full h-60 rounded mt-2 cursor-pointer">
                Notatnik
                <textarea
                  id="PlanToRead"
                  className="bg-gray-900 text-white w-full h-40 rounded mt-4 cursor-pointer hover:bg-gray-700 focus:outline-none focus:bg-gray-700 whitespace-pre-line"
                  onBlur={PlanToRead}
                ></textarea>
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

        {dasboardContent === "library" ? (
          isLoading ? (
            <div className="w-full h-auto flex flex-wrap text-md justify-around">
              <LoadingSpinner />
            </div>
          ) : (
            <section className="w-full max-h-full overflow-y-scroll z-0 p-4 bg-gray-200">
              <div className="w-full h-auto flex flex-wrap text-md justify-around">
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
                        rate={item.rate}
                        status={item.status}
                        cover={item.cover}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                      />
                    );
                  })
                ) : (
                  <p>
                    Nie masz jeszcze żadnych książek, dodaj pozycję klikając w
                    Dodaj pozycję
                  </p>
                )}
              </div>
            </section>
          )
        ) : dasboardContent === "about" ? (
          <section className="w-full max-h-full overflow-y-scroll z-0 p-4 bg-gray-200 flex flex-col justify-center items-center">
            <div className="w-1/4 text-center">
              <p className="text-3xl font-bold mb-10">Aplikacja BookApp</p>
              <p className="font-medium mb-3">
                Zarządzaj swoją domową biblioteką
              </p>
              <p className="mb-3">
                Powstała jako projekt w ramach przedmiotu "Aplikacje
                internetowe"
              </p>
              <p className="mb-3">PUW semestr 4 grupa 2</p>
              <p className="font-bold mb-2">Autorzy</p>
              <p className="font-medium">Tomasz Ciuła nr indeksu: 148791</p>
              <p className="font-medium">Rafał Klepacz nr indeksu: </p>
              <p className="mb-3 font-medium">Lucjan Bąkowski nr indeksu: </p>
              <p className="text-sm">20.05.2022 r.</p>
            </div>
          </section>
        ) : dasboardContent === "searchedBook" ? (
          <section className="w-full max-h-full overflow-y-scroll z-0 p-4 bg-gray-200 flex flex-col justify-center items-center">
            <div className="mt-20">
              <BookCard
                id={books[index].id}
                title={books[index].title}
                authors={books[index].author_name}
                publisher={books[index].publisher_name}
                publish_year={books[index].publication_year}
                publish_number={books[index].publication_number}
                comment={books[index].comment}
                rate={books[index].rate}
                status={books[index].status}
                cover={books[index].cover}
                books={books}
                setBooks={setBooks}
                setUpdate={setUpdate}
                book={book}
                setBook={setBook}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
            </div>
          </section>
        ) : (
          <section className="w-full max-h-full overflow-y-scroll z-0 p-4 bg-gray-200 flex justify-center items-center">
            <form>
              <div className="pt-0 w-80 flex flex-col justify-items-end">
                <h3>Zmiana hasła</h3>
                <input
                  type="password"
                  name="old"
                  placeholder="Stare hasło"
                  className="my-4 px-2 py-1 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                  value={oldPassword}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="new"
                  placeholder="Nowe hasło"
                  className="my-4 px-2 py-1 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                  value={newPassword}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="repeat"
                  placeholder="Powtórz nowe hasło"
                  className="my-4 px-2 py-1 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                  value={repeatPassword}
                  onChange={handleChange}
                />
                <button
                  className="bg-gray-500 text-white active:bg-gray-600 mt-10 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-gray-600 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleChangePassword}
                >
                  Zmień hasło
                </button>
              </div>
            </form>
          </section>
        )}
      </main>
      <Modal open={open} onClose={onCloseModal} center>
        <AddBook
          setOpen={setOpen}
          books={books}
          setBooks={setBooks}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      </Modal>
      <Modal open={update} onClose={onCloseModal} center>
        <EditBook setUpdate={setUpdate} book={book} />
      </Modal>
      <Modal open={changePassword} onClose={onCloseModal} center>
        <div>Hasło zostało zmienione</div>
      </Modal>
    </>
  );
};

export default Dashboard;
