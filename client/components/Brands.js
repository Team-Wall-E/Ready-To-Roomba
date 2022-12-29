import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/products';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import SearchBar from './SearchBar';

export class Brands extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: 'All',
      numOfVisibleProducts: 8,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  handleChange(evt) {
    this.setState({ filter: evt.target.value });
  }

  handleScroll() {
    const isAtBottom =
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop <=
      document.documentElement.clientHeight;

    if (isAtBottom) {
      this.setState({
        numOfVisibleProducts: this.state.numOfVisibleProducts + 8,
      });
    }
  }

  render() {
    const { products } = this.props;
    const { filter, numOfVisibleProducts } = this.state;

    const filteredProducts = products.filter((product) => {
      switch (filter) {
        case 'iRobot':
          return product.brand === 'iRobot';
        case 'Tesvor':
          return product.brand === 'Tesvor';
        case 'Samsung':
          return product.brand === 'Samsung';
        case 'Eufy':
          return product.brand === 'Eufy';
        case 'Roborock':
          return product.brand === 'Roborock';
        case 'iLife':
          return product.brand === 'iLife';
        default:
          return product;
      }
    });

    return (
      <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between p-5 mb-5'>
        <SearchBar
          placeholder={'Enter product name...'}
          products={products}
          className='d-flex align-items-center mb-2 mb-md-0'
        />

        <div className='text-end'>
          <label>Find By Brand:</label>
          <select
            id='brand'
            value={filter}
            onChange={this.handleChange}
            className='custom-select'
          >
            <option value='All'>All</option>
            <option value='iRobot'>iRobot</option>
            <option value='Tesvor'>Tesvor</option>
            <option value='Samsung'>Samsung</option>
            <option value='Eufy'>Eufy</option>
            <option value='Roborock'>Roborock</option>
            <option value='iLife'>iLife</option>
          </select>
        </div>

        <div className='mt-5'>
          <Row xs={1} md={4} className='g-4'>
            {filteredProducts.slice(0, numOfVisibleProducts).map((product) => {
              return (
                <Col key={product.id}>
                  <Card>
                    <Card.Img
                      variant='top'
                      className='card-img-top'
                      src={product.imageUrl}
                      alt='image of product'
                    />
                    <Card.Body>
                      <Card.Title>
                        <Link to={`/products/${product.id}`}>
                          {product.productName}
                        </Link>
                      </Card.Title>
                      <Card.Text>{product.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => ({
  products,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Brands);
