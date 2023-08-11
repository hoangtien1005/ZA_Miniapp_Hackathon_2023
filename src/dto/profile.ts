import Profile from '~/domain/profile';

export interface ProfileDTO {
  token: string;
  picture: any;
  name: string;
}

export const profileFromDTO = (dto: ProfileDTO): Profile => {
  if (!dto || Object.keys(dto).length <= 0) return {} as Profile;
  return {
    name: dto.name,
    avatar: dto.picture.data.url,
    accessToken: dto.token,
  };
};
