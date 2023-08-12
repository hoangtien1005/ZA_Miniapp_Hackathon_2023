import { mockApi } from './mock.helper';
import { ResponseData } from '~/adapters/api.helper';
import { MessageItem } from '~/constants/interface';

export type MessageData = {
  messages: MessageItem[];
  total: number;
  conversationId: string;
};

export function mockMessage() {
  return {
    async getMessages(conversationId): Promise<ResponseData<MessageData>> {
      return mockApi({
        messages: [
          {
            sender: '1',
            content: 'Hello',
            createdAt: Date.now() - 5 - 1000 * 60 * 60 * 24 * 2 + '',
            type: 'text',
          },
          {
            sender: '2',
            content: 'Hi',
            createdAt: Date.now() - 4 - 1000 * 60 * 60 * 24 * 2 + '',
            type: 'text',
          },
          {
            sender: '2',
            content: 'Hi',
            createdAt: Date.now() - 3 - 1000 * 60 * 60 * 24 * 2 + '',
            type: 'text',
          },
          {
            sender: '1',
            content:
              'https://media3.giphy.com/media/B6RwBircNEBMF3Az3E/giphy.gif?cid=c328453bbubicp8ta37rm071t65rnjd38sbqi6pwcwka36m7&ep=v1_gifs_trending&rid=giphy.gif&ct=g',
            type: 'image',
            createdAt: 1691775703014 + '',
          },
          {
            sender: '1',
            content:
              'https://cdn.jsdelivr.net/gh/naptestdev/zalo-stickers/data/images/ami-bung-bu/43517.png',
            type: 'sticker',
            createdAt: 1691775797256 + '',
          },
          {
            sender: '2',
            content:
              'https://reactjsexample.com/a-real-time-chat-app-with-mern-and-socketio/',
            type: 'text',
            createdAt: 1691775797256 + '',
          },
        ],
        total: 5,
        conversationId,
      });
    },
  };
}
