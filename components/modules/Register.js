import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { API } from "../../constants/path.js";
import LoadingSpinner from "../elements/LoadingSpinner.js";
import Auth from "../layouts/Auth.js";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post(`${API}/api/users/`, {
        username: `${email}`,
        password: `${password}`,
      })
      .then(function (response) {
        response ? router.push("/login") : router.push("/register");
        console.log(response);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full mt-20">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Utwórz nowe konto
                  </h6>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                  {/*
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Imię
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Imię"
                    />
                  </div>
  */}
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      onChange={handleEmailChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Hasło
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Hasło"
                      onChange={handlePasswordChange}
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Akcepuję{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Politykę Prywatności
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    {isLoading ? (
                      <button
                        type="button"
                        className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-gray-600 outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        disabled
                      >
                        <LoadingSpinner />
                      </button>
                    ) : (
                      <button
                        className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-gray-600 outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSubmit}
                      >
                        Utwórz konto
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Auth;
