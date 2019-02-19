## react-google-optimize

Helpers for Google Optimize A/B testing.

## Install

```
npm i react-google-optimize
```

## Usage

**You must have Google Optimize added to your application.**

```
import React from 'react';
import { Experiment, Variant } from 'react-google-optimize';

export default class App extends React.Component {
  render() {
    return(
      <Experiment name="about-page">
        <Variant default id="0">
          Default variant
        </Variant>
        <Variant id="1">
          Variant 1
        </Variant>
        <Variant id="2">
          Variant 2
        </Variant>
      </Experiment>
    )
  }
}
```

## Experiment component

Props:

- **name:** the experiment name configured in Google Optimize.
- **loadingComponent:** a component to be rendered while the variants are being requested from Google Optimize.

## Variant component

Props:

- **default:** sets this variant as the default. This value is used in case Google Optimize is not loaded or something fails.
- **id:** the variant id configured in Google Optimize.
