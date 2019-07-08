import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  withStyles,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Avatar,
} from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';

import { deleteUser, getAllUsers } from '../../reducers';

const styles = theme => ({
  root: {
    width: 'auto',
    marginTop: theme.spacing.unit * 12,
    marginBottom: theme.spacing.unit * 10,
    marginLeft: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 5,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const ManageUsers = ({ classes, users, getAllUsers, deleteUser }) => {
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Grid container direction="column" spacing={24} className={classes.root}>
      <Grid item>
        <Button
          type="button"
          variant="contained"
          color="primary"
          component={Link}
          to={'/admin/users/edit'}
        >
          Add New User
        </Button>
      </Grid>

      <Grid item>
        <Paper>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => {
                return (
                  <TableRow key={user.id}>
                    <TableCell align="right">
                      <Avatar src={user.imageUrl} />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.fullName}
                    </TableCell>
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>

                    <TableCell align="center">
                      {user.admin ? 'Admin' : 'User'}
                    </TableCell>

                    <TableCell align="center">
                      <IconButton
                        aria-label="EditIcon"
                        component={Link}
                        to={`/admin/users/edit/${user.id}`}
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="Delete"
                        onClick={() => deleteUser(user.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: userId => dispatch(deleteUser(userId)),
    getAllUsers: () => dispatch(getAllUsers()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ManageUsers));
