import { useState } from "react";

export type SelectOption = {
  label: string;
  value: any;
};

type MultipleSelectProps = {
  multiple: true;
  options: SelectOption[];
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SigleSelectProps = {
  multiple?: false;
  options: SelectOption[] | undefined;
  value: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (MultipleSelectProps | SigleSelectProps);

export function Select({ multiple, value, onChange, options }: SelectProps) {
  const [show, setShow] = useState<boolean>(false);
  const [hightlightedIndex, setHightlightedIndex] = useState<number>(0);

  const clearOptions = () => {
    if (multiple) {
      onChange([]);
    } else {
      onChange(undefined);
    }
  };

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

  const isOptionSelected = (option: SelectOption): boolean => {
    return multiple ? value.includes(option) : option === value;
  };

  const changeHighlightedIndex = (index: number): void => {
    setHightlightedIndex(index);
  };

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
