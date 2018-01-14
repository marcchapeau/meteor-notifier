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
    this.maxStackSize = 3
    this.offsetTop = '10px'
    this.timeout = 3000
    this.width = '300px'
    this.zIndex = '1000'
  }
  add (message, context = this.contextDefault, timeout = this.timeout) {
    if (this.collection.find().count() >= this.maxStackSize) {
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
    maxStackSize,
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
    this.maxStackSize = maxStackSize || this.maxStackSize
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

Template.componentNotifierNotification.onRendered(function () {
  const notification = Template.currentData()
  if (notification.timeout > 0) {
    this.timeout = Meteor.setTimeout(() => {
      const element = this.$(this.firstNode)
      element.animate({opacity: 0}, 'fast').animate({height: 0, marginBottom: 0, paddingBottom: 0, paddingTop: 0}, 'fast', () => {
        Notifier.close(notification._id)
        Meteor.clearTimeout(this.timeout)
      })
    }, notification.timeout)
  }
})

Template.componentNotifierNotification.helpers({
  classes: () => Notifier.classes,
  contextPrefix: () => Notifier.contextPrefix,
  margin: () => Notifier.margin,
  width: () => Notifier.width
})

Template.componentNotifierNotification.events({
  'click .delete' (evt, tpl) {
    Notifier.close(this._id)
  }
})

Template.componentNotifierNotification.onDestroyed(function () {
  if (this.timeout) Meteor.clearTimeout(this.timeout)
})
