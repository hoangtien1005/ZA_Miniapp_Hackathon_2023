/* eslint-disable react/prop-types */
import React from 'react';

import classNames from 'classnames';

import { ArticleCategory } from '~/domain/articleCategory';
import { ConfigFeature } from '~/domain/configFeature';

type ScrollNavProps = {
  items: ArticleCategory[] | ConfigFeature[] | undefined;
  customClassNames?: string[];
  onClickItem?: any;
  ItemComponent: React.ComponentType;
  ItemComponentProps?: any;
  countShow: number;
};

export default function ScrollNav(props: ScrollNavProps) {
  const {
    items = [],
    customClassNames = [],
    onClickItem,
    ItemComponent,
    ItemComponentProps = {},
    countShow = 4,
  } = props;

  return (
    <div
      className={classNames(
        `module_scroll ${
          items?.length > countShow ? 'module_scroll_mask' : ''
        }`,
        ...customClassNames
      )}
    >
      <div className="scroll_inner">
        <div className="wrap flex">
          {items?.length > 0 &&
            items.map((item, idx) => {
              return (
                <ItemComponent
                  key={item.id || idx}
                  {...item}
                  onClickItem={onClickItem}
                  {...ItemComponentProps}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
