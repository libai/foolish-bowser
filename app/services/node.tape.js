import {test} from '../taper';
import jetpack from 'fs-jetpack';
import {os} from '../services/node';
// or
// let node = require('../services/node');

test('Node.js tester', (assert) => {
  assert.plan(1);
  assert.equal(typeof os.platform(), 'string');
  assert.end();
});

test('node_modules tester', (assert) => {
  assert.plan(1);
  assert.equal(typeof jetpack.path(), 'string');
  assert.end();
});
