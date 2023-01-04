/* This is my usersService. (note: users) Here you can find all the functions that communicate with the backend regarding users. */
import axios from "axios";
const baseUrl = "/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  /* response.data is an array of user objects. */
  return response.data;
};

/* Export default object with keys. */
export default { getAll };
