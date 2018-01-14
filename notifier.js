import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Template } from 'meteor/templating'

import './notifier.html'

const Notifications = new Mongo.Collection(null)

const NotifierAPI = class Notifier {
  constructor () {
    this.classes = ''
    this.collection = Notifications
    this.contextDefault = ''
    this.contextPrefix = ''
    this.margin = '10px'
    this.stackLimit = 3
    this.offsetTop = '10px'
    this.timeout = 3000
    this.width = '300px'
    this.zIndex = '1000'
  }
  add (message, context = this.contextDefault, timeout = this.timeout) {
    if (this.collection.find().count() >= this.stackLimit) {
      const notification = this.collection.findOne({}, {sort: {createdAt: 1}})
      if (notification) {
        this.collection.remove(notification._id)
      }
    }
    return this.collection.insert({message, context, timeout, createdAt: new Date()})
  }
  close (notificationId) {
    this.collection.remove(notificationId)
  }
  closeAll () {
    this.collection.remove({})
  }
  config ({
    classes,
    collection,
    contextDefault,
    contextPrefix,
    margin,
    stackLimit,
    offsetTop,
    timeout,
    width,
    zIndex
  }) {
    this.classes = classes || this.classes
    this.collection = collection || this.collection
    this.contextDefault = contextDefault || this.contextDefault
    this.contextPrefix = contextPrefix || this.contextPrefix
    this.margin = margin || this.margin
    this.stackLimit = stackLimit || this.stackLimit
    this.offsetTop = offsetTop || this.offsetTop
    this.timeout = timeout || this.timeout
    this.width = width || this.width
    this.zIndex = zIndex || this.zIndex
  }
}

const Notifier = new NotifierAPI()

export { Notifier }

Template.componentNotifier.helpers({
  offsetTop: () => Notifier.offsetTop,
  width: () => Notifier.width,
  zIndex: () => Notifier.zIndex,
  notifications () {
    return Notifier.collection.find({}, {sort: {createdAt: -1}})
  }
})

Template.componentNotifierNotification.onCreated(function () {
  this.close = () => {
    const duration = 'fast'
    this.$(this.firstNode).animate({opacity: 0}, duration).animate({
      height: 0,
      marginBottom: 0,
      paddingBottom: 0,
      paddingTop: 0
    }, duration, () => {
      Notifier.close(this.data._id)
    })
  }
})

Template.componentNotifierNotification.onRendered(function () {
  const notification = Template.currentData()
  if (notification.timeout > 0) {
    this.timeout = Meteor.setTimeout(this.close, notification.timeout)
  }
})

Template.componentNotifierNotification.helpers({
  classes: () => Notifier.classes,
  contextPrefix: () => Notifier.contextPrefix,
  margin: () => Notifier.margin,
  width: () => Notifier.width
})

Template.componentNotifierNotification.events({
  'click' (evt, tpl) {
    Meteor.clearTimeout(tpl.timeout)
    tpl.close()
  }
})

Template.componentNotifierNotification.onDestroyed(function () {
  Meteor.clearTimeout(this.timeout)
})
