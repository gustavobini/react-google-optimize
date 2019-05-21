import React from 'react';
import { GoogleOptimizeContext } from './GoogleOptimizeContext';

const gtag = function gtag() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
};

export default class Experiment extends React.Component {
  static defaultProps = {
    name: null,
    loadingComponent: null
  };

  state = {
    variant: typeof window === 'undefined' ? 'default' : null
  };

  componentDidMount() {
    try {
      if (!this.props.name) {
        throw new Error('You must specify the experiment name.');
      }

      gtag('event', 'optimize.callback', {
        callback: (value, name) =>
          console.log(`Experiment with ID '${name}' is on variant '${value}'`)
      });

      this.registerImplementationCallback();
    } catch (error) {
      console.error(error.message);
      this.setState({ variant: 'default' });
    }
  }

  componentWillUnmount() {
    gtag('event', 'optimize.callback', {
      name: this.props.name,
      callback: this.setVariant,
      remove: true
    });

    gtag('event', 'optimize.callback', {
      callback: this.setVariant,
      remove: true
    });
  }

  registerImplementationCallback = () => {
    gtag('event', 'optimize.callback', {
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
    let { variant } = this.state;

    if (variant === null && !this.props.loadingComponent) {
      variant = 'default';
    }

    return (
      <GoogleOptimizeContext.Provider value={variant}>
        {variant === null ? this.props.loadingComponent : this.props.children}
      </GoogleOptimizeContext.Provider>
    );
  }
}
