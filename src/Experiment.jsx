import React from 'react';

import { GoogleOptimizeContext } from './GoogleOptimizeContext';

export default class Experiment extends React.Component {
  static defaultProps = {
    name: null,
    loadingComponent: null
  };

  state = {
    variant: null
  };

  gtag = null;

  componentDidMount() {
    try {
      if (!this.props.name) {
        throw new Error('You must specify the experiment name.');
      }

      if (!window.dataLayer) {
        throw new Error('window.dataLayer must not be undefined.');
      }

      this.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };

      this.registerImplementationCallback();
    } catch (error) {
      console.error(error.message);
      this.setState({ variant: 'default' });
    }
  }

  componentWillUnmount() {
    this.gtag &&
      this.gtag('event', 'optimize.callback', {
        name: this.props.name,
        callback: this.setVariant,
        remove: true
      });
  }

  registerImplementationCallback = () => {
    this.gtag &&
      this.gtag('event', 'optimize.callback', {
        name: this.props.name,
        callback: this.setVariant
      });
  };

  setVariant = value => {
    this.setState({
      variant: value === undefined || value === null ? 'default' : value
    });
  };

  render() {
    return (
      <GoogleOptimizeContext.Provider value={this.state.variant}>
        {this.state.variant === null
          ? this.props.loadingComponent
          : this.props.children}
      </GoogleOptimizeContext.Provider>
    );
  }
}
