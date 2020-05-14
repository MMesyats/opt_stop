import React, { useState, useEffect } from "react";
import { Box, Label } from "@material-ui/core";
import Plot from "react-plotly.js";
import Form from "../Form/Form";

const Main = () => {
  const [size, setSize] = useState(100);
  const [count, setCount] = useState(1000);
  const [arrays, setArrays] = useState([]);
  const [absWinners, setAbsWinners] = useState([]);
  const [t, setT] = useState([]);
  const [p, setP] = useState([]);
  const [renderPlot, setRenderPlot] = useState(false);
  const [delta, setDelta] = useState(0.5);
  const [maxP, setMaxP] = useState(0);
  useEffect(() => {
    setRenderPlot(false);
    let tmpArray = new Array(+count).fill(new Array(+size).fill(0));
    setArrays(tmpArray.map((array) => array.map((item) => Math.random())));
    setT(new Array(+size).fill(0).map((item, idx) => idx));
  }, [size, count]);

  useEffect(() => {
    setAbsWinners(arrays.map((array) => Math.max(...array)));
  }, [arrays]);

  useEffect(() => {
    let wins;
    setP(
      t.map((i) => {
        if (i === 0) return 0;
        wins = 0;
        arrays.forEach((array, idx) => {
          const localArray = array.slice(0, i);
          const localWinner = Math.max(...localArray);
          let result = 0;
          for (let j = i; j < array.length - 1; j++) {
            if (localWinner < array[j]) {
              result = array[j];
              break;
            }
          }
          if (Math.abs(result - absWinners[idx]) <= delta) {
            wins++;
          }
        });
        console.log(i, wins);
        return wins / count;
      })
    );
    setRenderPlot(true);
  }, [absWinners, delta, arrays, count, size, t]);
  useEffect(() => {
    setMaxP(Math.max(...p));
  }, [p]);

  return (
    <div>
      <Box>
        <Form
          size={size}
          setSize={setSize}
          count={count}
          setCount={setCount}
          delta={delta}
          setDelta={setDelta}
        ></Form>
      </Box>
      <span>
        t:{p.indexOf(maxP)} P:{maxP}{" "}
      </span>
      <Box>{renderPlot && <Plot data={[{ x: t, y: p }]} />}</Box>
    </div>
  );
};

export default Main;
