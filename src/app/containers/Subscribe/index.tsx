import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components/macro';
import { NavBar } from 'app/containers/NavBar';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useNavigation } from 'app/controllers/navigation';

import { FormLabel } from 'app/components/FormLabel';
import { Input } from 'app/components/Input';
import { Button } from 'app/components/Button';

import { isValidEmail, isValidPostalCode } from '../../../utils/validation';
import { RootState } from 'types';
import { reducer, sendData, subscribeSliceKey } from 'store/subscribeReducer';
import { useInjectReducer } from 'redux-injectors';
import { initialState, SubscribeState } from '../../../store/subscribeReducer';

interface FocusState {
  email: boolean;
  postalCode: boolean;
}

interface API {
  is_deliverable: boolean;
  has_error: boolean;
  error_message: string;
}

export function Subscribe() {
  const { t } = useTranslation();

  // Reducer for state manipulation for the app
  const stateData = useSelector((state: RootState) => state.subscribe);
  useEffect(() => {
    if (stateData) {
      setFormData(stateData);
    }
  }, [stateData]);
  useInjectReducer({
    key: subscribeSliceKey,
    reducer: reducer,
  });
  const dispatch = useDispatch();

  //State changes
  const [formData, setFormData] = useState<SubscribeState>(
    initialState.formData,
  );

  const [focus, setFocus] = useState<FocusState>(initialState.focus);

  const [postalCodeValid, setPostalCodeValid] = useState<API>(initialState.API);

  //Input Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocus({ ...focus, [e.target.name]: true });
  };

  //Axios for ziptest
  useEffect(() => {
    const url =
      "http://us-central1-interview-zip-code.cloudfunctions.net/zipTest/'";
    axios
      .get(url, {
        params: { zip: formData.postalCode.toLocaleUpperCase() },
      })
      .then(response => setPostalCodeValid(response.data))
      .catch(error => console.log(error));
  }, [formData.postalCode]);

  //Error Messages render
  const errorEmailMessage = isValidEmail(formData.email)
    ? true
    : t(translations.subscribe.form.errorEmail);
  const errPCMessageFormat = isValidPostalCode(
    formData.postalCode.toLocaleUpperCase(),
  )
    ? true
    : t(translations.subscribe.form.errorPCFormat);
  const errPCMessageValid = postalCodeValid.is_deliverable
    ? true
    : t(translations.subscribe.form.errorPCvalid);

  //Disable button if conditions are not met.
  const toDisable =
    isValidEmail(formData.email) &&
    isValidPostalCode(formData.postalCode.toLocaleUpperCase()) &&
    postalCodeValid
      ? true
      : false;

  const { navigateTo } = useNavigation();
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(sendData(formData));
    navigateTo('confirm');
  };

  return (
    <>
      <Helmet>
        <title></title>
        <meta name="description" content="" />
      </Helmet>
      <NavBar />
      <Wrapper>
        <h1>{t(translations.subscribe.title)}</h1>
        <Form>
          <FormLabel htmlFor="email">
            {t(translations.subscribe.form.email)}
          </FormLabel>
          <Input
            type="text"
            name="email"
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {focus.email ? (
            <ErrorMessage>{errorEmailMessage}</ErrorMessage>
          ) : null}
          <FormLabel htmlFor="postalCode">
            {t(translations.subscribe.form.postalCode)}
          </FormLabel>
          <Input
            type="text"
            name="postalCode"
            onChange={handleChange}
            onFocus={handleFocus}
          />
          {focus.postalCode ? (
            <div>
              <ErrorMessage>{errPCMessageFormat}</ErrorMessage>
              <ErrorMessage>{errPCMessageValid}</ErrorMessage>
            </div>
          ) : null}
          <Button disabled={!toDisable} type="submit" onClick={handleSubmit}>
            {t(translations.subscribe.form.submit)}
          </Button>
        </Form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const Form = styled.div`
  height: calc(100vh - ${StyleConstants.NAV_BAR_HEIGHT});
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`;

const ErrorMessage = styled.h6`
  color: red;
  font-size: 0.85em;
  display: block;
  margin 0 0 10px;
`;
