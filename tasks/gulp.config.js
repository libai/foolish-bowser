/**
 * Created by Yail Anderson on 24/06/2015.
 */

module.exports = function() {

  var config = {

    transpileFromAppDir: [
      'app/**/*.js',
      '!app/background.js',
      '!app/spec.js',
      '!app/taper.js',
      '!app/**/*.tape.js',
      '!app/node_modules/**',
      '!app/jspm_packages/**',
      '!app/bower_components/**',
      '!app/vendor/**'
    ],

    copyFromAppDir: [
      './background.js',
      './config.js',
      './taper.js',
      './node_modules/**',
      './jspm_packages/**',
      './bower_components/**',
      './vendor/**',
      './**/*.html'
    ],
  };

  return config;
};
