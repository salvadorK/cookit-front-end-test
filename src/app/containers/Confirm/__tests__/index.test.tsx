import * as React from 'react';
import { Confirm } from '..';
import { createRenderer } from 'react-test-renderer/shallow';

import * as redux from 'react-redux';

const spy = jest.spyOn(redux, 'useSelector');
spy.mockReturnValue({ email: '', postalCode: '' });

const shallowRenderer = createRenderer();

describe('<Confirm />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<Confirm />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
