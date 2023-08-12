/* eslint-disable react/prop-types */
import React from 'react';

import classNames from 'classnames';

import InsuranceEntryItem from '../InsuranceEntryItem';

import { PartnerLogo } from '~/domain/partnerLogo';

type InsuranceEntryListProps = {
  insurances: PartnerLogo[] | undefined;
  customClassNames?: string[];
  onClickItem?: any;
};

export default function InsuranceEntryList(props: InsuranceEntryListProps) {
  const { insurances = [], customClassNames = [], onClickItem } = props;

  return (
    <div
      className={classNames(
        'insu_list flex flex-wrap gap-16 mt-16 color_blue_400',
        ...customClassNames
      )}
    >
      {insurances?.length > 0 &&
        insurances.map((insurance) => {
          return (
            <InsuranceEntryItem
              key={insurance.id}
              {...insurance}
              onClickItem={onClickItem}
            />
          );
        })}
    </div>
  );
}
