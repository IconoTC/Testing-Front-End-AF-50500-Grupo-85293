import axios from "axios";

export type User = {
    id: string;
    name: string;
};

const url = 'https://jsonplaceholder.typicode.com/users';

export const getUsersByFetch = async (): Promise<User[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();

  return data;
}

export const getUserByAxios = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(url);
  return response.data;
}
