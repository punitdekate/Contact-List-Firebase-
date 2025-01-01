import React, { useState } from "react";
import logo from "../../assets/address-book.png";
import styles from "./navbar.module.css";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getInitialContacts,
  getSearchResultContacts,
} from "../../redux/reducers/contacts.reducer";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchQuery === "" || !searchQuery) {
      dispatch(getInitialContacts(searchQuery));
      return;
    }
    dispatch(getSearchResultContacts(searchQuery));
  };
  return (
    <>
      <div className={styles.navbar}>
        {/* Left Section: Logo and App Name */}
        <div className={styles.left}>
          <img
            src={logo} // Replace with your logo path
            alt="Logo"
            className={styles.logo}
          />
          <span className={styles.appName}>Contact List</span>
        </div>

        {/* Right Section: Search Bar */}
        <div className={styles.right}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchBar}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
