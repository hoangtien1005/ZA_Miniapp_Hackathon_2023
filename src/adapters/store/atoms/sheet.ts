import { atom } from 'recoil';
import { SheetProps } from 'zmp-ui/sheet';

import RECOIL_KEYS from '~/adapters/store/key';

export const defaultSheetState: SheetProps = {
  visible: false,
  mask: true,
  maskClosable: true,
  swipeToClose: false,
  snapPoints: [0],
  defaultSnapPoint: 1,
  children: null,
};

export const sheetState = atom<SheetProps>({
  key: RECOIL_KEYS.sheetState,
  default: defaultSheetState,
});
