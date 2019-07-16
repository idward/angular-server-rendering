require('zone.js/dist/zone-node');
const { enableProdMode } = require('@angular/core');

const express = require('express');
// const { ngExpressEngine } = require('@nguniversal/express-engine');
const fs = require('fs');
const path = require('path');

enableProdMode();

const app = express();

const {
  AppServerModuleNgFactory,
  ngExpressEngine,
  LAZY_MODULE_MAP,
  provideModuleMap
} = require('./dist-server/main');

app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
  })
);

app.set('view engine', 'html');
app.set('views', __dirname);

app.get('/', (req, res) => {
  console.time(`GET: ${req.originalUrl}`);
  res.render('./dist/index', { req, res });
  console.timeEnd(`GET: ${req.originalUrl}`);
});

// static assets
app.use(express.static(path.resolve(__dirname, 'dist')));

app.listen(4000, () => {
  console.log('Angular Universal Server is listening on port 4000');
});
