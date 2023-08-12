import React from 'react';
import '~/ui/assets/scss/layout.scss';

// eslint-disable-next-line react/prop-types
function LayoutApp({ children }) {
  return <main>{children}</main>;
}

export default LayoutApp;
