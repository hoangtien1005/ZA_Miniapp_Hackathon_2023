/* eslint-disable react/prop-types */
import React from 'react';

import classNames from 'classnames';

import LogoItem from '../LogoItem';

import { PartnerLogo } from '~/domain/partnerLogo';

type LogoListProps = {
  logos: PartnerLogo[] | undefined;
  customClassNames?: string[];
  onClickItem?: any;
};

export default function LogoList(props: LogoListProps) {
  const { logos = [], customClassNames = [], onClickItem } = props;

  return (
    <div
      className={classNames(
        'product_list flex flex-wrap gap-20 mt-16',
        ...customClassNames
      )}
    >
      {logos?.length > 0 &&
        logos.map((product) => {
          return (
            <LogoItem
              key={product.id}
              {...product}
              altText="product"
              onClickItem={onClickItem}
            />
          );
        })}
    </div>
  );
}
