import React from 'react';

import { useGetConfigFeaturesByTypeOptimizedQuery } from '~/application/configFeature/useGetConfigFeaturesByTypeOptimizedQuery.usecase';
import { MAX_ITEMS_SHORTCUT_HOME } from '~/constants';
import { TYPE_FEATURE_CONFIG } from '~/constants/enums';
import { BannerHomePlaceholderImg } from '~/ui/assets/images';
import BannerItem from '~/ui/shared/BannerItem';
import EntryItem from '~/ui/shared/EntryItem';
import ScrollNav from '~/ui/shared/ScrollNav';
import { sortTwoItemByIndex } from '~/utils/common.util';

interface EntriesHomeZoneProps {
  headerBanner: any;
}

const MAX_COUNTS_SHOW_SCREEN = 6;
export const EntriesHomeZone: React.FC<EntriesHomeZoneProps> = ({
  headerBanner,
}) => {
  const { data: displayShortcutItems } =
    useGetConfigFeaturesByTypeOptimizedQuery({
      iconType: TYPE_FEATURE_CONFIG.ICON_ZONE_SHORTCUT,
      sortFn: sortTwoItemByIndex,
      max: MAX_ITEMS_SHORTCUT_HOME,
    });
  return (
    <section className="sec_product">
      <BannerItem
        classNameBanner="banner"
        {...headerBanner}
      />
      <div className="product_main">
        <ScrollNav
          ItemComponent={EntryItem}
          items={displayShortcutItems}
          countShow={MAX_COUNTS_SHOW_SCREEN}
        />
      </div>
      <div className="product_main scroll_fixed">
        <ScrollNav
          ItemComponent={EntryItem}
          items={displayShortcutItems}
          countShow={MAX_COUNTS_SHOW_SCREEN}
        />
      </div>
    </section>
  );
};
