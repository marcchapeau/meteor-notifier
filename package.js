Package.describe({
  name: 'chap:notifier',
  version: '1.0.6',
  summary: 'Simple notifications system for Meteor',
  git: 'https://github.com/marcchapeau/meteor-notifier.git',
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.6.0.1')
  api.use('ecmascript')
  api.use('meteor')
  api.use('mongo')
  api.use('templating@1.3.2')
  api.mainModule('notifier.js', 'client')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('tinytest')
  api.use('chap:notifier')
  api.mainModule('notifier-tests.js')
})
