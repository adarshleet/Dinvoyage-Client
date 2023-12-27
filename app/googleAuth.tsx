'use client'
import {GoogleOAuthProvider} from '@react-oauth/google'


export function GoogleAuthProvider({children}:{children:React.ReactNode}){
    return(
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLEAUTH_API || ''}>
            {children}
        </GoogleOAuthProvider>
    )
}