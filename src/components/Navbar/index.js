import React, { Component } from 'react';
import { connect } from 'react-redux';

// Material-UI Core
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  IconButton,
  Toolbar,
  SwipeableDrawer,
} from '@material-ui/core';

// Material-UI Icons
import MenuIcon from '@material-ui/icons/Menu';

// React Components
import Logo from './Logo';
import Search from './Search';
import Sidelist from './Sidelist';
import Cart from './Cart';
import Login from './Login';
import Profile from './Profile';

import styles from './styles';

class Navbar extends Component {
  state = {
    drawerOpened: false,
  };

  toggleDrawer = open => {
    this.setState({ drawerOpened: open });
  };

  render() {
    const { classes, user } = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          style={{
            boxShadow: 'none',
            background: 'white',
            borderBottom: 'lightGrey 1px solid',
            zIndex: 1400,
          }}
        >
          <SwipeableDrawer
            open={this.state.drawerOpened}
            onClose={() => {
              this.toggleDrawer(false);
            }}
            onOpen={() => {
              this.toggleDrawer(true);
            }}
          >
            <div
              tabIndex={0}
              role="button"
              onKeyDown={() => {
                this.toggleDrawer(true);
              }}
            >
              <Sidelist classes={classes} />
            </div>
          </SwipeableDrawer>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              style={{ color: 'grey' }}
              aria-label="Open drawer"
              onClick={() => {
                this.toggleDrawer(!this.state.drawerOpened);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Logo classes={classes} />
            <Search classes={classes} />
            <Cart classes={classes} />
            <div className={classes.sectionDesktop}>
              {user.imageUrl ? (
                <Profile user={user} />
              ) : (
                <Login classes={classes} />
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = ({ user, lineItems }) => ({
  user,
  lineItems,
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
