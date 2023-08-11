import { BaseApiService } from '../baseApi.service';

import { setAccessTokenHeader } from '~/utils/service.util';

export type UploadKey =
  | 'personal_image_url'
  | 'ic_front_image_url'
  | 'ic_back_image_url'
  | 'household_url'
  | 'other_file_url';

class UploadService extends BaseApiService {
  uploadFile(formData, key: UploadKey): Promise<{ url: string }> {
    const path = `website/upload/${key}`;
    const exOptions = {};
    setAccessTokenHeader(exOptions);
    return fetch(this.generateUrl(path), {
      method: 'POST',
      body: formData,
      ...exOptions,
    })
      .then((response) => response.json())
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.error('Error upload: ', error);
        return {};
      });
  }
}
export const useUploadService = () => new UploadService();
