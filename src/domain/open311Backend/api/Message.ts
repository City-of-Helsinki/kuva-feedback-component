class Message<T> {
  content: T;

  constructor(content: T) {
    this.content = content;
  }

  // eslint-disable-next-line class-methods-use-this
  setContent<N>(content: N): Message<N> {
    return new Message(content);
  }
}

export default Message;
