import React from 'react';
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import { render, wait } from 'react-testing-library';

import Experiment from '../Experiment';
import Variant from '../Variant';

global.console.error = jest.fn();

const LoadingComponent = () => <div>Loading</div>;

describe('required props', () => {
  it('should render default when not passing the experiment name', async () => {
    const { getByText } = render(
      <Experiment loadingComponent={<LoadingComponent />}>
        <Variant default>Variant One</Variant>
      </Experiment>
    );

    expect(global.console.error).toHaveBeenLastCalledWith(
      'You must specify the experiment name.'
    );

    await wait(() => expect(getByText('Variant One')).toBeVisible());
  });

  it('should render default when window.dataLayer is not defined', async () => {
    global.dataLayer = undefined;

    const { getByText } = render(
      <Experiment name="abc" loadingComponent={<LoadingComponent />}>
        <Variant default>Variant One</Variant>
      </Experiment>
    );

    expect(global.console.error).toHaveBeenLastCalledWith(
      'window.dataLayer must not be undefined.'
    );

    await wait(() => expect(getByText('Variant One')).toBeVisible());
  });
});

describe('rendering variants', () => {
  it('should render loading cuz we have not mocked ga', async () => {
    global.dataLayer = {
      push: jest.fn()
    };

    const { getByText } = render(
      <Experiment name="abc" loadingComponent={<LoadingComponent />}>
        <Variant id="0">Variant One</Variant>
      </Experiment>
    );

    expect(global.dataLayer.push).toHaveBeenCalledTimes(1);

    await wait(() => expect(getByText('Loading')).toBeVisible());
  });
});
