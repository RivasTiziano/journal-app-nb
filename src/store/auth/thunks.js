import { loginUserWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/provider"
import { clearJournal } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = ()=>{
    
    return async(dispatch)=>{
        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = ()=>{
    
    return async(dispatch)=>{
        dispatch(checkingCredentials())

        const result = await singInWithGoogle()

        if( !result.ok ) return dispatch(logout(result.errorMessage))

        dispatch(login(result))
        
    }
}

export const startCreatingUserWithEmailPassword = ({ displayName, email, password, }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await registerUserWithEmailPassword({ displayName, email, password });
    
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        
        dispatch( login( result ))

    }

}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await loginUserWithEmailPassword({ email, password });

        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );
        dispatch( login( result ));

    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();

        dispatch( clearJournal() )
        dispatch( logout() )
    }
}


