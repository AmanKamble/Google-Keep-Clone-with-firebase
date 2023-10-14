import React from 'react';
import HighlightIcon from '@mui/icons-material/Highlight';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = ({user, logoutHandler}) => {
    return (
        <header>
            <h1>
                <HighlightIcon fontSize='1rem' />
                Keeper
            </h1>
            {
                user && (
                    <Button onClick={logoutHandler} variant="contained" style={{ display:"flex", gap:"2px", backgroundColor: '#ffe082', color: 'white', fontWeight: 500 }} > <LogoutIcon />Log Out</Button>
                )
            }
        </header>
    )
}

export default Header