// Karma configuration
// Generated on Wed Feb 17 2021 16:44:14 GMT+0300 (Moscow Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'detectBrowsers'],

    detectBrowsers: {
      // enable/disable, default is true
      enabled: false,

      // enable/disable phantomjs support, default is true
      usePhantomJS: true,

      // use headless mode, for browsers that support it, default is false
      preferHeadless: true,

      // post processing of browsers list
      // here you can edit the list of browsers used by karma
      postDetection: function(availableBrowsers) {
        /* Karma configuration with custom launchers
          customLaunchers: {
            IE9: {
              base: 'IE',
              'x-ua-compatible': 'IE=EmulateIE9'
            }
          }
        */

        //Add IE Emulation
        var result = availableBrowsers;

        if (availableBrowsers.indexOf('IE')>-1) {
          result.push('IE9');
        }

        //Remove PhantomJS if another browser has been detected
        if (availableBrowsers.length > 1 && availableBrowsers.indexOf('PhantomJS') >-1) {
          var i = result.indexOf('PhantomJS');

          if (i !== -1) {
            result.splice(i, 1);
          }
        }

        return result;
      }
    },

    // list of files / patterns to load in the browser
    files: [
      'specs/**/*spec.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'summary'],
    summaryReporter: {
      // 'failed', 'skipped' or 'all'
      show: 'all',
      // Limit the spec label to this length
      specLength: 50,
      // Show an 'all' column as a summary
      overviewColumn: true,
      // Show a list of test clients, 'always', 'never' or 'ifneeded'
      browserList: 'always'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
