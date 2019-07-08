import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';

class Search extends Component {
  constructor() {
    super();
    this.state = { search: '' };
  }

  handleChange = ({ target }) => {
    this.setState({ search: target.value });
  };

  handleSubmit = evt => {
    if (evt.charCode === 13 && this.state.search !== '') {
      const path =
        this.props.location.pathname.slice(1, 9) === 'category'
          ? this.props.location.pathname.slice(0, 11)
          : '/products';
      this.props.history.push(`${path}/search/${this.state.search}`);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon style={{ color: 'grey' }} />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ onKeyPress: this.handleSubmit }}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default withRouter(Search);
