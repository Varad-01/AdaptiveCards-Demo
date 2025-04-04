class Message {
  constructor(text, sender, adaptiveCard = null) {
    this.text = text;
    this.sender = sender;
    this.adaptiveCard = adaptiveCard;
    this.timestamp = new Date();
  }
}

module.exports = Message;
