import {System, test, importComponent}
from '../../taper';

System.set(System.normalizeSync('services/node/env'), System.newModule({
  env: {
    name: 'mockedname',
  },
}));

test('Component appVersion', (assert) => {
  assert.plan(2);
  importComponent('components/appVersion/appVersion').then((compModule) => {
    let AppVersion = compModule.AppVersion;
    console.log('test start');
    let app = new AppVersion();
    assert.equal(app.greet, 'Hello World!');
    assert.equal(app.env, 'mockedname');
    assert.end();
    console.log('test end');
  });
});
