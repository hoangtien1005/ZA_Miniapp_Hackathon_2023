/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { Page } from 'zmp-ui';

import { NewsContainer } from './containers';

import withHeaderState from '~/ui/hocs/with-header-state';

function NewsPage() {
  return (
    <Page>
      <NewsContainer />
    </Page>
  );
}

export default withHeaderState(NewsPage);
