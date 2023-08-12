import { ParamsGetDetailSubmittedProfile } from './useGetDetailSubmittedProfilesByQuery.usecase';
import { BodyPostWithdrawProfileUsecase } from './withdrawProfileUsecase';

import { ResponseData } from '~/adapters/api.helper';
import {
  DetailSubmittedProfileDTO,
  SubmittedProfileDTO,
} from '~/dto/submittedProfile';

export interface SubmittedProfileServiceApp {
  getSubmittedInfoProfiles: (params) => Promise<SubmittedProfileDTO[]>;
  getDetailSubmittedInfoProfiles: (
    body: ParamsGetDetailSubmittedProfile
  ) => Promise<DetailSubmittedProfileDTO>;
  withdrawProfile: (
    body: BodyPostWithdrawProfileUsecase
  ) => Promise<ResponseData<any>>;
}
