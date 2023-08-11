/* eslint-disable no-useless-concat */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
import api from 'zmp-sdk';

import { buildURLWithParam } from './common.util';

import { BASE_URL_PDF } from '~/configs/app';

export const closeApp = async () => {
  await api.closeApp({
    fail: (error) => {
      // xử lý khi gọi api thất bại
      console.log(error);
    },
  });
};

export const handleOpenWebview = async (url) => {
  return new Promise((resolve, reject) => {
    api.openWebview({
      url,
      success: (res) => {
        resolve(res);
      },
      fail: (error) => {
        reject(error);
        console.log('webview error', error);
      },
    });
  });
};

export const handleOpenOutApp = async (url) => {
  return new Promise((resolve, reject) => {
    api.openOutApp({
      url,
      success: (res) => {
        resolve(res);
      },
      fail: (error) => {
        reject(error);
        console.log('Open outapp error', error);
      },
    });
  });
};

export const handleOpenMiniApp = async ({ appId, path, params }) => {
  return new Promise((resolve, reject) => {
    api.openMiniApp({
      appId,
      path,
      params,
      success: () => {
        resolve('');
      },
      fail: (error) => {
        reject(error);
        console.log('Open miniapp error', error);
      },
    });
  });
};

export const handleOpenViewPdf = async (fileUrl) => {
  const viewPdfUrl = buildURLWithParam(BASE_URL_PDF, {
    file: fileUrl,
  });
  await handleOpenWebview(viewPdfUrl);
};
