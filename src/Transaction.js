class BankAccount {
  constructor(client, data) {
    Object.defineProperty(this, 'client', { value: client });
    this.patch(data);
  }

  patch(data) {
    Object.assign(this, data);
    this.dateAuthorized = new Date(data.dateAuthorized);
    return this;
  }
}

module.exports = BankAccount;
