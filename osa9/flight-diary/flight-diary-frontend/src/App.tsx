import axios from "axios";
import React, { useEffect, useState } from "react";
import { DiaryEntry, Weather, Visibility } from "./types";

const App = () => {
  const [diary, setDiary] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3001/api/diaries")
      .then((response) => {
        setDiary(response.data);
      });
  }, []);

  const createEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();

    axios
      .post<DiaryEntry>("http://localhost:3001/api/diaries", {
        date,
        visibility,
        weather,
        comment,
      })
      .then((response) => {
        setDiary(diary.concat(response.data));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data);
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        } else {
          console.log(error);
        }
      });

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  console.log(diary);
  console.log(visibility);
  console.log(weather);

  return (
    <div>
      <h1>Flight Diary Frontend</h1>

      <h2>Add new entry</h2>

      {errorMessage !== "" && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={createEntry}>
        <p>
          date:
          <input
            type="date"
            min={"2020-01-01"}
            max={"2023-12-31"}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <br />
          visibility:
          <input
            type="radio"
            name="visibility"
            id="visi-1"
            onChange={() => setVisibility("great")}
          />
          <label htmlFor="visi-1">great</label>
          <input
            type="radio"
            name="visibility"
            id="visi-2"
            onChange={() => setVisibility("good")}
          />
          <label htmlFor="visi-2">good</label>
          <input
            type="radio"
            name="visibility"
            id="visi-3"
            onChange={() => setVisibility("ok")}
          />
          <label htmlFor="visi-3">ok</label>
          <input
            type="radio"
            name="visibility"
            id="visi-4"
            onChange={() => setVisibility("poor")}
          />
          <label htmlFor="visi-4">poor</label>
          <br />
          weather:
          <input
            type="radio"
            name="weather"
            id="weather-1"
            onChange={() => setWeather("sunny")}
          />
          <label htmlFor="weather-1">sunny</label>
          <input
            type="radio"
            name="weather"
            id="weather-2"
            onChange={() => setWeather("rainy")}
          />
          <label htmlFor="weather-2">rainy</label>
          <input
            type="radio"
            name="weather"
            id="weather-3"
            onChange={() => setWeather("cloudy")}
          />
          <label htmlFor="weather-3">cloudy</label>
          <input
            type="radio"
            name="weather"
            id="weather-4"
            onChange={() => setWeather("stormy")}
          />
          <label htmlFor="weather-4">stormy</label>
          <input
            type="radio"
            name="weather"
            id="weather-5"
            onChange={() => setWeather("windy")}
          />
          <label htmlFor="weather-5">windy</label>
          <br />
          comment:
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <button type="submit">Add entry</button>
        </p>
      </form>

      <h2>Diary entries</h2>

      {diary.map((entry) => {
        return (
          <div key={entry.id}>
            <h3>{entry.date}</h3>
            <p>
              visibility: {entry.visibility} <br />
              weather: {entry.weather} <br />
              comment: {entry.comment}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
