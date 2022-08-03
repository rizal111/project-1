import { useAuth } from "../providers/AuthProvider.js";

import { db } from "../services/Firebase.js";
import { getDocs, collection, query, where } from "firebase/firestore";

export const Employees = async () => {
  const getEmployees = await getDocs(
    query(
      collection(db, "Employees"),
      where("User_FK", "==", useAuth().currentUser)
    )
  );
  return getEmployees.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
