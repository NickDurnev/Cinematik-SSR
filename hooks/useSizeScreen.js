import { useState, useEffect } from 'react';
import { device } from '../services/deviceSizes';

const useSizeScreen = () => {
  const [isSizeScreen, setIsSizeScreen] = useState(null);

  useEffect(() => {
    if (window.matchMedia(device.mobileM).matches) {
      setIsSizeScreen('phone');
    }
    if (window.matchMedia(device.tablet).matches) {
      setIsSizeScreen('tablet');
    }
    if (window.matchMedia(device.laptopL).matches) {
      setIsSizeScreen('laptop');
    }
  }, []);

  return isSizeScreen;
};

export default useSizeScreen;
