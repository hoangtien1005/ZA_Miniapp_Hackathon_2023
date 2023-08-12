/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { Page } from 'zmp-ui';

import { BookingContainer } from './containers';

import withHeaderState from '~/ui/hocs/with-header-state';

function BookingPage() {
  return (
    <Page>
      <BookingContainer />
    </Page>
  );
}

export default withHeaderState(BookingPage);
