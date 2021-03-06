'use strict';
// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

// No unit test and no transpile here, so require directly
const app = require('electron').app;
const BrowserWindow = require('electron').BrowserWindow;
const env = require('./vendor/electron_boilerplate/env_config');
const devHelper = require('./vendor/electron_boilerplate/dev_helper');
const windowStateKeeper = require('./vendor/electron_boilerplate/window_state');

let mainWindow;

// Preserver of the window size and position between app launches.
const mainWindowState = windowStateKeeper('main', {
  width: 1000,
  height: 600,
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
  });

  if (mainWindowState.isMaximized) {
    mainWindow.maximize();
  }

  // TODO add e2e test
  // mainWindow.loadURL(`file://${__dirname}/spec.html`);
  mainWindow.loadURL(`file://${__dirname}/app.html`);

  if (env.name !== 'production') {
    devHelper.setDevMenu();
    mainWindow.openDevTools();
  }

  mainWindow.on('close', () => mainWindowState.saveState(mainWindow));
});

app.on('window-all-closed', () => app.quit());
