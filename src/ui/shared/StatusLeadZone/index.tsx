import React, { useState } from 'react';

import SliderProduct from '../SliderProduct';

import { PRODUCT_TYPE } from '~/constants/enums';
import { EmptyImage } from '~/ui/assets/images';

interface StatusLeadZoneProps {}

export const tabItems = [
  {
    text: 'Thẻ tín dụng',
    productType: PRODUCT_TYPE.CARD,
    emptyText: 'Bạn chưa đăng ký Thẻ nào',
  },
  {
    text: 'Gói vay',
    productType: PRODUCT_TYPE.LOAN,
    emptyText: 'Bạn chưa có Gói vay nào',
  },
];
export const StatusLeadZone: React.FC<StatusLeadZoneProps> = ({}) => {
  const [activeTab, setActiveTab] = useState(tabItems[0]);

  const viewTab = (tabItem) => {
    setActiveTab(tabItem);
  };

  const currentTabProcessedLead: any = undefined;
  const isFetched = true;

  return (
    <div className="module_box">
      <div className="module_box_heading">
        <div className="nav_tab w-full row space text-center color_text_700">
          {tabItems.map((item) => (
            <div
              key={item.productType}
              onClick={() => viewTab(item)}
              className={`col-6 nav_tab_item ${
                activeTab.productType === item.productType ? 'active' : ''
              }`}
            >
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      {isFetched && (
        <div className="module_box_boding">
          {currentTabProcessedLead && currentTabProcessedLead.length > 0 ? (
            <SliderProduct
              hasStatus
              products={currentTabProcessedLead}
              customSliderConfig={{
                dots:
                  currentTabProcessedLead?.length > 1 &&
                  currentTabProcessedLead?.length < 4,
              }}
            />
          ) : (
            <div className="product_slider has_status">
              <div>
                <div className="card_item zaui-box-justify-center">
                  <div className="card_thumb">
                    <img src={EmptyImage} alt="empty" />
                  </div>
                  <div className="card_des w-auto">
                    <div className="text fz-12 color_text_400">
                      {activeTab.emptyText}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
