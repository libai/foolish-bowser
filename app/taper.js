import './jspm_packages/system-polyfills.src.js';
import System from './jspm_packages/system.src.js';
import './jspm.baseURL.js';
import './config.js';
import test from '../node_modules/tape';

// Mock mudule example, note must System.import first when using get.
// System.set('custom/module', System.newModule({ custom: 'module' }));
// var tmp = System.get('custom/module');
// System.set('custom/module', ...);

function importComponent(name) {
  return Promise.all([
    System.import('reflect-metadata'),
    System.import('@reactivex/rxjs'),
    System.import('zone.js'),
  ]).then(() => System.import(name)).catch(console.log.bind(console));
}

export {System, test, importComponent};
