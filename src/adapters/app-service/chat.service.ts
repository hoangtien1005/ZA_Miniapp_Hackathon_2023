import { TRACKING_URL } from '~/configs/app';
import { BaseApiService } from '../baseApi.service';
import { bookingFromDTO } from '~/dto/booking';
import { ConversationInfo } from '~/constants/interface';

export interface ParamsGetMessages {
  conversationId: string;
}

class ChatService extends BaseApiService {
  getConversation(conversationId: string): Promise<ConversationInfo> {
    return Promise.resolve({
      seen: {},
      theme: 'default',
      updatedAt: Date.now() + '',
      users: conversationId.split(':'),
    });
  }

  getAllMessages(params?: ParamsGetMessages): Promise<any[]> {
    const path = 'booking/messages';
    return super
      .get(this.generateUrl(path, 'http://118.102.2.130/zahackathondb/api'), params)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (err) {
          console.log('Error get messages: ', err);
        }
        return [];
      });
  }
}
export const useChatService = () => new ChatService();
