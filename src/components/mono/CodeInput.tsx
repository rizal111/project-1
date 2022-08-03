import React, { FunctionComponent, useRef } from "react";
import { Button, TextField, CardContent, Alert, Box } from "@mui/material";

type Props = {
  onChange: (val: number) => void;
};

const CodeInput: FunctionComponent<Props> = ({ onChange }) => {
  const inputsRef = useRef<Array<HTMLInputElement>>([]);

  const updateValue = () => {
    const val = 3;
    onChange(val);
  };

  const handleChange = () => {};
  return (
    <div>
      <TextField
        className="code"
        id="outlined-name"
        type="number"
        onChange={handleChange}
      />
    </div>
  );
};

export default CodeInput;
