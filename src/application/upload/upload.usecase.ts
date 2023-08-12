/* eslint-disable no-plusplus */

import { useUploadService } from '~/adapters/app-service/upload.service';

export function useUpload() {
  const uploadService = useUploadService();

  function b64ToFile(base64, filename) {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data.split(',')[1]);
    const byteArrays: any[] = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  function dataURLtoBlob(dataURL) {
    let i;
    const array: any[] = [];
    const binary = atob(dataURL.split(',')[1]);
    i = 0;
    const len = binary.length;
    while (i < len) {
      array.push(binary.charCodeAt(i) as any);
      i++;
    }
    return new Blob([new Uint8Array(array)], {
      type: 'image/jpeg',
    });
  }

  async function upload(dataUrl, key): Promise<any> {
    const form = new FormData();
    // TODO: generate unique file name
    const file = b64ToFile(dataUrl, `${Date.now()}.jpeg`);
    form.append('file', file);
    return uploadService.uploadFile(form, key);
  }

  return {
    upload,
  };
}
