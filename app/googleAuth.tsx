'use client'
import {GoogleOAuthProvider} from '@react-oauth/google'


export function GoogleAuthProvider({children}:{children:React.ReactNode}){
    return(
        <GoogleOAuthProvider clientId='70056155461-hiq3rh4jsitss8j0qmvsih680t6sunhf.apps.googleusercontent.com'>
            {children}
        </GoogleOAuthProvider>
    )
}