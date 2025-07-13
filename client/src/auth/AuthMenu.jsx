import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { TicketPlus, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * This is your auth UI adapter.
 * Swap Clerk with another provider later in this single file.
 */
const AuthMenu = ({children}) => {
    const navigate = useNavigate();
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal">
          {children}
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton>
            <UserButton.MenuItems>
                <UserButton.Action label='My Bookings' labelIcon={<TicketPlus width={15} />} onClick={()=> {navigate('/my-bookings')}}/>
            </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
    </div>
  );
};

export default AuthMenu;
