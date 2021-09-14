import React, { createContext, useContext, useState, useEffect } from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "../api";

const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(null);
  const [login, setLogin] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function autoLogin() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setLoading(true);
          setError(null);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token inválido");
          await getUser(token);
        } catch (err) {
          await userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    autoLogin();
  }, []);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const { token } = await response.json();
      localStorage.setItem("token", token);
      await getUser(token);
    } catch (error) {
      setError(error.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  console.log({ error });

  async function userLogout() {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    localStorage.removeItem("token");
  }

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useDataContext() {
  const context = useContext(UserContext);
  return context;
}
