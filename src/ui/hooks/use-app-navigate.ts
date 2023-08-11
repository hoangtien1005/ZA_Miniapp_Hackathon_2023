import { useNavigate } from 'zmp-ui';

function useAppNavigate() {
  const navigate = useNavigate();
  const defaultOptions = {
    animate: true,
    // replace: true,
  };
  return (to, options?) => navigate(to, { ...defaultOptions, ...options });
}

function useAppNavigateBack() {
  const navigate = useNavigate();
  const BACK_PARAM = -1;
  return () => {
    navigate(BACK_PARAM);
  };
}

export { useAppNavigate, useAppNavigateBack };
