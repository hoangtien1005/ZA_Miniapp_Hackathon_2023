/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { Page } from 'zmp-ui';

import { ChatContainer } from './containers';

import withHeaderState from '~/ui/hocs/with-header-state';

function ChatPage() {
  return (
    <Page>
      <ChatContainer />
    </Page>
  );
}

export default withHeaderState(ChatPage);
