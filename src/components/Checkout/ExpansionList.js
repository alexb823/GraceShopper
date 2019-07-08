import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/HomeOutlined';

import { withStyles } from '@material-ui/core/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddressForm from './AddressForm';
import PromoCode from './PromoCode';
import AddAddress from './AddAddress';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class ExpansionList extends Component {
  state = {
    isAddressFormOpen: false,
    addressIdInEditForm: '',
  };

  openEditForm = addressId => {
    this.setState({ isAddressFormOpen: true, addressIdInEditForm: addressId });
  };

  openCreateForm = () => {
    this.setState({ isAddressFormOpen: true, addressIdInEditForm: '' });
  };

  componentDidMount() {
    this.setState({ isAddressFormOpen: !this.props.userAddresses.length });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userAddresses !== this.props.userAddresses) {
      this.setState({ isAddressFormOpen: !this.props.userAddresses.length });
    }
  }

  render() {
    const { classes, userAddresses } = this.props;
    const { isAddressFormOpen } = this.state;
    const { openEditForm, openCreateForm } = this;
    return (
      <div style={{ width: '100%' }}>
        <ExpansionPanel
          defaultExpanded
          style={{
            borderRadius: '0',
            boxShadow: 'none',
            border: '1px solid lightGrey',
          }}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            style={{ dislay: 'flex', padding: '0' }}
          >
            <HomeIcon style={{ color: 'grey', padding: '0 1rem' }} />
            <Typography className={classes.heading}>
              Delivery address
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ width: '100%', padding: '0' }}>
            {isAddressFormOpen && (
              <AddressForm
                style={{ width: '100%' }}
                savedAddress={userAddresses.find(
                  ({ id }) => id == this.state.addressIdInEditForm
                )}
              />
            )}
            {!isAddressFormOpen && (
              <AddAddress
                openEditForm={openEditForm}
                openCreateForm={openCreateForm}
                style={{ width: '100%' }}
              />
            )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <PromoCode />
      </div>
    );
  }
}

const mapStateToProps = ({ addresses: { selectedAddress, userAddresses } }) => {
  return {
    selectedAddress,
    userAddresses,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(ExpansionList));
