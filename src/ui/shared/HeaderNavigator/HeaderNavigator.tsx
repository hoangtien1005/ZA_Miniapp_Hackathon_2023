/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { useLocation } from 'react-router-dom';

import ScrollNav from '../ScrollNav';

const renderItem = (bottomItem, szIcon) => {
  return (
    <>
      <i className={`icon block m-auto ${szIcon}`}>
        <img className="w-auto" src={bottomItem.imageSrc} />
      </i>
      <span className="block mt-4">{bottomItem.text}</span>
    </>
  );
};

const getClassActive = (url, pathname) => {
  return url === pathname ? 'active' : '';
};

const NavItem = (item) => {
  const activeClassName = getClassActive(item.url, item.pathname);
  return (
    <div
      className={`scroll_item ${activeClassName}`}
      onClick={() => item.onClickItem(item)}
      key={item.url}
    >
      {renderItem(item, item.szIcon)}
    </div>
  );
};

function HeaderNavigator({ items, name = 'nav', handleChangeTab = (_) => {} }) {
  const location = useLocation();

  const szIcon = name === 'nav' ? 'sz-14' : 'sz-24';

  return (
    <ScrollNav
      items={items}
      customClassNames={['sticky', `nav_${name}`]}
      countShow={5}
      onClickItem={handleChangeTab}
      ItemComponent={NavItem}
      ItemComponentProps={{
        pathname: location.pathname,
        szIcon,
      }}
    />
  );
}

export default HeaderNavigator;
