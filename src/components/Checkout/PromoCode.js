import React from 'react';

import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
  TextField,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PromoCodeIcon from '@material-ui/icons/LocalOfferOutlined';

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

const PromoCode = ({ classes }) => {
  const [values, setValues] = React.useState({
    promoCode: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <ExpansionPanel
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
        <PromoCodeIcon style={{ color: 'grey', padding: '0 1rem' }} />
        <Typography className={classes.heading}>Promo code</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{ width: '100%' }}>
        <form
          style={{
            display: 'flex',
            flewWrap: 'wrap',
            width: '100%',
            flexDirection: 'column',
          }}
        >
          <TextField
            label="Add promo code"
            style={{ margin: '0 1rem' }}
            value={values.promoCode}
            required
            onChange={handleChange('promoCode')}
            margin="normal"
            style={{ width: '90%' }}
          />
          <div
            style={{
              width: '90%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '1rem', width: '100px' }}
            >
              Apply
            </Button>
          </div>
        </form>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(PromoCode);
