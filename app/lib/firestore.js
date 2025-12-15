/*
 * Firestore database operations for BiteBuddy.
 * Provides functions to add, retrieve, update, and delete food listings.
 */
import { db } from "./firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy 
} from "firebase/firestore";

export const addFoodListing = async (listing) => {
  const docRef = await addDoc(collection(db, "foodListings"), listing);
  return docRef.id;
};

export const getAllFoodListings = async () => {
  const q = query(collection(db, "foodListings"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const listings = [];
  querySnapshot.forEach((doc) => {
    listings.push({ id: doc.id, ...doc.data() });
  });
  return listings;
};

export const getUserFoodListings = async (userId) => {

  const q = query(
    collection(db, "foodListings"),
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  const listings = [];
  querySnapshot.forEach((doc) => {
    listings.push({ id: doc.id, ...doc.data() });
  });
  return listings.sort((a, b) => b.createdAt - a.createdAt);
};

export const updateFoodListing = async (id, data) => {
  const docRef = doc(db, "foodListings", id);
  await updateDoc(docRef, data);
};

export const deleteFoodListing = async (id) => {
  await deleteDoc(doc(db, "foodListings", id));
};