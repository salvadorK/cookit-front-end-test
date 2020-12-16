import * as React from 'react';
import { Login } from '..';
import { createRenderer } from 'react-test-renderer/shallow';

const shallowRenderer = createRenderer();

describe('<Login />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<Login />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
