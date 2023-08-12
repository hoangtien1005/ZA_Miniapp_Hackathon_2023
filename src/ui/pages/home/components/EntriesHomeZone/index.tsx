import React, { useEffect, useState } from 'react';

import { useGetConfigFeaturesByTypeOptimizedQuery } from '~/application/configFeature/useGetConfigFeaturesByTypeOptimizedQuery.usecase';
import { useGetAllCategories } from '~/application/consent/useGetConfigConsent';
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
  const [displayShortcutItems,setDisplayShortcutItems ] = useState();
  useEffect(() => {
    useGetAllCategories().then(res => setDisplayShortcutItems(res.filter(item => item.category_icon)));

  }, [])
  return (
    <section className="sec_product">
      <h1 className='heading_home'>Bạn sẽ ăn ở đâu ?</h1>
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
