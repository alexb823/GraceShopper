import React from 'react';
import { Link } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';

const SingleOrder = ({ order, address, products, history }) => {
  const itemsInOrder = order.lineItems.map(item => {
    const product = products.find(prod => prod.id === item.productId);
    item.product = product;
    return item;
  });
  let total = itemsInOrder.reduce((acc, item) => {
    const price = parseFloat(item.product.price);
    acc = acc + price * item.quantity;
    return acc;
  }, 0);
  return (
    <Paper key={order.id} style={{ marginTop: '1em', overflowX: 'auto' }}>
      <Typography variant="h5" style={{ margin: '1em' }}>
        <span>{new Date(order.updatedAt).toDateString()}</span>
        <span
          style={{
            float: 'right',
          }}
        >
          {order.status}
        </span>
      </Typography>
      <div style={{ margin: '1em' }}>
        <Typography variant="subtitle2">Shipping Address:</Typography>
        <Typography variant="overline" component="div">
          <div>{address.streetAddress}</div>
          <div>{address.streetAddress2}</div>
          <div style={{ marginTop: '-1em' }}>
            {address.city}, {address.state} {address.zipCode}
          </div>
        </Typography>
      </div>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Order Details</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item</TableCell>
                <TableCell>quantity</TableCell>
                <TableCell>price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.lineItems.map(lineItem => {
                const product = products.find(
                  prod => prod.id === lineItem.productId
                );
                total = total + product.price * lineItem.quantity;
                return (
                  <TableRow
                    key={lineItem.id}
                    hover={true}
                    onClick={() => history.push(`/products/${product.id}`)}
                  >
                    <TableCell>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={product.imageUrl}
                          style={{
                            height: '100px',
                            paddingRight: '1em',
                          }}
                        />
                        <div style={{ textDecoration: 'none' }}>
                          {product.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell style={{ textDecoration: 'none' }}>
                      {lineItem.quantity}
                    </TableCell>
                    <TableCell style={{ textDecoration: 'none' }}>
                      ${product.price}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={1} align="right">
                  Subtotal
                </TableCell>
                <TableCell>${total}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Tax (10%)</TableCell>
                <TableCell>${(total * 0.1).toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Total</TableCell>
                <TableCell>${(total * 1.1).toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  );
};

export default SingleOrder;
