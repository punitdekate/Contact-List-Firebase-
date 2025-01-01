import React, { useEffect, useState } from "react";
import styles from "./contact-form.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addContact,
  contactSelector,
  updateContact,
} from "../../../redux/reducers/contacts.reducer";

const ContactForm = ({
  isContactSelectedForUpdate,
  setIsContactSelectedForUpdate,
}) => {
  const { contacts } = useSelector(contactSelector);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    isFavourite: false,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isContactSelectedForUpdate) {
      setFormData(isContactSelectedForUpdate);
    }
  }, [isContactSelectedForUpdate]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const contactExists = contacts.find(
      (ele) =>
        (ele.email === formData.email || ele.phone === formData.phone) &&
        !isContactSelectedForUpdate
    );
    if (contactExists) {
      setError("Contact already exists");
      setFormData({ name: "", email: "", phone: "" }); // Reset form
      return;
    }
    if (isContactSelectedForUpdate) {
      setIsContactSelectedForUpdate(null);
      dispatch(updateContact(formData));
    } else {
      dispatch(addContact(formData));
    }
    setFormData({ name: "", email: "", phone: "" }); // Reset form
  };

  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 2000);
  }, [error]);

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <h2>Add Contact</h2>
      {error ? <p className={styles.errorMessage}>{error}</p> : null}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <button type="submit">
        {!isContactSelectedForUpdate ? "Add Contact" : "Update Contact"}
      </button>
    </form>
  );
};

export default ContactForm;
