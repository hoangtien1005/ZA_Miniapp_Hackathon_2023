import { mockApi } from './mock.helper';
import { ResponseData } from '~/adapters/api.helper';
import { ConversationInfo } from '~/constants/interface';

export function mockConversation() {
  return {
    async getConversation(conversationId): Promise<ResponseData<ConversationInfo>> {
      return mockApi({
        seen: {
          '2': '2021-08-31T08:00:00.000Z',
        },
        theme: 'default',
        updatedAt: Date.now() + '',
        users: ['1', '2'],
      });
    },
  };
}
