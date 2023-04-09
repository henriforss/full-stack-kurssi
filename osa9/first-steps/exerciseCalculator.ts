interface Result {
  periodLength: number;
  trainingDays: number;
  success: Boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  exerciseWeek: number[],
  target: number
): Result => {
  console.log(exerciseWeek);
  console.log(target);

  const periodLength = exerciseWeek.length;
  const trainingDays = exerciseWeek.filter((value) => value !== 0).length;
  const average = exerciseWeek.reduce((a, b) => a + b, 0) / periodLength;

  let rating: number = 0;
  if (average >= target + 0.5) {
    rating = 1;
  } else if (average >= target - 0.5) {
    rating = 2;
  } else if (average < target - 0.5) {
    rating = 3;
  }

  let ratingDescription: string = "";
  switch (rating) {
    case 1:
      ratingDescription = "well done";
      break;
    case 2:
      ratingDescription = "not too bad but could be better";
      break;
    case 3:
      ratingDescription = "bad";
      break;
  }

  const success = average > target ? true : false;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const exerciseWeek: number[] = process.argv.slice(3).map((item) => {
  const newItem = parseFloat(item);

  if (!isNaN(newItem) && newItem !== undefined) {
    return newItem;
  } else {
    throw new Error(`${item} is not a number`);
  }
});
const target: number = Number(process.argv[2]);

console.log(calculateExercises(exerciseWeek, target));
