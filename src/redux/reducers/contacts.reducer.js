import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../init";
import { endLoader, startLoader } from "./loader.reducer";

const INITIAL_STATE = {
  contacts: [],
  error: null,
  isLoading: false,
  favouriteContacts: [],
};

// Create an async thunk for getting initial contacts
const getInitialContacts = createAsyncThunk(
  "contacts/getInitialContacts",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(startLoader());
      const snapshot = await getDocs(collection(db, "Contacts"));
      const contactList = snapshot.docs.map((item) => {
        return { id: item.id, ...item.data() };
      });
      return contactList;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to get contacts");
    } finally {
      thunkAPI.dispatch(endLoader());
    }
  }
);

const addContact = createAsyncThunk(
  "contacts/addContact",
  async (data, thunk) => {
    try {
      /** Reference to the "Contacts" collection */
      thunk.dispatch(startLoader());
      const contactsCollection = collection(db, "Contacts");
      /** Add a new contact to the collection */
      const docRef = await addDoc(contactsCollection, data);
      await thunk.dispatch(getInitialContacts());
    } catch (error) {
      thunk.dispatch(error?.message || "Failed to add contact");
    } finally {
      thunk.dispatch(endLoader());
    }
  }
);

const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (data, thunk) => {
    try {
      thunk.dispatch(startLoader());
      console.log(data);
      const contactDocRef = doc(db, "Contacts", data.id);
      await updateDoc(contactDocRef, data);
      await thunk.dispatch(getInitialContacts());
      await thunk.dispatch(getFavoriteContacts());
    } catch (error) {
      thunk.dispatch(error?.message || "Failed to update contact");
    } finally {
      thunk.dispatch(endLoader());
    }
  }
);

const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunk) => {
    try {
      thunk.dispatch(startLoader());
      const contactDocRef = doc(db, "Contacts", id);
      await deleteDoc(contactDocRef);
      await thunk.dispatch(getInitialContacts());
    } catch (error) {
      thunk.dispatch(error?.message || "Failed to update contact");
    } finally {
      thunk.dispatch(endLoader());
    }
  }
);

const getFavoriteContacts = createAsyncThunk(
  "contacts/getFavoriteContacts",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(startLoader());
      // Query the "Contacts" collection for documents where `isFavourite` is true
      const favoritesQuery = query(
        collection(db, "Contacts"),
        where("isFavourite", "==", true)
      );
      const snapshot = await getDocs(favoritesQuery);
      const favoriteContacts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return favoriteContacts;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to get favorite contacts");
    } finally {
      thunkAPI.dispatch(endLoader());
    }
  }
);

const getSearchResultContacts = createAsyncThunk(
  "contacts/getSearchResultContacts",
  async (searchQuery, thunk) => {
    try {
      thunk.dispatch(startLoader());

      // Reference the "Contacts" collection
      const contactsCollection = collection(db, "Contacts");

      // Create queries for `name`, `phone`, and `email`
      const nameQuery = query(
        contactsCollection,
        where("name", "==", searchQuery)
      );
      const phoneQuery = query(
        contactsCollection,
        where("phone", "==", searchQuery)
      );
      const emailQuery = query(
        contactsCollection,
        where("email", "==", searchQuery)
      );

      // Fetch the results for each query
      const [nameSnapshot, phoneSnapshot, emailSnapshot] = await Promise.all([
        getDocs(nameQuery),
        getDocs(phoneQuery),
        getDocs(emailQuery),
      ]);

      // Merge results into a single array and remove duplicates
      const contactsMap = new Map();

      const addToMap = (snapshot) => {
        snapshot.forEach((doc) => {
          contactsMap.set(doc.id, { id: doc.id, ...doc.data() });
        });
      };

      addToMap(nameSnapshot);
      addToMap(phoneSnapshot);
      addToMap(emailSnapshot);

      // Convert the map to an array
      return Array.from(contactsMap.values());
    } catch (error) {
      return thunk.rejectWithValue("Failed to get search contacts");
    } finally {
      thunk.dispatch(endLoader());
    }
  }
);

const contactSlice = createSlice({
  name: "contacts",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInitialContacts.pending, (state) => {
        state.contacts = [];
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getInitialContacts.fulfilled, (state, action) => {
        state.contacts = [...action.payload];
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getInitialContacts.rejected, (state, action) => {
        state.contacts = [];
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getFavoriteContacts.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getFavoriteContacts.fulfilled, (state, action) => {
        state.favouriteContacts = action.payload; // Store favorite contacts
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getFavoriteContacts.rejected, (state, action) => {
        state.favouriteContacts = [];
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(getSearchResultContacts.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getSearchResultContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getSearchResultContacts.rejected, (state, action) => {
        state.contacts = [];
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

const contactReducer = contactSlice.reducer;
const contactSelector = (state) => state.contactReducer;
export {
  getInitialContacts,
  addContact,
  updateContact,
  deleteContact,
  getFavoriteContacts,
  getSearchResultContacts,
  contactReducer,
  contactSelector,
};
