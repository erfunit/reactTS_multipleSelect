// import the useState hook from react.
import { useState } from "react";

// define the SelectOption type with label and value properties.
export type SelectOption = {
  label: string;
  value: any;
};

// define the MultipleSelectProps type which includes multiple options, values, and an onChange method.
type MultipleSelectProps = {
  multiple: true;
  options: SelectOption[];
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

// define the SingleSelectProps type which includes a single or undefined option, value, and an onChange method.
type SigleSelectProps = {
  multiple?: false;
  options: SelectOption[] | undefined;
  value: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

// define the SelectProps type which is a combination of MultipleSelectProps and SingleSelectProps.
type SelectProps = {
  options: SelectOption[];
} & (MultipleSelectProps | SigleSelectProps);

// define the Select functional component.
export function Select({ multiple, value, onChange, options }: SelectProps) {
  // create state variables for show and highlightedIndex.
  const [show, setShow] = useState<boolean>(false);
  const [hightlightedIndex, setHightlightedIndex] = useState<number>(0);

  // clearOptions is a function that clears all options if the select is multiple, or sets the option as undefined if single.
  const clearOptions = () => {
    if (multiple) {
      onChange([]);
    } else {
      onChange(undefined);
    }
  };

  // selectOption is a function that either adds an option to the array or removes it if already present for multiple select,
  // or sets the value as the selected option for single select.
  const selectOption = (option: SelectOption): void => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((item) => item !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  };

  // isOptionSelected is a function that checks if an option is selected in multiple or single select mode.
  const isOptionSelected = (option: SelectOption): boolean => {
    return multiple ? value.includes(option) : option === value;
  };

  // changeHighlightedIndex is a function that sets the highlighted index to the specified value.
  const changeHighlightedIndex = (index: number): void => {
    setHightlightedIndex(index);
  };

  // Render the Select component, which includes functionality for opening/closing the options,
  // clearing selected options, selecting/deselecting options, and handling focus and blur events.
  return (
    <div
      onClick={() => setShow((prev) => !prev)}
      onBlur={() => setShow(false)}
      tabIndex={0}
      className="relative w-full max-w-[500px] min-h-[1.5rem] border p-3 border-gray-400 rounded-md flex items-center focus:border-blue-500"
    >
      <span className="flex-grow-[1] flex gap-2 text-lg">
        {multiple
          ? value.map((item) => (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(item);
                }}
                className="border bg-white p-1 flex gap-2 active:bg-red-600 active:text-white border-gray-400 rounded-md"
              >
                {item.label}
                <span>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
          className="text-gray-500 hover:text-black transition-all text-xl p-0"
        >
          &times;
        </button>
        <div className="self-stretch w-[1px] bg-gray-300" />
        <button
          style={{
            translate: "0 40%",
            border: "0.3em solid transparent",
            borderTopColor: "#777",
            cursor: "pointer",
          }}
        ></button>
      </div>
      <ul
        className={`absolute m-0 p-0 list-none maxh-h-[15em] overflow-y-auto border border-gray-400 rounded-md w-full left-0 top-[calc(100%+0.25em)] bg-white z-[100] ${
          show ? "block" : "hidden"
        }`}
      >
        {options?.map((item, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(item);
            }}
            onMouseOver={(e) => {
              e.stopPropagation();
              changeHighlightedIndex(index);
            }}
            className={`px-5 py-2 cursor-pointer transition-all ${
              isOptionSelected(item) ? "bg-blue-300" : ""
            } ${index === hightlightedIndex ? "text-white bg-blue-500" : ""}
            `}
            key={item.label}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
