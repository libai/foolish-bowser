import {System, test, importComponent} from '../../taper';

System.set(System.normalizeSync('services/node/env'), System.newModule({
  env: {
    name: 'mockedname',
  },
}));

importComponent('components/appVersion/appVersion').then((compModule) => {
  let AppVersion = compModule.AppVersion;

  test('Component appVersion', (assert) => {
    let app = new AppVersion();
    assert.plan(2);
    assert.equal(app.greet, 'Hello World!');
    assert.equal(app.env, 'mockedname');
    assert.end();
  });
});
