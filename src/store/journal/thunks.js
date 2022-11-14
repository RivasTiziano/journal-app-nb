import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import {
  isSavingNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  setPhotosToActiveNote,
  deleteNoteById,
} from "./journalSlice";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(isSavingNote());

    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().toJSON(),
    };

    const newDoc = doc(collection(firebaseDB, `${uid}/Journal/Notes`));
    await setDoc(newDoc, newNote);
    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startGettinNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El uid no existe.");

    const collectionRef = collection(firebaseDB, `${uid}/Journal/Notes`);
    const docs = await getDocs(collectionRef);

    const notes = [];

    docs.forEach((doc) => {
      notes.push({ id: doc.id, ...doc.data() });
    });

    dispatch(setNotes(notes));
  };
};

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    const docRef = doc(firebaseDB, `${uid}/Journal/Notes/${note.id}`);

    await setDoc(docRef, noteToFirestore, { merge: true });

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = ( files = [] ) => {
  return async( dispatch ) => {
      dispatch( setSaving() );
          
      // await fileUpload( files[0] );
      const fileUploadPromises = [];
      for ( const file of files ) {
          fileUploadPromises.push( fileUpload( file ) )
      }

      const photosUrls = await Promise.all( fileUploadPromises );
      
      dispatch( setPhotosToActiveNote( photosUrls ));
      
  }
}

export const startDeleteNote = () => {
  return async( dispatch, getState ) => {

    // delete from firebase
    const { uid } = getState().auth;
    const { active:note } = getState().journal;

    if (!uid) throw new Error("El uid no existe.");

    const docRef = doc(firebaseDB, `${uid}/Journal/Notes/${note.id}`);
    await deleteDoc( docRef );



    // delete from store
    dispatch( deleteNoteById( note.id ) )
  }
}
