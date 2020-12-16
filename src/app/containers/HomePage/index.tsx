import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from '../NavBar';
import { PageWrapper } from 'app/components/PageWrapper';
import { P } from './components/P';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <P>test</P>
      </PageWrapper>
    </>
  );
}
