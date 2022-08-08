import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../store/products';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

function SearchBar(props, { placeholder }) {
  let [filteredData, setFilteredData] = useState([]);
  let [wordEntered, setWordEntered] = useState('');
  let [products, setProducts] = useState(props.allProducts);

  useEffect(() => {
    props.getProducts();
    setProducts(props.products);
  }, []);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = props.products.filter((product) => {
      return product.productName
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered('');
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <div className="input-group">
          <input
            type="text"
            placeholder={props.placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {filteredData.length === 0 ? (
              // <FontAwesomeIcon icon={faMagnifyingGlass} />
              <i className="fas fa-search"></i>
            ) : (
              <Button onClick={clearInput}>Clear</Button>
            )}
          </div>
        </div>

        {filteredData.length != 0 && (
          <div className="dataResults">
            {filteredData.slice(0, 10).map((product) => {
              return (
                <div key={product.id}>
                  <Link
                    className="dataItem"
                    to={`/products/${product.id}`}
                    target="blank"
                  >
                    <p>{product.productName}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    allProducts: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(SearchBar);
