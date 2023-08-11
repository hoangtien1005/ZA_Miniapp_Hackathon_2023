/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';

import { Spinner } from 'zmp-ui';

import { LoadingImg } from '~/ui/assets/images';

type LoadingProps = {};

const Loading = React.forwardRef((props: LoadingProps) => {
  return (
    <>
      <div className="modal_loading_page">
        <Spinner visible />
        {/* <div className="inner">
          <div className="icon">
            {' '}
            <img className="w-full" src={LoadingImg} alt="" />
          </div>
        </div> */}
      </div>
    </>
  );
});

Loading.displayName = 'Loading';

export default Loading;
