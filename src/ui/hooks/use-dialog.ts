import { useCallback, useState } from 'react';

type actions = {
  handleClose: () => void;
  handleOpen: () => void;
  handleToggle: () => void;
};
const useDialog = (initialState?: boolean): [boolean, actions] => {
  const [visible, setVisible] = useState(initialState || false);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);
  const handleOpen = useCallback(() => {
    setVisible(true);
  }, []);
  const handleToggle = useCallback(() => {
    setVisible((state) => !state);
  }, []);

  return [visible, { handleClose, handleOpen, handleToggle }];
};

export default useDialog;
