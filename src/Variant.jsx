import React from 'react';

import { GoogleOptimizeContext } from './GoogleOptimizeContext';

export default class Variant extends React.Component {
  static contextType = GoogleOptimizeContext;

  componentDidMount() {
    try {
      if (!this.props.default && !this.props.id) {
        throw new Error(
          'You must specify this variant as default or set a variant id.'
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (this.context === 'default' && this.props.default) {
      return this.props.children;
    }

    return this.context === this.props.id ? this.props.children : null;
  }
}
