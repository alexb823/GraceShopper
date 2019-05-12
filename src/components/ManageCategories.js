import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { deleteCategory } from '../reducers';

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

const ManageCategories = ({ classes, categories, products, deleteCategory }) => {
  const getProdInCtg = (id, products) => products.filter(p => p.categoryId === id);

  return (
    <Grid container direction="column" spacing={24} className={classes.root}>
      <Grid item>
        <Button
          type="button"
          variant="contained"
          color="primary"
          component={Link}
          to={'/admin/categories/edit'}
        >
          Add New Category
        </Button>
      </Grid>

      <Grid item>
        <Paper>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center"># Products</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map(category => {
                const prodBelongTo = getProdInCtg(category.id, products);
                return (
                  <TableRow key={category.id}>
                    <TableCell component="th" scope="row">
                      {category.name}
                    </TableCell>
                    <TableCell align="center">{category.id}</TableCell>
                    <TableCell align="center">{prodBelongTo.length}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="EditIcon"
                        component={Link}
                        to={`/admin/categories/edit/${category.id}`}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="Delete"
                        onClick={() => deleteCategory(category.id)}
                      >
                        <DeleteIcon />
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

const mapStateToProps = ({ categories, products }) => {
  return {
    categories,
    products,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteCategory: categoryId => dispatch(deleteCategory(categoryId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ManageCategories));
