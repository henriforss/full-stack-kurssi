export const calculateBMI = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / Math.pow(heightInMeters, 2);

  try {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return "Normal (healthy weight)";
    } else if (bmi > 24.9 && bmi < 30) {
      return "Overweight";
    } else if (bmi >= 30) {
      return "Obese";
    } else {
      throw new Error("Check your parameters!");
    }
  } catch (error) {
    return error;
  }
};

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

console.log(calculateBMI(height, weight));
