import axios from "axios";

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
