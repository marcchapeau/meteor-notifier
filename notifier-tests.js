// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from 'meteor/tinytest'

// Import and rename a variable exported by notifier.js.
import { Notifier } from 'meteor/chap:notifier'

// Write your tests here!
// Here is an example.
Tinytest.add('notifier - example', function (test) {
  test.equal(Notifier, 'notifier')
})
