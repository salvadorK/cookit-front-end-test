/**
 * Asynchronously loads the component for Login
 */

import * as React from 'react';
import { lazyLoad } from 'utils/loadable';
import { LoadingIndicator } from 'app/components/LoadingIndicator';

export const Login = lazyLoad(
  () => import('./index'),
  module => module.Login,
  {
    fallback: <LoadingIndicator />,
  },
);
