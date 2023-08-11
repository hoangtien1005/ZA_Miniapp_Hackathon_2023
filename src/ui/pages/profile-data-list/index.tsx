/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { Page } from 'zmp-ui';

import { ProfileDataListContainer } from './containers';

import withHeaderState from '~/ui/hocs/with-header-state';

function ProfileDataListPage() {
  return (
    <Page>
      <ProfileDataListContainer />
    </Page>
  );
}

export default withHeaderState(ProfileDataListPage);
