interface Result {
  periodLength: number;
  trainingDays: number;
  success: Boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseWeek: number[], target: number): Result => {
  const periodLength = exerciseWeek.length;
  const trainingDays = exerciseWeek.filter((value) => value !== 0).length;
  const success = trainingDays > target ? true : false;

  let rating;
  if (trainingDays > target) {
    rating = 1;
  } else if (trainingDays === target) {
    rating = 2;
  } else if (trainingDays < target) {
    rating = 3;
  }

  let ratingDescription;
  switch (rating) {
    case 1:
      ratingDescription = "Well done";
      break;
    case 2:
      ratingDescription = "All right";
      break;
    case 3:
      ratingDescription = "Needs improvement";
      break;
  }

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
