import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { setActiveNote } from "../../store/journal/journalSlice";
import {
  startDeleteNote,
  startSavingNote,
  startUploadingFiles,
} from "../../store/journal/thunks";
import { ImageGallery } from "../components/ImageGallery";
import { useRef } from "react";

export const NoteView = () => {
  const dispatch = useDispatch();
  const {
    active: note,
    isSaving,
    messageSaved,
  } = useSelector((state) => state.journal);

  const { formState, title, body, date, onInputChange } = useForm(note);

  const newDate = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota Guardada", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSavingNote());
  };

  const onFileChange = ({ target }) => {
    if (target.file === 0) return;

    dispatch(startUploadingFiles(target.files));
  };

  const fileInputRef = useRef();

  const onDelete = () => {
    dispatch( startDeleteNote() )
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1, gap: 3 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {newDate}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          multiple
          style={{ display: "none" }}
        />

        <IconButton
          onClick={() => fileInputRef.current.click()}
          disabled={isSaving}
          color="primary"
        >
          <UploadOutlined />
        </IconButton>

        <Button disabled={isSaving} onClick={onSaveNote} sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          name="title"
          value={title}
          onChange={onInputChange}
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
        />

        <TextField
          name="body"
          value={body}
          onChange={onInputChange}
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      <ImageGallery images={note.imageUrls} />
    </Grid>
  );
};
