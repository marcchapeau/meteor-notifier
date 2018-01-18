# Notifier

Simple notifications system for Meteor

## Usage

Add package:

    meteor add chap:notifier

Then place `{{> componentNotifier}}` in your layout template. Recomended usage:

```handlebars
<body>
  {{> componentNotifier}}
</body>
```

Finally use it with:

```js
Notifier.add('Hello world')
```

## Configuration

Notifier can be configured on the client, be sure to put this in the client side because running it on the server will cause it to crash. The defaults are below:

```js
import { Notifier } from 'meteor/chap:notifier'

Notifier.config({
  classes: '',
  // collection: Notification,// Client side collection to store notifications`
  contextDefault: '',
  contextPrefix: '',
  margin: '10px',
  stackLimit: 3,
  offsetTop: '10px',
  timeout: 3000,// In milliseconds
  width: '300px',
  zIndex: '1000'
})
```

## API

This entire API and all methods are available only in client code.

### Notifier.add(message, [context, timeout])

Add a new notification in the stack. This method returns the new id.

```js
const notificationId = Notifier.add('Hello world')
Notifier.add('Permission denied', 'danger')
Notifier.add('Another information message', 'info', 3000)
```

### Notifier.close(notificationId)

Close a specific notification.

```js
const notificationId = Notifier.add('Hello world')
// ...
Notifier.close(notificationId)
```

### Notifier.closeAll()

Close all notifications.

```js
Notifier.closeAll()
```

## Examples

### Bulma

```js
Notifier.config({
  classes: 'notification',
  contextDefault: '',
  contextPrefix: 'is-',
  margin: '.75rem',
  offsetTop: '4rem',
  zIndex: '30'
})

// ...

Notifier.add('Hello world')
Notifier.add("Permission denied", 'danger')
Notifier.add('Another information message', 'info', 0)// 0 for an infinite timeout
```

### Bootstrap

```js
Notifier.config({
  classes: 'alert',
  contextDefault: 'secondary',
  contextPrefix: 'alert-',
  zIndex: '1030'
})

// ...

Notifier.add('Hello world')
Notifier.add("Item added", 'success')
Notifier.add('Another information message', 'info', 0)// 0 for an infinite timeout
```
