import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useDataContext } from "../../_context/UserContext";
import { ReactComponent as Dogs } from "../../assets/dogs.svg";

const Header = () => {
  const { data, userLogout } = useDataContext();

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" arial-label="Dogs - Home">
          <Dogs />
        </Link>
        <Link className={styles.login} to={data ? "/conta" : "/login"}>
          {data ? data.username : "Login / Criar"}
          {data && <button onClick={userLogout}>Logout</button>}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
