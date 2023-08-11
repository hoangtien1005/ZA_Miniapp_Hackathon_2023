/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { Page } from 'zmp-ui';

import { DiscoverContainer } from './containers';

import withHeaderState from '~/ui/hocs/with-header-state';

function DiscoverPage() {
  return (
    <Page>
      <DiscoverContainer />
    </Page>
  );
}

export default withHeaderState(DiscoverPage);
