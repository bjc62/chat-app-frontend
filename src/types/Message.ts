interface Message {
  fromUserEmail: string;
  toUserEmail: string;
  content: string;
  timestamp: number;
}

export default Message;
