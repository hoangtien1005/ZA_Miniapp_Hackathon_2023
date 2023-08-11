import { useQuery } from '@tanstack/react-query';

import { useSubmittedProfileService } from '~/adapters/app-service/profile.service';
import { SubmittedProfileServiceApp } from '~/application/submittedProfile/ports';
import { SubmittedProfile } from '~/domain/submittedProfile';
import { submittedProfileFromDTO } from '~/dto/submittedProfile';

export function useGetSubmittedProfilesByQuery(params = {}) {
  const submittedProfileService: SubmittedProfileServiceApp =
    useSubmittedProfileService();
  return useQuery({
    queryKey: ['submittedProfiles', params],
    queryFn: () => submittedProfileService.getSubmittedInfoProfiles(params),
    select: (data) => {
      const mappingData = data.map((rs) => submittedProfileFromDTO(rs));

      const filterByYear = mappingData
        .reduce((rs: any, cr: SubmittedProfile, index) => {
          const getYear = new Date(cr.createdAt).getFullYear();
          // eslint-disable-next-line no-prototype-builtins
          if (!rs.hasOwnProperty(getYear)) {
            rs[getYear] = {
              year: getYear,
              list: [],
            };
          }
          rs[getYear].list.push(cr);
          return rs;
        }, [])
        .sort((a, b) => {
          return b.year - a.year;
        });

      return filterByYear;
    },
    staleTime: Infinity,
  });
}
