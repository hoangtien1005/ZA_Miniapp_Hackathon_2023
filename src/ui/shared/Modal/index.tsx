import React from 'react';

// import { InsuranceBenefitsImage } from '~/ui/assets/images';
import { useDelayUnmount } from '~/ui/hooks';

export default function ModalCustom({ visible, ttl, close, clName, children }) {
  const shouldLoadingRender = useDelayUnmount(visible, 200);
  const mountedStyle = {
    opacity: 1,
    transition: 'opacity 200ms ease-in',
    display: 'block',
  };
  const unmountedStyle = {
    opacity: 0,
    transition: 'opacity 200ms ease-in',
    display: 'block',
  };
  return (
    <>
      {shouldLoadingRender && (
        <div
          className={`modal ${clName}`}
          style={visible ? mountedStyle : unmountedStyle}
        >
          <div className="modal_content">
            <div className="modal_head">
              <div className="ttl">{ttl}</div>
              <span className="modal_close" onClick={close} />
            </div>
            <div className="modal_body">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
