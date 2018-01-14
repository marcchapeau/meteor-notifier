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
  contextPrefix = '',
  margin = '10px',
  offsetTop = '10px',
  timeout = 3000,// in milliseconds
  width = '300px',
  zIndex = '1000'
})
```

## API

This entire API and all methods are available only in client code.

### Notifier.add(message,[context, duration])

Add a new notification in the stack. This method returns an id. Examples:

```js
Notifier.add('Hello world')
Notifier.add('Permission denied', 'danger')
Notifier.add('Another information message', 'info', 3000)
```

### Notifier.close(notificationId)

Close a specific notification.
