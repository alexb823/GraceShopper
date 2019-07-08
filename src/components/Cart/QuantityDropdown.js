import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class QuantityDropdown extends Component {
  state = {
    quantity: 1,
  };

  onSelectChange = evt => {
    this.setState({ quantity: evt.target.value });
  };

  // To do:
  // 1. submit this to redux store
  // 2. Submit handler

  render() {
    const { classes } = this.props;
    return (
      <form
        className={classes.root}
        autoComplete="off"
        style={{ marginLeft: '2rem' }}
      >
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="quantity-simple">Quantity</InputLabel>
          <Select
            name={'product1'}
            onChange={this.onSelectChange}
            value={this.state.quantity}
            style={{ textAlign: 'center' }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

export default withStyles(styles)(QuantityDropdown);
