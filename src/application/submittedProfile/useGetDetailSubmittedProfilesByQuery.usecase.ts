import { useQuery } from '@tanstack/react-query';

import { useLocationService } from '~/adapters/app-service/location.service';
import { useSubmittedProfileService } from '~/adapters/app-service/profile.service';
import { SubmittedProfileServiceApp } from '~/application/submittedProfile/ports';
import {
  genderList,
  jobSacombankList,
  jobVIBList,
  maritalStatusList,
} from '~/constants';
import { PARTNER_ID } from '~/constants/enums';
import { DetailSubmittedProfile } from '~/domain/submittedProfile';
import { detailSubmittedProfileFromDTO } from '~/dto/submittedProfile';
import { generateTextLocation } from '~/utils/format.util';

export interface ParamsGetDetailSubmittedProfile {
  lead_id: string | undefined;
  lead_type: number | undefined;
}

export type DisplayDetailSubmittedProfileInfo = DetailSubmittedProfile &
  Partial<{
    displayJob: string;
    displayName: string;
    displayGender: string;
    displayMaritalStatus: string;
    displayLocation: string;
    displayDob: string;
    displayIssueDate: string;
  }>;

const MAPPING_PARTNER_ID_TO_JOB_LIST = {
  [PARTNER_ID.VIB]: jobVIBList,
  [PARTNER_ID.Shinhan]: jobSacombankList,
  [PARTNER_ID.FECredit]: jobVIBList,
  [PARTNER_ID.DICO]: jobVIBList,
  [PARTNER_ID.PVI]: jobVIBList,
  [PARTNER_ID.UOB]: jobVIBList,
};

function getNameById(id: any, list) {
  id = +id;
  const found = list?.find(
    (item: any) => item.value === id || item.id === id || item.code === id
  );
  return (found && (found.name || found.text || found.label)) || '';
}

function usePreprocessDetailSubmittedProfileInfo(
  data: DetailSubmittedProfile | undefined,
  locations: [any, Array<any> | undefined, number | undefined]
): any {
  if (!data) return {};
  const newData: DisplayDetailSubmittedProfileInfo = { ...data };

  if (newData.gender) {
    newData.displayGender = genderList.find(
      (item) => item.value === newData.gender
    )?.name;
  }

  if (newData.maritalStatus) {
    newData.displayMaritalStatus = maritalStatusList.find(
      (item) => item.value === newData.maritalStatus
    )?.name;
  }

  if (newData.jobId && newData.partnerId) {
    const mappingJobStatus = MAPPING_PARTNER_ID_TO_JOB_LIST[newData.partnerId];
    if (mappingJobStatus) {
      newData.displayJob = mappingJobStatus.find(
        (item) => item.value === newData.jobId
      )?.name;
    }
  }

  if (newData.dob) {
    const date = new Date(newData.dob);
    newData.displayDob = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  }

  if (newData.issueDate) {
    const date = new Date(newData.issueDate);
    newData.displayIssueDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  }
  if (
    newData.currentAddressWard &&
    newData.currentAddressDistrict &&
    newData.currentAddressProvince &&
    newData.currentAddressStreet
  ) {
    newData.displayLocation = generateTextLocation([
      newData.currentAddressStreet,
      getNameById(Number(newData.currentAddressWard), locations[2]),
      getNameById(Number(newData.currentAddressDistrict), locations[1]),
      getNameById(Number(newData.currentAddressProvince), locations[0]),
    ]);
  }

  return newData;
}

export function useGetDetailSubmittedProfileByQuery(
  body = {} as ParamsGetDetailSubmittedProfile
) {
  const detailSubmittedProfileService: SubmittedProfileServiceApp =
    useSubmittedProfileService();

  const locationService = useLocationService();
  const profileQuery = useQuery({
    queryKey: ['detailSubmittedProfile', body],
    queryFn: async () => {
      const data =
        await detailSubmittedProfileService.getDetailSubmittedInfoProfiles(
          body
        );
      const mappingData = detailSubmittedProfileFromDTO(data);
      return mappingData;
    },
    select: (data) => {
      return data;
    },
    staleTime: Infinity,
  });

  const locationQuery = useQuery({
    queryKey: ['locations'],
    queryFn: async () => {
      const data = await locationService.getLocations();
      return data;
    },
    select: (data) => {
      return data;
    },
    enabled: !!profileQuery.data?.currentAddressProvince,
  });

  const districtQuery = useQuery({
    queryKey: ['district', profileQuery.data?.currentAddressProvince],
    queryFn: async () => {
      const data = await locationService.getDistrict(
        profileQuery.data?.currentAddressProvince
      );
      return data;
    },
    select: (data) => {
      return data;
    },
    enabled: !!profileQuery.data?.currentAddressDistrict,
  });

  const wardQuery = useQuery({
    queryKey: ['ward', profileQuery.data?.currentAddressDistrict],
    queryFn: async () => {
      const data = await locationService.getWard(
        profileQuery.data?.currentAddressDistrict
      );
      return data;
    },
    select: (data) => {
      return data;
    },
    enabled: !!profileQuery.data?.currentAddressWard,
  });

  // usePreprocessDetailSubmittedProfileInfo(profileQuery.data, [
  //   locationQuery.data,
  //   districtQuery.data,
  //   wardQuery.data,
  // ]);

  return {
    data: usePreprocessDetailSubmittedProfileInfo(profileQuery.data, [
      locationQuery.data,
      districtQuery.data,
      wardQuery.data,
    ]) as DetailSubmittedProfile,
  };
}
