/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { Page } from 'zmp-ui';

import { HomepageContainer } from './containers';

import withHeaderState from '~/ui/hocs/with-header-state';

function HomePage() {
  return (
    <Page>
      <HomepageContainer />
    </Page>
  );
}

export default withHeaderState(HomePage);
