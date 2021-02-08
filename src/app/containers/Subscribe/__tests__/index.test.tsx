import * as React from 'react';
import { Subscribe } from '..';
import { createRenderer } from 'react-test-renderer/shallow';

import * as redux from 'react-redux';
import * as reducer from 'redux-injectors';

const spy = jest.spyOn(redux, 'useSelector');
const spy2 = jest.spyOn(reducer, 'useInjectReducer');
const spy3 = jest.spyOn(redux, 'useDispatch');
const mockDispatchFn = jest.fn();
spy.mockReturnValue({ email: '', postalCode: '' });
spy2.mockReturnValue();
spy3.mockReturnValue(mockDispatchFn);

const shallowRenderer = createRenderer();

describe('<Subscribe />', () => {
  it('should render and match the snapshot', () => {
    shallowRenderer.render(<Subscribe />);
    const renderedOutput = shallowRenderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
});
