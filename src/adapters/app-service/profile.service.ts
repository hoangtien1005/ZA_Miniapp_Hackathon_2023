import { BaseApiService } from '../baseApi.service';

import { CONSENT_PROFILE_LEAD_TYPE } from '~/constants/enums';

class SubmittedProfileService extends BaseApiService {
  getSubmittedInfoProfiles(params) {
    const path = 'meal_history';
    return super
      .get(this.generateUrl(path), params)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get meal history: ', err);
        }
        return [];
      });
  }

  getDetailSubmittedInfoProfiles(body: {
    lead_id: string;
    lead_type: CONSENT_PROFILE_LEAD_TYPE;
  }) {
    const path = 'consent/profiles';
    return super
      .post(this.generateUrl(path), {}, body)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get detail processed leads: ', err);
        }
        return [];
      });
  }

  getBooking(body: any) {
    const path = 'booking/book';
    return super
      .post(this.generateUrl(path, 'https://zah-4.123c.vn/api'), {}, body)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        if (err) {
          console.log('Error book: ', err);
        }
        return [];
      });
  }
}

export const useSubmittedProfileService = () => new SubmittedProfileService();
