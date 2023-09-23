"use client"

//import { Loader2 } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'


interface SignOutButtonProps {
    iconStyle: boolean;
  }
  
  const SignOutButton: FC<SignOutButtonProps> = ({ iconStyle }) => {
    const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
    const signOutFunction = async () => {
        setIsSigningOut(true);
        try {
          await signOut({ callbackUrl: '/' }); // Replace with your actual sign-out logic
        } catch (error) {
          toast.error('There was a problem signing out');
        } finally {
          setIsSigningOut(false);
        }
      }
  
    return (
      <>
        {iconStyle ? (
          <button
            onClick={signOutFunction}
          >
            {isSigningOut ? (
              <svg
                version="1.1"
                id="loader-1"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 aspect-square mr-6"
                x="0px"
                y="0px"
                width="40px"
                height="40px"
                viewBox="0 0 50 50"
              >
                <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 aspect-square mr-6"
                height="1em"
                viewBox="0 0 512 512"
              >
                 <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/>
              </svg>
            )}
          </button>
        ) : (
          <button 
          onClick={signOutFunction}
          className="btn text-white bg-blue-500 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0">
            Sign out
        </button>
        )}
      </>
    );
  };
  
  export default SignOutButton;