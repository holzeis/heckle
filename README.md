# Heckle

A sample project for a progressive web application - see more on the [architecture](architecture/README.md).

## tl;dr

```bash
helm repo add heckle https://holzeis.github.io/heckle
helm install heckle -n heckle heckle/heckle -f values.yaml --create-namespace # create your own values.yaml
```

see https://holzeis.github.io/heckle/ for chart configuration values.


## Web Push

Heckle uses the [WebPush Protocol](https://datatracker.ietf.org/doc/html/draft-ietf-webpush-protocol) to push notifications to user agents through push services. In order to distinguish between legitimate and bogus requests push services require a voluntary application server identification ([VAPID](https://datatracker.ietf.org/doc/html/draft-thomson-webpush-vapid)).


### Generate VAPID keys

Generate a valid private / public key pair using the web-push cli like described below. Use the result in the vapid section of the values.yaml.

```bash
npm install -g web-push
web-push generate-vapid-keys
```
