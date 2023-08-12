import io from 'socket.io-client';
let socket;

export const useSocketService = () => {
  const connect = (token) => {
    socket = io.connect('https://zah-4.123c.vn');
  };

  const onMessage = (messageType, cb) => {
    if (!socket) return true;
    socket.on(messageType, (msg) => {
      console.log(`onMessage ${messageType}`);
      return cb(msg);
    });
  };

  const onMessageOnce = (messageType, cb) => {
    if (!socket) return true;
    socket.once(messageType, (msg) => {
      console.log(`onMessageOnce ${messageType}`);
      return cb(msg);
    });
  };

  const sendMessage = (messageType, data, cb?) => {
    if (socket) socket.emit(messageType, data, cb);
  };

  return {
    connect,
    onMessage,
    onMessageOnce,
    sendMessage,
  };
};
