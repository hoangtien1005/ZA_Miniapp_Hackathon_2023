import { useState } from 'react';

interface ReturnType {
  show: boolean;
  toggle: () => void;
}

function useModal(initialShow = false): ReturnType {
  const [show, setShow] = useState(initialShow);

  function toggle() {
    setShow(!show);
  }

  return {
    show,
    toggle,
  };
}

export default useModal;
