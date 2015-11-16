'use strict';

import {Component, View} from 'angular2/angular2';

import {env, os} from 'services/node';

@Component({
  selector: 'app-version',
})

@View({
  templateUrl: 'components/appVersion/appVersion.html',
})

export class AppVersion {
  constructor() {
    this.greet = 'Hello World!';
    this.env = env.name;
    this.version = process.versions.electron;
    this.platform = os.platform();
  }
}
