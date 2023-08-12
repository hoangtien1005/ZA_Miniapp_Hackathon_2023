/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { Page } from 'zmp-ui';

import { ProfileContainer } from './containers';

import withHeaderState from '~/ui/hocs/with-header-state';

function ProfilePage() {
  return (
    <Page>
      <ProfileContainer />
    </Page>
  );
}

export default withHeaderState(ProfilePage);
