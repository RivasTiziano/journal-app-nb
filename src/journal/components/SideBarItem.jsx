import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TurnedInNot, TurnedIn } from '@mui/icons-material';
import { setActiveNote } from '../../store/journal/journalSlice';



export const SideBarItem = ({ activeIcon , title = '', body, id, date, imageUrls = [] }) => {

    const { isSaving } = useSelector(state=>state.journal);
    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch( setActiveNote({ title, body, id, date, imageUrls }) )
    }

    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title;
    },[ title ])

    const newBody = useMemo( () => {
        return body.length > 20
            ? body.substring(0,20) + '...'
            : body;
    },[ body ])

  return (
    <ListItem disablePadding>
        <ListItemButton disabled={ isSaving } onClick={ onClickNote } >
            <ListItemIcon>
                { activeIcon ? <TurnedIn /> : <TurnedInNot /> } 
            </ListItemIcon>
            <Grid container sx={{ flexDirection:  "column " }}>
                <ListItemText primary={ newTitle } />
                <ListItemText secondary={ newBody } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}