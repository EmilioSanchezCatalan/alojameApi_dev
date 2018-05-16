class Message {
  constructor(action, table, status, messagemessageText, error){
    this.action = action;
    this.table = table;
    this.status = status;
    this.messagemessageText = messagemessageText
    this.error = error;
  }
}

module.exports = Message;
