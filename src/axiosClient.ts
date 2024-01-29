import axios from "axios";
import { getValueFromLocalStorage } from "./Service/AuthService";

const url = "http://localhost:8000/api/v1/";
const token = getValueFromLocalStorage("token");


export const AuthUser = axios.create({
  baseURL: url,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization:`Bearer ${token}`,
  },
});


export const axl= axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  // withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});