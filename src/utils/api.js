import { db } from "../initFirebase";
import {
  collection,
  addDoc,
  doc,
  writeBatch,
  getDocs,
} from "firebase/firestore";
import { formateDate, capitalizeFirstLetter } from "./service";

function formateData(data) {
  data.createdDate = new Date(data.createdDate);
  data.formatedDate = formateDate(data.createdDate);
  data.upVoteCount = data.upVote.length;
  data.title = capitalizeFirstLetter(data.title);
  data.description = capitalizeFirstLetter(data.description);
  data.createdBy = capitalizeFirstLetter(data.createdBy);
  return data;
}

async function readCollection(key) {
  const data = [];
  const querySnapshot = await getDocs(collection(db, key));
  querySnapshot.forEach((doc) => {
    data.push({
      ...formateData(doc.data()),
      id: doc.id,
    });
  });
  return data;
}

async function addToCollection(data, key) {
  return await addDoc(collection(db, key), data);
}

async function updateCollection(id, data, upVote, key) {
  const batch = writeBatch(db);
  const ref = doc(db, key, id);
  batch.update(ref, { [upVote]: data });
  await batch.commit();
}

export { readCollection, addToCollection, updateCollection };
