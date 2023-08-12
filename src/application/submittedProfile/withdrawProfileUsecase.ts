import { useSubmittedProfileService } from '~/adapters/app-service/profile.service';
import { SubmittedProfileServiceApp } from '~/application/submittedProfile/ports';

export interface BodyPostWithdrawProfileUsecase {
  start_time: Date;
  end_time: Date;
  store_id: number;
}

export async function getBooking(
  body: BodyPostWithdrawProfileUsecase
) {
  const submittedProfileService =
    useSubmittedProfileService();
  return submittedProfileService.getBooking(body);
}
