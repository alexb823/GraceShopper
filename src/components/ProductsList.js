import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { manageLineItemQty } from '../reducers';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import Drawer from '@material-ui/core/Drawer';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';

import Rating from 'react-rating';

class ProductsList extends Component {
  constructor() {
    super()
    this.state = {rating: 0}
  }
  
  filter = (num) => {
    this.setState({rating: num})
  }
  
  render() {
    const {   
  manageLineItemQty,
  lineItems,
  cart,
  categories,
  match,
  } = this.props
  let products = this.props.products
  
  products = match.params.categoryId
    ? products.filter(
        product => product.categoryId === match.params.categoryId * 1
      )
    : products;

  products = match.params.search
    ? products.filter(product =>
        product.name.toLowerCase().includes(match.params.search.toLowerCase())
      )
    : products;
  return (
    <div style={{ marginTop: '80px' }}>
      <Drawer variant="permanent">
        <Typography
          variant="h5"
          color="textPrimary"
          style={{ marginTop: '3em' }}
        >
          Filters:
        </Typography>
        <Button 
        variant='contained' 
        onClick={()=> this.filter(0)}
        component={Link} 
        to='/products'
        color="primary"
        size="small"
        fullWidth={false}
        >
          clear
        </Button>
        <Typography
          variant="h6"
          color="textPrimary"
          style={{ marginTop: '1em' }}
        >
          Category
        </Typography>
        <List style={{ width: 240 }}>
          {categories.map(category => (
            <ListItem
              button={true}
              component={Link}
              to={`/category/${category.id}`}
              key={category.id}
              selected={match.params.categoryId * 1 === category.id}
            >
              {category.name}
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" color="textPrimary" style={{ marginTop: '1em' }}>
          Rating
        </Typography>
        <List>
            <ListItem
            button={true}
            onClick={() => this.filter(1)}
            selected={this.state.rating === 1}
            >
              <Star/> & Up
            </ListItem>
            <ListItem
            button={true}
            onClick={() => this.filter(2)}
            selected={this.state.rating === 2}
            >
              <Star/> <Star/> & Up
            </ListItem>
            <ListItem
            button={true}
            onClick={() => this.filter(3)}
            selected={this.state.rating === 3}
            >
              <Star/> <Star/> <Star/> & Up
            </ListItem>
            <ListItem
            button={true}
            onClick={() => this.filter(4)}
            selected={this.state.rating === 4}
            >
              <Star/> <Star/> <Star/> <Star/> & Up
            </ListItem>
        </List>
      </Drawer>
      <Grid
        container
        spacing={40}
        style={{ marginTop: '60px', paddingRight: '1vw', paddingLeft: 250 }}
      >
        {products.map(product => {
          const lineItem = lineItems.find(
            item => item.productId === product.id
          );
          if (product.available && product.rating >= this.state.rating) {
          return (
            <Grid item xs={12} sm={6} lg={4} xl={3} key={product.id}>
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.imageUrl}
                  style={{
                    width: 'auto',
                    height: 240,
                    margin: 'auto',
                    display: 'block',
                  }}
                />
              </Link>
              <Typography
                variant="headline"
                color="textPrimary"
                style={{ textAlign: 'justify' }}
              >
                ${product.price}
              </Typography>
              <Typography
                variant="subheading"
                color="textSecondary"
                style={{ textAlign: 'justify' }}
              >
                {product.name}
              </Typography>
              <Rating
                initialRating={product.rating}
                emptySymbol={<StarBorder style={{ color: '#ffc116' }} />}
                fullSymbol={<Star style={{ color: '#ffc116' }} />}
                readonly={true}
              />
              <Button
                variant={lineItem ? 'contained' : 'outlined'}
                color="primary"
                size="large"
                fullWidth={true}
                onClick={() =>
                  manageLineItemQty(product.id, 1, cart.id, lineItem)
                }
              >
                {lineItem ? 'Add More' : 'Add To Cart'}
              </Button>
            </Grid>
          )} else {
            return null;
          }
        })}
      </Grid>
    </div>
  );
  }
};

const mapStateToProps = state => ({
  products: state.products,
  cart: state.cart,
  lineItems: state.lineItems,
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  manageLineItemQty: (productId, quantity, cartId, lineItem) => {
    return dispatch(manageLineItemQty(productId, quantity, cartId, lineItem));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsList);
