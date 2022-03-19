import react from "react";

const SearchInput = () => {
  return (
    <div className="flex w-full flex-wrap items-stretch">
      <input
        type="text"
        placeholder="Szukaj ..."
        className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"
      />
      <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
        <i className="fas fa-user"></i>
      </span>
    </div>
  );
};

export default SearchInput;
