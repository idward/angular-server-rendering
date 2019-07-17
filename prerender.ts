import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import {
  AppServerModuleNgFactory,
  provideModuleMap,
  LAZY_MODULE_MAP
} from './dist-server/main';
import { writeFileSync } from 'fs';

enableProdMode();

renderModuleFactory(AppServerModuleNgFactory, {
  document: '<app-root></app-root>',
  url: '/',
  extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
})
  .then(html => {
    console.log('Angular Universal Server render template successfully');
    writeFileSync('./prerender.html', html);
  })
  .catch(error => {
    console.log('Error occurred:', error);
  });
