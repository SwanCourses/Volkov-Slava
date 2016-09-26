/**
 * Created by slava on 26.09.16.
 */

import React, {Component, PropTypes} from 'react';
import styles from './ColorsComponent.css';

export class ColorsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    var items = [];
    var props = this.props;

    Object.keys(this.props.colors).forEach(function (key) {
      items.push(<div key={'container_' + key}>
        <input type="text" name={key} key={key} value={props.colors[key]}
               onChange={props.changeColor} placeholder={props.placeholderColorLabel} />
        <button onClick={props.removeColor} name={key} key={'delete_' + key}>{props.removeColorLabel}</button>
      </div>);
    })

    return (
      <div className={styles.colors}>
        <a className={styles["colors-button"]} onClick={this.props.addColor}>{this.props.addColorLabel}</a>
        <div>
          {items}
        </div>
      </div>
    )
  }
}

ColorsComponent.propTypes = {
  colors: PropTypes.object.isRequired,
  addColor: PropTypes.func.isRequired,
  removeColor: PropTypes.func.isRequired,
  changeColor: PropTypes.func.isRequired,
  addColorLabel: PropTypes.string.isRequired,
  removeColorLabel: PropTypes.string.isRequired,
  placeholderColorLabel: PropTypes.string.isRequired
}
