'use client'
import {GoogleOAuthProvider} from '@react-oauth/google'


export function GoogleAuthProvider({children}:{children:React.ReactNode}){

    const clientId = process.env.NEXT_PUBLIC_GOOGLEAUTH_API || 'defaultClientId';

    return(
        <GoogleOAuthProvider clientId={clientId}>
            {children}
        </GoogleOAuthProvider>
    )
}