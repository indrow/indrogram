import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/config";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

initializeApp(firebaseConfig);

const storage = getStorage();
const db = getFirestore();

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", (snapshot) => {
      const uploadProgress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
      setProgress(uploadProgress);

    }, (err) => {
      setError(err);

    }, async () => {
      const url = await getDownloadURL(storageRef);
      setUrl(url);
      try {
        const timestamp = Timestamp.now();
        await addDoc(collection(db, "images"), { url, timestamp });
      } catch(err) {
        setError(err);
      }

    })
  }, [file]);

  return { progress, url, error };
};

export { useStorage, db };
