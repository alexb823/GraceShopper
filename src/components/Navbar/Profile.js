import React from 'react';
import { connect } from 'react-redux';

import { Grid, Avatar, Fab, Button, Menu, Typography } from '@material-ui/core';

import { logOutUser, emptyLineItem, gotCart } from '../../reducers';

const Profile = ({ user, logOutUser, emptyLineItem, emptyCart }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ cursor: 'pointer' }}
    >
      <Fab
        style={{
          width: '40px',
          height: '40px',
          margin: '1rem',
        }}
      >
        <Avatar
          alt={user.firstName}
          src={user.imageUrl}
          style={{ width: '100%', height: '100%' }}
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          style={{ transform: 'translate(-1.5rem, 3.5rem)' }}
        >
          <div style={{ display: 'flex', margin: '2rem', outline: 'none' }}>
            <Avatar
              alt={user.firstName}
              src={user.imageUrl}
              style={{ width: '100px', height: '100px' }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '2rem',
              }}
            >
              <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                {`${user.firstName} ${user.lastName}`}
              </Typography>
              <Typography variant="caption">{user.email}</Typography>
              <Button
                variant="contained"
                color="secondary"
                style={{ margin: '1rem 0' }}
                onClick={() => {
                  logOutUser();
                  emptyLineItem();
                  emptyCart();
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </Menu>
      </Fab>
    </Grid>
  );
};

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = dispatch => {
  return {
    logOutUser: () => dispatch(logOutUser()),
    emptyLineItem: () => dispatch(emptyLineItem()),
    emptyCart: () => dispatch(gotCart({})),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
