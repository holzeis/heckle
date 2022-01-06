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


## Complete Configuration Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| affinity | object | `{}` |  |
| couchdb.adminUsername | string | `"admin"` |  |
| couchdb.clusterSize | int | `1` |  |
| couchdb.couchdbConfig.couchdb.uuid | string | `"5a1b1c8d8a414330bd6b7f96e5c61103"` |  |
| couchdb.persistentVolume.accessModes[0] | string | `"ReadWriteOnce"` |  |
| couchdb.persistentVolume.enabled | bool | `true` |  |
| couchdb.persistentVolume.size | string | `"1Gi"` |  |
| couchdb.resources | object | `{}` |  |
| fullnameOverride | string | `""` |  |
| host | string | `"heckle.example.com"` | The ingress host of the heckle application |
| imagePullSecrets | list | `[]` |  |
| ingress.annotations | string | `nil` |  |
| ingress.apiPath | string | `"/api/v1"` |  |
| ingress.enabled | bool | `false` |  |
| ingress.labels | object | `{}` |  |
| ingress.tls[0].hosts[0] | string | `"heckle.example.com"` |  |
| ingress.tls[0].secretName | string | `"heckle-tls"` |  |
| ingress.uiPath | string | `"/"` | The ingress path of the heckle ui. |
| ingress.websocketPath | string | `"/ws"` | The ingress path of the heckle websocket. |
| nameOverride | string | `""` |  |
| nodeSelector | object | `{}` |  |
| podAnnotations | object | `{}` |  |
| podSecurityContext | object | `{}` |  |
| securityContext | object | `{}` |  |
| server.autoscaling.enabled | bool | `false` |  |
| server.autoscaling.maxReplicas | int | `5` |  |
| server.autoscaling.minReplicas | int | `1` |  |
| server.autoscaling.targetCPUUtilizationPercentage | int | `80` |  |
| server.autoscaling.targetMemoryUtilizationPercentage | int | `80` |  |
| server.image.pullPolicy | string | `"IfNotPresent"` |  |
| server.image.repository | string | `"ghcr.io/holzeis/heckle-server"` |  |
| server.image.tag | string | `"0.1.0"` |  |
| server.replicaCount | int | `1` |  |
| server.resources | object | `{}` |  |
| server.service.api.port | int | `3000` |  |
| server.service.type | string | `"ClusterIP"` |  |
| server.service.websocket.port | int | `2000` |  |
| tolerations | list | `[]` |  |
| ui.autoscaling.enabled | bool | `false` |  |
| ui.autoscaling.maxReplicas | int | `5` |  |
| ui.autoscaling.minReplicas | int | `1` |  |
| ui.autoscaling.targetCPUUtilizationPercentage | int | `80` |  |
| ui.autoscaling.targetMemoryUtilizationPercentage | int | `80` |  |
| ui.enabled | bool | `true` |  |
| ui.image.pullPolicy | string | `"IfNotPresent"` |  |
| ui.image.repository | string | `"ghcr.io/holzeis/heckle-ui"` |  |
| ui.image.tag | string | `"0.1.0"` |  |
| ui.replicaCount | int | `1` |  |
| ui.resources | object | `{}` |  |
| ui.service.port | int | `80` |  |
| ui.service.type | string | `"ClusterIP"` |  |
| vapid.privateKey | string | `nil` |  |
| vapid.publicKey | string | `nil` |  |