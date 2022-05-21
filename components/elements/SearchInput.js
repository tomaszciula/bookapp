import react, { useState } from "react";
import Select from "react-select";

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    borderBottom: "1px dotted pink",
    color: state.selectProps.menuColor,
    padding: 20,
  }),

  control: (_, { selectProps: { width } }) => ({
    width: width,
  }),

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

const SearchInput = (props) => {
  const [text, setText] = useState(props.options[0]);
  const onChange = (selectedOption) => {
    setText(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };
  return (
    <div className="h-full items-center">
      <Select options={props.options} onChange={onChange} value={text} isClearable/>
    </div>
  );
};

export default SearchInput;
