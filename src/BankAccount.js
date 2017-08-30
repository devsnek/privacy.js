class BankAccount {
  constructor(client, data) {
    Object.defineProperty(this, 'client', { value: client });
    this.patch(data);
  }

  patch(data) {
    Object.assign(this, data);
    this.created = new Date(data.created);
    return this;
  }
}

module.exports = BankAccount;
