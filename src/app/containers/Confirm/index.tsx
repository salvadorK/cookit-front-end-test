import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { NavBar } from 'app/containers/NavBar';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

import { Button } from 'app/components/Button';
import { RootState } from 'types';
import { initialState, SubscribeState } from '../../../store/subscribeReducer';
import { useNavigation } from 'app/controllers/navigation';

export function Confirm() {
  const { t } = useTranslation();
  const stateData = useSelector((state: RootState) => state.subscribe);
  useEffect(() => {
    if (stateData) {
      setFormData(stateData);
    }
  }, [stateData]);

  const [formData, setFormData] = useState<SubscribeState>(
    initialState.formData,
  );

  //All postal codes are capitalize with a space inbetween
  const postalCode = formData.postalCode.toLocaleUpperCase();
  const postalCodeSpace = postalCode.replace(/.{3}$/, ' $&');

  const { navigateTo } = useNavigation();

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigateTo('');
  };

  const handleBack = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigateTo('subscribe');
  };

  return (
    <>
      <Helmet>
        <title></title>
        <meta name="description" content="" />
      </Helmet>
      <NavBar />
      <Wrapper>
        <h1>{t(translations.confirm.title)}</h1>
        <h2>{formData.email}</h2>
        <h2>{postalCodeSpace}</h2>
        <Wrapper>
          <div>
            <ConfirmButton type="submit" onClick={handleBack}>
              {t(translations.confirm.back)}
            </ConfirmButton>
            <ConfirmButton type="submit" onClick={handleSubmit}>
              {t(translations.confirm.OK)}
            </ConfirmButton>
          </div>
        </Wrapper>
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

const ConfirmButton = styled(Button)`
  margin: 4em;
`;
