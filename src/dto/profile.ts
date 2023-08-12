import Profile from '~/domain/profile';
import { parseJwt } from '~/utils/convert.util';

export interface ProfileDTO {
  token: string;
  picture: any;
  name: string;
}

export const profileFromDTO = (dto: ProfileDTO): Profile => {
  const userId = parseJwt(dto.token)?.id;
  if (!dto || Object.keys(dto).length <= 0) return {} as Profile;
  return {
    uid: userId,
    name: dto.name,
    avatar: dto.picture.data.url,
    accessToken: dto.token,
  };
};
