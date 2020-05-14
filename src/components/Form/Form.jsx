import React from "react";
import { Input, InputLabel, TextField } from "@material-ui/core";
import "./Form.css";

const Form = ({ size, setSize, count, setCount, delta, setDelta }) => {
  return (
    <>
      <InputLabel>Количество альтернатив</InputLabel>
      <Input
        value={size}
        onChange={({ target: { value } }) => setSize(value)}
      />
      <InputLabel>Количество экспериментов</InputLabel>
      <Input
        value={count}
        onChange={({ target: { value } }) => setCount(value)}
      />
      <InputLabel>Уступка</InputLabel>
      <TextField
        type="number"
        value={delta}
        inputProps={{ step: 0.01 }}
        onChange={({ target: { value } }) => setDelta(value)}
      />
    </>
  );
};

export default Form;
