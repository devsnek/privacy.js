# Privacy.js

```js
const api = await require('privacy.js')('email', 'password');

const me = await api.fetchMe();
console.log(`Logged in as me, ${me.firstName} ${me.lastName},`);
console.log('I have', me.bankAccounts.length, 'bank accounts connected and');

const cards = await api.fetchCards();
console.log('I have', cards.length, 'private cards.');
```
