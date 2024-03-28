import { io } from "socket.io-client";

const socket = io.connect("http://10.70.2.167:3000");

export default socket;
