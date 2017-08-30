class Card {
  constructor(client, data) {
    Object.defineProperty(this, 'client', { value: client });
    this.patch(data);
  }

  patch(data) {
    Object.assign(this, data);
    this.created = new Date(data.created);
    return this;
  }

  edit(data) {
    return this.client.request('post', '/card/attributes')
      .send(Object.assign(data, this))
      .then((d) => this.patch(d));
  }

  pause() {
    return this.client.request('post', `/card/${this.cardID}/pause`);
  }

  resume() {
    return this.client.request('post', `/card/${this.cardID}/resume`);
  }

  close() {
    return this.client.request('post', `/card/${this.cardID}/close`);
  }
}

module.exports = Card;
