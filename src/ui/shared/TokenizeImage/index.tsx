import React, { useEffect, useState } from 'react';

import { useTokenizeImageServiceService } from '~/adapters/app-service/image.service';

const TokenizeImage = ({ src, ...props }) => {
  const [image, setImage] = useState('');
  const tokenizeImageService = useTokenizeImageServiceService();

  useEffect(() => {
    tokenizeImageService.getTokenizeImage(src).then((res) => {
      setImage(res);
    });
  }, [src]);

  return <img src={image} alt="" />;
};
export default TokenizeImage;
