# Notifier

### Usage

Add package:

    meteor add chap:notifier

Then place `{{> componentNotifier}}` in your layout template. Recomended usage:

```handlebars
<body>
  {{> componentNotifier}}
</body>
```

### Configuration

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
  timeout = 3000,
  width = '300px',
  zIndex = '1000'
})
```
