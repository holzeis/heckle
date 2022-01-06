# Heckle

A sample project for a progressive web application - see more on the [architecture](architecture/README.md).

## tl;dr

Add the chart repo:

```bash
helm repo add heckle https://holzeis.github.io/heckle
helm install heckle heckle/heckle -f values.yaml # create your own values.yaml
```

## Web Push

Heckle uses the [WebPush Protocol](https://datatracker.ietf.org/doc/html/draft-ietf-webpush-protocol) to push notifications to user agents through push services. In order to distinguish between legitimate and bogus requests push services require a voluntary application server identification ([VAPID](https://datatracker.ietf.org/doc/html/draft-thomson-webpush-vapid)).


### Generate VAPID keys

Generate a valid private / public key pair using the web-push cli like described below.

```bash
npm install -g web-push
web-push generate-vapid-keys
```

Use the resulting private and public key in the vapid section of the values.yaml.

```yaml
vapid:
  publicKey: "<public key>"
  privateKey: "<private key>"
```

## Dummy Users

Heckle doesn't implement an user authentication but uses plain jwt token to identify the current user. Dummy users are simply loaded via configuration. See [accounts.json](charts/heckle/config/accounts.json) for possible test users.

## Couchdb Persistency

Heckle stores talks and heckles into a couchdb which is defined as dependency to the heckle chart. Configure the couchdb parameters via the couchdb section.

See [couchdb chart](https://github.com/apache/couchdb-helm/tree/main/couchdb#configuration) for configuration details.


## Configuration Values

see [heckle chart values](charts/heckle/values.yaml) for default values.