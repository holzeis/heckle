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

| Key | Default | Description |
|-----|---------|-------------|
| affinity | `{}` |  |
| couchdb.adminUsername | `"admin"` |  |
| couchdb.clusterSize | `1` |  |
| couchdb.couchdbConfig.couchdb.uuid | `"5a1b1c8d8a414330bd6b7f96e5c61103"` |  |
| couchdb.persistentVolume.accessModes[0] | `"ReadWriteOnce"` |  |
| couchdb.persistentVolume.enabled | `true` |  |
| couchdb.persistentVolume.size | `"1Gi"` |  |
| couchdb.resources | `{}` |  |
| fullnameOverride | `""` |  |
| host | `"heckle.example.com"` | The ingress host of the heckle application |
| imagePullSecrets | list | `[]` |  |
| ingress.annotations | `nil` |  |
| ingress.apiPath | `"/api/v1"` |  |
| ingress.enabled | `false` |  |
| ingress.labels | `{}` |  |
| ingress.tls[0].hosts[0] | `"heckle.example.com"` |  |
| ingress.tls[0].secretName | `"heckle-tls"` |  |
| ingress.uiPath | `"/"` | The ingress path of the heckle ui. |
| ingress.websocketPath | `"/ws"` | The ingress path of the heckle websocket. |
| nameOverride | `""` |  |
| nodeSelector | `{}` |  |
| podAnnotations | `{}` |  |
| podSecurityContext | `{}` |  |
| securityContext | `{}` |  |
| server.autoscaling.enabled | `false` |  |
| server.autoscaling.maxReplicas | `5` |  |
| server.autoscaling.minReplicas | `1` |  |
| server.autoscaling.targetCPUUtilizationPercentage | `80` |  |
| server.autoscaling.targetMemoryUtilizationPercentage | `80` |  |
| server.image.pullPolicy | `"IfNotPresent"` |  |
| server.image.repository | `"ghcr.io/holzeis/heckle-server"` |  |
| server.image.tag | `"0.1.0"` |  |
| server.replicaCount | `1` |  |
| server.resources | `{}` |  |
| server.service.api.port | `3000` |  |
| server.service.type | `"ClusterIP"` |  |
| server.service.websocket.port | `2000` |  |
| tolerations | list | `[]` |  |
| ui.autoscaling.enabled | `false` |  |
| ui.autoscaling.maxReplicas | `5` |  |
| ui.autoscaling.minReplicas | `1` |  |
| ui.autoscaling.targetCPUUtilizationPercentage | `80` |  |
| ui.autoscaling.targetMemoryUtilizationPercentage | `80` |  |
| ui.enabled | `true` |  |
| ui.image.pullPolicy | `"IfNotPresent"` |  |
| ui.image.repository | `"ghcr.io/holzeis/heckle-ui"` |  |
| ui.image.tag | `"0.1.0"` |  |
| ui.replicaCount | `1` |  |
| ui.resources | `{}` |  |
| ui.service.port | `80` |  |
| ui.service.type | `"ClusterIP"` |  |
| vapid.privateKey | `nil` |  |
| vapid.publicKey | `nil` |  |