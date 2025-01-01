import React, { useEffect } from "react";
import styles from "./contact-list.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  contactSelector,
  deleteContact,
  getInitialContacts,
  updateContact,
} from "../../../redux/reducers/contacts.reducer";
import { loaderSelector } from "../../../redux/reducers/loader.reducer";
import Loader from "../../loader/loader";

const ContactList = ({ onEdit, setIsContactSelectedForUpdate }) => {
  const { contacts } = useSelector(contactSelector);
  const { isLoading } = useSelector(loaderSelector);

  const dispatch = useDispatch();

  const loadContacts = async () => {
    await dispatch(getInitialContacts());
  };

  useEffect(() => {
    loadContacts();
  }, []);

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  const onLove = (contact) => {
    dispatch(
      updateContact({
        ...contact,
        isFavourite: contact.isFavourite ? false : true,
      })
    );
  };

  const onDelete = (contact) => {
    dispatch(deleteContact(contact.id));
  };
  return (
    <div className={styles.contactList}>
      <h2>Contacts</h2>
      {contacts.length === 0 ? (
        <p>No contacts added yet.</p>
      ) : (
        <table className={styles.contactTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email Address</th>
              <th>Phone</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Favourite</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact.id || index} className={styles.contactRow}>
                <td>{index + 1}</td>
                <td>{contact.name || "N/A"}</td>
                <td>
                  <a
                    href={`mailto:${contact.email}`}
                    className={styles.emailLink}
                  >
                    {contact.email || "N/A"}{" "}
                  </a>
                </td>
                <td>{contact.phone}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => onEdit(contact)}
                  >
                    <i class="fa-solid fa-pen"></i>
                  </button>
                </td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => onDelete(contact)}
                  >
                    <i class="fa-solid fa-trash-can"></i>
                  </button>
                </td>

                <td>
                  <button
                    className={
                      contact.isFavourite
                        ? styles.loveRedButton
                        : styles.loveButton
                    }
                    onClick={() => onLove(contact)}
                  >
                    <i class="fa-solid fa-heart"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactList;
