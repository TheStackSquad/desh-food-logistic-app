// src/schemas/models/chatModel.js

class ChatMessage {
    constructor(id, content, sender, timestamp, status = 'sent') {
      this.id = id;
      this.content = content;
      this.sender = sender;
      this.timestamp = timestamp;
      this.status = status;
    }
  
    static fromJSON(json) {
      return new ChatMessage(
        json.id,
        json.content,
        json.sender,
        new Date(json.timestamp),
        json.status
      );
    }
  
    toJSON() {
      return {
        id: this.id,
        content: this.content,
        sender: this.sender,
        timestamp: this.timestamp.toISOString(),
        status: this.status
      };
    }
  }
  
  export const ChatSession = {
    ACTIVE: 'active',
    MINIMIZED: 'minimized',
    CLOSED: 'closed'
  };
  
  export default ChatMessage;