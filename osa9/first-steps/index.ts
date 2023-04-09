import express from "express";
import { calculateBMI } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

// prefix req with an underscore to inform the compiler there is no solution
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  const inputHeight = Number(height);
  const inputWeight = Number(weight);

  if (
    !isNaN(inputWeight) &&
    !isNaN(inputHeight) &&
    inputWeight !== 0 &&
    inputHeight !== 0
  ) {
    const returnString = calculateBMI(inputHeight, inputWeight);

    const returnObject = {
      weight: inputWeight,
      height: inputHeight,
      bmi: returnString,
    };

    res.status(200).json(returnObject);
  } else {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  /* If parameters are missing. */
  if (target === undefined || daily_exercises === undefined) {
    return res.status(400).json({ error: "parameters missing" });
  }

  /* If target or array is wrong. */
  if (
    isNaN(target) ||
    daily_exercises.some((item: any) => typeof item !== "number")
  ) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  /* Everything checks out. */
  const result = calculateExercises(daily_exercises, target);
  return res.status(200).json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
