import { useRecoilState } from 'recoil';
import { SheetProps } from 'zmp-ui/sheet';

import { defaultSheetState, sheetState } from '~/adapters/store/atoms/sheet';

interface ReturnType {
  visible: boolean;
  openSheet: (children) => void;
  closeSheet: () => void;
  toggleSheet: () => void;
}

function useGlobalSheet(): ReturnType {
  const [sheet, setSheet] = useRecoilState<SheetProps>(sheetState);

  const { visible = false } = sheet;

  function openSheet(sheetProps: SheetProps) {
    setSheet({
      ...sheet,
      ...sheetProps,
      visible: true,
    });
  }

  function closeSheet() {
    setSheet({
      ...defaultSheetState,
    });
  }

  function toggleSheet() {
    setSheet({
      ...sheet,
      visible: !visible,
    });
  }

  return {
    visible,
    openSheet,
    closeSheet,
    toggleSheet,
  };
}

export default useGlobalSheet;
