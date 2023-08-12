/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { Page } from 'zmp-ui';

import { IntroductionContainer } from './containers';

import withHeaderState from '~/ui/hocs/with-header-state';

function NewsPage() {
  return (
    <Page>
      <IntroductionContainer />
    </Page>
  );
}

export default withHeaderState(NewsPage);
