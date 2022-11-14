import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { firebaseAuth } from "../firebase/config";
import { changeMessage, login, logout } from "../store/auth/authSlice";
import { startGettinNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(changeMessage());
  }, [location.key]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) return dispatch(logout());

      const { uid, email, displayName, photoURL } = user;

      dispatch( login({ uid, email, displayName, photoURL }) );
      dispatch( startGettinNotes() );
    });
  }, []);

  return status;
};
