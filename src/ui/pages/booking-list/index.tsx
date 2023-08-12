/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { Page } from 'zmp-ui';

import { BookingListContainer } from './containers';

import withHeaderState from '~/ui/hocs/with-header-state';

function BookingListPage() {
  return (
    <Page>
      <BookingListContainer />
    </Page>
  );
}

export default withHeaderState(BookingListPage);
