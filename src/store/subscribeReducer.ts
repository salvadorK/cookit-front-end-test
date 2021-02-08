import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  formData: {
    email: '',
    postalCode: '',
  },
  focus: {
    email: false,
    postalCode: false,
  },
  API: {
    is_deliverable: false,
    has_error: false,
    error_message: '',
  },
};

export type SubscribeState = typeof initialState.formData;

const subscribeSlice = createSlice({
  name: 'subscribe',
  initialState: initialState.formData,
  reducers: {
    sendData(state, action) {
      return (state = action.payload);
    },
  },
});

export const { sendData } = subscribeSlice.actions;
export const reducer = subscribeSlice.reducer;
export const subscribeSliceKey = subscribeSlice.name;
