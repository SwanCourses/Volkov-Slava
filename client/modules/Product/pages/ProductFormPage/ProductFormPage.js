/**
 * Created by slava on 25.09.16.
 */

import React, { Component } from 'react';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { addProductRequest } from '../../ProductActions';

import styles from './ProductFormPage.css';

var SIZES = ["XS", "S", "M", "L", "XL"];

class ProductFormPage extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  addProduct = () => {
    let form = new FormData();
    form.append('product[name]', this.state.name);
    form.append('product[code]', this.state.code);
    form.append('product[price]', this.state.price);
    form.append('product[description]', this.state.description);
    form.append('product[size]', this.state.size)

    // console.log("name: " + this.state.name);
    // console.log("size: " + this.state.size);

    for(let i = 0; i < this.refs.photo.files.length; i++)
      form.append('product[photo]', this.refs.photo.files[i], this.refs.photo.files[i].name);

    this.props.dispatch(addProductRequest(form));
  };

  render(){
    return (
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewProduct"/></h2>

          <input placeholder={this.props.intl.messages.productName} value={this.state.name} onChange={this.onChange}
                 className={styles['form-field']} name="name"/>

          <input placeholder={this.props.intl.messages.productCode} value={this.state.code} onChange={this.onChange}
                 className={styles['form-field']} name="code"/>

          <input placeholder={this.props.intl.messages.productPrice} value={this.state.price} onChange={this.onChange}
                 className={styles['form-field']} name="price"
                 type="number"/>

          <textarea placeholder={this.props.intl.messages.productDescription} value={this.state.description}
                    onChange={this.onChange}
                    className={styles['form-field']}
                    name="description"/>

          <select onChange={this.onChange} name="size">
            {
              SIZES.map(function(item) {
                return <option key={item}>{item}</option>;
              })
            }
          </select>

          <div className={styles.photos}>
            <input ref="photo" type="file" multiple onChange={this.onFileLoad}/>
          </div>

          <a className={styles['post-submit-button']} href="#" onClick={this.addProduct}><FormattedMessage id="submit"/></a>

        </div>
      </div>
    )
  }
}

ProductFormPage.propTypes = {
  intl: intlShape.isRequired
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(injectIntl(ProductFormPage));

