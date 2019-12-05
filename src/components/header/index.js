import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

// const styles = makeStyles(theme => ({
//   iconBtn: {
//     marginRight: theme.spacing(2)
//   }
// }));

// const style = styles();

// Header component
export default ({ handler }) => (
  <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" onClick={handler}>
        <Menu />
      </IconButton>
      <Typography variant="h6">
        Omega Services
      </Typography>
    </Toolbar>
  </AppBar>
);
