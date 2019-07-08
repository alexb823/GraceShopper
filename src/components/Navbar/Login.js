import React, { Component } from 'react';

import { Button } from '@material-ui/core';

class Login extends Component {
  render() {
    return (
      <a href="#/login" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: '1rem 0 1rem 1rem' }}
        >
          Sign in
        </Button>
      </a>
    );
  }
}

export default Login;
