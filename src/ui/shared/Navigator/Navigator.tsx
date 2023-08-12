/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { useLocation } from 'react-router-dom';

import { BOTTOM_NAV_ITEMS } from '~/ui/hocs/with-layout-wrapper';
import { useAppNavigate } from '~/ui/hooks';

const renderItem = (bottomItem, szIcon) => {
  return (
    <>
      <i className={`icon block m-auto ${szIcon}`}>
        <img className="w-auto" src={bottomItem.imageSrc} />
        
        {/* <bottomItem.imageSrc /> */}
      </i>
      <span className="block mt-4">{bottomItem.text}</span>
    </>
  );
};

function Navigator({ items = BOTTOM_NAV_ITEMS.HOME, name = 'nav' }) {
  const location = useLocation();

  const navigate = useAppNavigate();
  const handleChangeTab = (item) => {
    navigate(item.url);
  };

  const getClassActive = (urls) => {
    return urls.includes(location.pathname) ? 'active' : '';
  };
  const szIcon = name === 'nav' ? 'sz-20' : 'sz-24';
  return (
    <nav className={`nav_footer flex flex-midle flex-space nav_footer_${name}`}>
      {items?.length > 0 &&
        items.map((item) => {
          const additionalActiveUrls = item.additionalActiveUrls || [];
          const activeClassName = getClassActive([
            item.url,
            ...additionalActiveUrls,
          ]);
          return (
            <a
              className={`block text-center nav_item ${activeClassName}`}
              onClick={() => handleChangeTab(item)}
              key={item.url}
            >
              {renderItem(item, szIcon)}
            </a>
          );
        })}
    </nav>
  );
}

export default Navigator;
