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
        name: this.props.name,
        callback: this.setVariant
      });
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
  }

  setVariant = value => {
    console.log(
      `Experiment with ID '${this.props.name}' is on variant '${value}'`
    );

    this.setState({
      variant: value === undefined || value === null ? 'default' : value
    });
  };

  matchVariants(value) {
    if (value === 'default') {
      return React.Children.map(
        this.props.children,
        child => child.props.default
      ).filter(x => x).length;
    }

    return React.Children.map(
      this.props.children,
      child => child.props.id
    ).filter(id => id === value).length;
  }

  render() {
    let { variant } = this.state;
    if (variant === null && !this.props.loadingComponent) {
      variant = 'default';
    }

    const matchingVariants = this.matchVariants(variant);

    if (matchingVariants === 0) {
      throw new Error(
        `Variant '${variant}' has not been registered for experiment '${
          this.props.name
        }'`
      );
    }

    if (matchingVariants > 1) {
      throw new Error(
        `Experiment '${
          this.props.name
        }' cannot support more than 1 variant registed with id '${variant}' (${matchingVariants} found)`
      );
    }

    return (
      <GoogleOptimizeContext.Provider value={variant}>
        {variant === null ? this.props.loadingComponent : this.props.children}
      </GoogleOptimizeContext.Provider>
    );
  }
}
