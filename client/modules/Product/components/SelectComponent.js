/**
 * Created by slava on 26.09.16.
 */

import React, { Component, PropTypes } from 'react';

export class SelectComponent extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
          <div>
            <label>{this.props.label }</label>
            <select onChange={this.props.onChange} name={this.props.name}>
              {
                this.props.options.map(function(item) {
                  return <option key={item}>{item}</option>;
                })
              }
            </select>
          </div>
    )
  }
}


