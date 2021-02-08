import * as slice from '../subscribeReducer';

describe('theme slice', () => {
  let state: slice.SubscribeState;

  beforeEach(() => {
    state = slice.initialState.formData;
  });

  it('should return the initial state', () => {
    expect(slice.reducer(undefined, { type: '' })).toEqual(state);
  });

  it('should getData', () => {
    expect(
      slice.reducer(state, slice.sendData(slice.initialState.formData)),
    ).toEqual<slice.SubscribeState>(slice.initialState.formData);
  });
});
