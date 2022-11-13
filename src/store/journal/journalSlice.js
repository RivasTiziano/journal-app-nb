import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    toggleSideBar: false,
    messageSaved: "",
    notes: [],
    active: null,
    // active: {
    //     id: 'ABC123',
    //     title: '',
    //     body: '',
    //     date: 1234567,
    //     imageUrls: [], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
    // }
    
  },
  reducers: {
    isSavingNote: (state) =>{
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.isSaving = false;
      state.notes.push(action.payload);
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = '';
    },
    setNotes: (state, action) => {
      state.notes = (action.payload);
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
    },
    setToggleSideBar: (state) => {
      state.toggleSideBar = !state.toggleSideBar
    },
    updateNote: (state, action) => {
      state.isSaving = false;

      state.notes = state.notes.map( note => {
        if(action.payload.id === note.id){
          return action.payload;
        }else{
          return note;
        }
      }) 

      state.messageSaved = `${ action.payload.title }, actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ]; 
      state.isSaving = false;
    },
    clearJournal: (state) => {
      state.isSaving = false
      state.messageSaved = ""
      state.notes = []
      state.active = null
    },
    deleteNoteById: (state, action) => {
      state.notes = state.notes.filter( note => note.id !== action.payload ); 
      state.active = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  isSavingNote,
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  clearJournal,
  setPhotosToActiveNote,
  setToggleSideBar,
} = journalSlice.actions;
