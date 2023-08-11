import { useSubmittedProfileService } from '~/adapters/app-service/profile.service';
import { SubmittedProfileServiceApp } from '~/application/submittedProfile/ports';

export interface BodyPostWithdrawProfileUsecase {
  lead_uuid: string | undefined;
  lead_type: number | undefined;
}

export async function WithdrawProfileUsecase(
  body: BodyPostWithdrawProfileUsecase
) {
  const submittedProfileService: SubmittedProfileServiceApp =
    useSubmittedProfileService();
  return submittedProfileService.withdrawProfile(body);
}
