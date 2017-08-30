const BankAccount = require('./BankAccount');

class User {
  constructor(client, data) {
    Object.defineProperty(this, 'client', { value: client });
    this.patch(data);
  }

  patch(data) {
    Object.assign(this, data);
    this.created = new Date(data.created);
    this.lastWebLogin = new Date(data.lastWebLogin);
    this.bankAccounts = data.bankAccountList.map((b) => new BankAccount(this, b));
    delete this.bankAccountList;
    return this;
  }

  setCustomMerchant(descriptor) {
    return this.client.request('post', '/user/custom-merchant', {
      data: { descriptor },
    }).then(() => {
      this.customDescriptor = descriptor;
      return this;
    });
  }
}

module.exports = User;
