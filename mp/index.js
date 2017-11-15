const koa = require('koa');
const fs = require('fs');
const send = require('koa-send');

const app = koa();
// app.use(function* () {
//     this.body = fs.createReadStream('index.html');
// });
app.use(function* () {
  if (this.path.indexOf('login.html') !== -1) {
    yield send(this, 'login.html');
  } else {
    yield send(this, 'index.html');
  }
})

app.listen(40007);
