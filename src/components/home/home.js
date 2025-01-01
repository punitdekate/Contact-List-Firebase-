import React, { useEffect, useState } from "react";
import ContactForm from "../contact/form/contact-form";
import ContactList from "../contact/list/contact-list";
import styles from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  contactSelector,
  getFavoriteContacts,
  updateContact,
} from "../../redux/reducers/contacts.reducer";

const Home = () => {
  const [isContactSelectedForUpdate, setIsContactSelectedForUpdate] =
    useState(null);
  const dispatch = useDispatch();
  const { favouriteContacts } = useSelector(contactSelector);

  useEffect(() => {
    dispatch(getFavoriteContacts());
  }, []);

  const onEdit = (contact) => {
    setIsContactSelectedForUpdate(contact);
  };

  const toggleFavorite = (contact) => {
    dispatch(
      updateContact({
        ...contact,
        isFavourite: contact.isFavourite ? false : true,
      })
    );
  };

  return (
    <div className={styles.homeContainer}>
      {/* Left Section: Contact Form with Favorites */}
      <div className={styles.leftSection}>
        {/* Favorites Section */}
        <div className={styles.favoritesSection}>
          <h2>Favourites</h2>
          <ul>
            {favouriteContacts.map((contact) => (
              <li key={contact.id} className={styles.favoriteItem}>
                <span>{contact.name}</span>
                <button onClick={() => toggleFavorite(contact)}>
                  {contact.isFavorite ? (
                    <i class="fa-solid fa-heart"></i>
                  ) : (
                    <i class="fa-solid fa-heart"></i>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact Form */}
        <ContactForm
          isContactSelectedForUpdate={isContactSelectedForUpdate}
          setIsContactSelectedForUpdate={setIsContactSelectedForUpdate}
        />
      </div>
      {/* Right Section: Contact List */}
      <div className={styles.rightSection}>
        <ContactList
          onEdit={onEdit}
          setIsContactSelectedForUpdate={setIsContactSelectedForUpdate}
        />
      </div>
    </div>
  );
};

export default Home;
