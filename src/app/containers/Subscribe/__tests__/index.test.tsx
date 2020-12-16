import * as React from 'react';
import { Subscribe } from '..';
import { createRenderer } from 'react-test-renderer/shallow';

const shallowRenderer = createRenderer();

describe('<Subscribe />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<Subscribe />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
