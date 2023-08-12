import { useState } from 'react';

interface ReturnType {
  visible: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

function useSheet(initialVisible = false): ReturnType {
  const [visible, setVisible] = useState(initialVisible);

  function toggle() {
    setVisible(!visible);
  }

  function open() {
    setVisible(true);
  }

  function close() {
    setVisible(false);
  }

  return {
    visible,
    open,
    close,
    toggle,
  };
}

export default useSheet;
