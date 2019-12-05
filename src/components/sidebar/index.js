import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItemIcon, ListItem, ListItemText } from '@material-ui/core';
import { Forward, Home } from '@material-ui/icons';

const Sidebar = ({ open, closeHandler }) => (
  <Drawer open={open} anchor="left" onClose={closeHandler}>
    <List>
      <ListItem onClick={closeHandler} button component={props => <Link to="/login" {...props} />}>
        <ListItemIcon>
          <Forward />
        </ListItemIcon>
        <ListItemText primary="Connecter" />
      </ListItem>
      <ListItem onClick={closeHandler} button component={props => <Link to="/" {...props} />}>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </List>
  </Drawer>
);

export default Sidebar;
