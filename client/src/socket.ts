import { io } from 'socket.io-client';

export const socket = io('https://t4-frise-moi-ca.onrender.com', {
    autoConnect: false,
});