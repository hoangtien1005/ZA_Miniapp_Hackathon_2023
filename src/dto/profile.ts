import Profile from '~/domain/profile';

export interface ProfileDTO {
  access_token: string;
  avatar: string;
  name: string;
  uid: string;
}

export const profileFromDTO = (dto: ProfileDTO): Profile => {
  if (!dto || Object.keys(dto).length <= 0) return {} as Profile;
  return {
    name: dto.name,
    avatar: dto.avatar,
    accessToken: dto.access_token,
    uid: dto.uid,
  };
};
