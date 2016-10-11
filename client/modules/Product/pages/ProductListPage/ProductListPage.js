import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ProductListItem from '../../components/ProductListItem/ProductListItem';
import { GROUPS } from '../ProductFormPage/ProductFormPage';

import styles from './ProductListPage.css';

// Import Selectors
import { getProducts } from '../../ProductReducer';
import { setSearchQuery, setGroupFilter } from '../../ProductActions';

class ProductListPage extends Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: '', groupFilters: [] }
  }

  onFilterChange = (e) => {
    let selectedGroups = this.state.groupFilters;
    var index = selectedGroups.indexOf(e.target.name);

    if (index > -1)
      selectedGroups.splice(index, 1);
    else
      selectedGroups.push(e.target.name);

    this.props.dispatch(setGroupFilter(selectedGroups));
  }

  componentDidMount() {
    this.setState({ products: this.props.products });
    this.setState({ groupFilters: this.props.groupFilters });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles['filter-panel']}>
          <input type="search" value={this.props.searchQuery} placeholder="Type name..."
                 onChange={e=>this.props.dispatch(setSearchQuery(e.target.value))}/>

          <div>
            {
              GROUPS.map(item => {
                var state = this.state.groupFilters.indexOf(item) > -1 ? "inactive" : "active";
                return <button className={styles[state]} key={item} name={item}
                               onClick={this.onFilterChange }>{item}</button>
              })
            }
          </div>

          <Link to="/products/new">New product</Link>
        </div>

        <div className={styles.products}>
          {
            this.props.products.map(product=> (
              <div key={product.cuid} className={styles.product}>
                <ProductListItem key={product.cuid} {...product}/>
              </div>
            ))
          }
        </div>

      </div>
    )
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    searchQuery: state.products.searchQuery,
    products: getProducts(state, state.products.searchQuery, state.products.groupFilters),
    groupFilters: state.products.groupFilters,
  };
}

export default connect(mapStateToProps)(ProductListPage);
