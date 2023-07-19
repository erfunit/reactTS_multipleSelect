import { useState } from "react";
import { Select, SelectOption } from "./components/Select";

const options: SelectOption[] = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
  { label: "Fifth", value: 5 },
];

const App = () => {
  const [value1, setValue1] = useState<SelectOption>(options[0]);
  const [value2, setValue2] = useState<SelectOption[]>([options[0]]);

  return (
    <div className="w-screen p-4 flex items-center flex-col justify-center">
      <Select
        multiple
        options={options}
        value={value2}
        onChange={(o) => setValue2(o)}
      />
      <br />

      <Select options={options} value={value1} onChange={(o) => setValue1(o)} />
    </div>
  );
};

export default App;
