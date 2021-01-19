import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


export default function TopBar() {

    return (
        <AppBar position="static">
            <Toolbar className="center">
                <Typography variant="h6" >
                    Healthcare Providers Lab
                    </Typography>
            </Toolbar>
        </AppBar>
    )
}