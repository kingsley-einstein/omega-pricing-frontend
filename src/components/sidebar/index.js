import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItemIcon, ListItem, ListItemText, Divider } from '@material-ui/core';
import { Forward, Home, Storage, Add, ExitToApp } from '@material-ui/icons';

const Sidebar = ({ open, closeHandler, isLoggedIn, logoutHandler }) => (
  <Drawer open={open} anchor="left" onClose={closeHandler}>
    <List>
      {
        !isLoggedIn &&
        <div>
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
        </div>
      }
      {
        isLoggedIn &&
        <div>
          <ListItem onClick={closeHandler} button component={props => <Link to="/customer" {...props} />}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Main" />
          </ListItem>
          <ListItem onClick={closeHandler} button component={props => <Link to="/register" {...props} />}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Enregister" />
          </ListItem>
          <ListItem onClick={closeHandler} button component={props => <Link to="/stores" {...props} />}>
            <ListItemIcon>
              <Storage />
            </ListItemIcon>
            <ListItemText primary="Stores" />
          </ListItem>
          <Divider />
          <ListItem onClick={logoutHandler} button>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </div>
      }
    </List>
  </Drawer>
);

export default Sidebar;
