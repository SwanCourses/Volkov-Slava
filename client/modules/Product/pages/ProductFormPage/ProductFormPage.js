/**
 * Created by slava on 25.09.16.
 */

import React, { Component } from 'react';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { addProductRequest } from '../../ProductActions';
import { SelectComponent } from '../../components/SelectComponent';
import { ColorsComponent } from '../../components/ColorsComponent';

import styles from './ProductFormPage.css';

const SIZES = ["XS", "S", "M", "L", "XL"];
export const GROUPS = ["Male", "Female", "Kid", "Pet"];
const COLORS_CAP = 5;
const COLOR_PREFIX = "color_";

class ProductFormPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      colors: { },
      freeColors: [...Array(COLORS_CAP).keys()],
      groups: []
    };
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  onGroupsChange = (e) => {
    let selectedGroups = [];
    for (let i = 0; i < e.target.length; i++)
      if (e.target[i].selected)
        selectedGroups.push(e.target[i].value);

    this.setState({groups: selectedGroups});
  };

  addColor = () => {

    if (this.state.freeColors.length === 0)
      return;

    var colorsObject = this.state.colors;

    colorsObject[COLOR_PREFIX + this.state.freeColors[0]] = "";
    this.state.freeColors.splice(0, 1);

    this.setState({'colors': colorsObject});

  };

  removeColor = (e) => {
    var freeColorNumber = parseInt(e.target.name.substring(COLOR_PREFIX.length));
    var colorsObject = this.state.colors;
    var freeColorsArray = this.state.freeColors;

    freeColorsArray.push(freeColorNumber);

    delete colorsObject[e.target.name];

    this.setState({
      'colors': colorsObject,
      'freeColors': freeColorsArray
    })

  };

  changeColor = (e) => {

    let colorsObject = this.state.colors;

    colorsObject[e.target.name] = e.target.value;

    this.setState({'colors': colorsObject});
  };

  addProduct = () => {
    let form = new FormData();
    form.append('product[name]', this.state.name);
    form.append('product[code]', this.state.code);
    form.append('product[price]', this.state.price);
    form.append('product[description]', this.state.description);
    form.append('product[size]', this.state.size);
    form.append('product[colors]', JSON.stringify(this.state.colors));

    for(let i = 0; i < this.state.groups.length; i++)
      form.append('product[groups]', this.state.groups[i]);

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

          <SelectComponent
            name="size"
            label={this.props.intl.messages.productSize }
            options={ SIZES }
            onChange = { this.onChange }
            multiple={false}
          />


          <SelectComponent
            name="groups"
            label="Groups"
            options={ GROUPS }
            onChange={this.onGroupsChange}
            multiple={true}
          />

          <ColorsComponent
            addColor={ this.addColor }
            changeColor = { this.changeColor }
            removeColor = { this.removeColor }
            colors = { this.state.colors }
            addColorLabel= { this.props.intl.messages.addColor }
            removeColorLabel={ this.props.intl.messages.removeColor }
            placeholderColorLabel={ this.props.intl.messages.productColorPlaceholder }
          />

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

