import Part from "./Part";
import { CoursePart } from "../types";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part, i) => (
        <Part key={i} part={part} />
      ))}
    </>
  );
};

export default Content;
