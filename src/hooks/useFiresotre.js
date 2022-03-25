import { useEffect, useState } from 'react'
import { db } from "./useStorage"
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const useFirestore = (data) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const dataRef = collection(db, data);
    const dataQuery = query(dataRef, orderBy("timestamp", "desc"));
    

    const unsub = onSnapshot(dataQuery, (snapshot) => {
      let documents = [];
      
      snapshot.docs.forEach(doc => {
        documents.push({ ...doc.data(), id: doc.id });
      })

      setDocs(documents);
    });

    return () => unsub();

  }, [data]);

  return { docs };
}

export default useFirestore;