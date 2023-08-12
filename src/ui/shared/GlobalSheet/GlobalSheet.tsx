import React, { useRef } from 'react';

import { useRecoilState } from 'recoil';
import { Sheet } from 'zmp-ui';
import { SheetProps, SheetRef } from 'zmp-ui/sheet';

import { sheetState } from '~/adapters/store/atoms/sheet';

const GlobalSheet: React.FC<SheetProps> = () => {
  const sheetRef = useRef<SheetRef>(null);

  const [sheet, setSheet] = useRecoilState<SheetProps>(sheetState);
  const { children, ...restProps } = sheet;

  return (
    <>
      <Sheet ref={sheetRef} {...restProps} className="sheet-search">
        {children}
      </Sheet>
    </>
  );
};

export default GlobalSheet;
