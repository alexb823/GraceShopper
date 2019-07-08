import React, { useState } from 'react';

import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import LockOutlined from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import { loginUser, getLineItems } from '../reducers';

const Login = ({ loginUser, history, location, state }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = ({ target: { value } }) => setEmail(value);
  const handlePasswordChange = ({ target: { value } }) => setPassword(value);

  const handleOnSubmit = event => {
    event.preventDefault();
    loginUser(email, password)
      .then(() => {
        console.log(location);
        if (location.state && location.state.from) history.push('/checkout');
        else history.push('/products');
      })
      .catch(ex => setErrorMessage(ex.response.data));
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: '100vh' }}
    >
      <Grid item xs={12} sm={6}>
        <Paper style={{ height: '400px' }}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{
              height: '100%',
              paddingLeft: '20px',
              paddingRight: '20px',
            }}
          >
            <LockOutlined fontSize="large" style={{ marginBottom: '10px' }} />
            <Typography variant="h5" gutterBottom>
              Log In
            </Typography>

            {errorMessage && (
              <Typography variant="subtitle1" color="error">
                {errorMessage}
              </Typography>
            )}

            <form onSubmit={handleOnSubmit}>
              <FormControl fullWidth>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  margin="normal"
                  onChange={handleEmailChange}
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  margin="normal"
                  onChange={handlePasswordChange}
                />
              </FormControl>

              <FormControl fullWidth>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  style={{ marginTop: '30px' }}
                >
                  Log in
                </Button>
              </FormControl>
            </form>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (email, password) => dispatch(loginUser(email, password)),
  };
};

const mapStateToProps = state => ({
  state,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
