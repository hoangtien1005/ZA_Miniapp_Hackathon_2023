import { ProfileDTO } from '~/dto/profile';
import { mockApi } from './mock.helper';
import { ResponseData } from '~/adapters/api.helper';
import User from '~/domain/user';

export function mockUser() {
  return {
    async getUsers(): Promise<ResponseData<User[]>> {
      return mockApi([
        {
          uid: '1',
          name: 'Nguyen Van A',
          avatar: 'https://picsum.photos/200',
        },
        {
          uid: '2',
          name: 'Nguyen Van B',
          avatar: 'https://picsum.photos/200',
        },
        {
          uid: '3',
          name: 'Nguyen Van C',
          avatar: 'https://picsum.photos/200',
        },
        {
          uid: '4',
          name: 'Nguyen Van D',
          avatar: 'https://picsum.photos/200',
        },
      ]);
    },
  };
}
