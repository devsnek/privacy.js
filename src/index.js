const request = require('snekfetch');

const Card = require('./Card');
const Transaction = require('./Transaction');
const BankAccount = require('./BankAccount');
const User = require('./User');

class Privacy {
  constructor({ fullName, id, token } = {}) {
    this.name = fullName;
    this.id = id;
    this.token = token;
  }

  request(method, path, options = {}) {
    const req = request[method.toLowerCase()](`https://privacy.com/api/v1${path}`);
    req.set({
      Referrer: 'https://privacy.com/login',
      Authorization: `Bearer ${this.token}`,
    });

    if (options.headers) req.set(options.headers);
    if (options.data) req.send(options.data);

    return req.then((r) => r.body);
  }

  fetchMe() {
    return this.request('get', '/user/me')
      .then((d) => new User(this, d));
  }

  fetchCards() {
    return this.request('get', '/card/')
      .then((d) => d.cardList.map((c) => new Card(this, c)));
  }


  fetchTransactions() {
    return this.request('get', '/transaction/')
      .then((d) => d.transactionList.map((c) => new Transaction(this, c)));
  }

  fetchBankAccounts() {
    return this.request('get', '/user/funding/all')
      .then((d) => d.bankAccountList.map((c) => new BankAccount(this, c)));
  }

  createCard({ spendLimit, reloadable, memo, hostname } = {}) {
    return this.request('post', '/card')
      .send({
        panWithSpaces: 'XXXX XXXX XXXX XXXX',
        expMonth: 'XX',
        expYear: 'XXXX',
        CVV: 'XXX',
        spendLimitDuration: 'MONTHLY',
        memo,
        hostname,
        reloadable,
        spendLimit,
      }).then((d) => new Card(this, d.card));
  }
}

function makePrivacy(email, password) {
  return request.post('https://privacy.com/auth/local')
    .send({
      extensionInstalled: false,
      email, password,
    })
    .set({
      Origin: 'https://privacy.com',
      Referrer: 'https://privacy.com/login',
    })
    .then((r) => new Privacy(r.body));
}

module.exports = makePrivacy;
