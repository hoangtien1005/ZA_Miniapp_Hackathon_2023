/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { Page } from 'zmp-ui';

import { ProfileDataInfoContainer } from './containers';

import withHeaderState from '~/ui/hocs/with-header-state';

function ProfileDataInfoPage() {
  return (
    <Page>
      <ProfileDataInfoContainer />
    </Page>
  );
}

export default withHeaderState(ProfileDataInfoPage);
