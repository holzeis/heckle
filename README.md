## Usage

[Helm](https://helm.sh) must be installed to use the charts.  Please refer to
Helm's [documentation](https://helm.sh/docs) to get started.

Once Helm has been set up correctly, add the repo as follows:

    helm repo add heckle https://holzeis.github.io/heckle

If you had already added this repo earlier, run `helm repo update` to retrieve
the latest versions of the packages.  You can then run `helm search repo
heckle` to see the charts.

To install the heckle chart:

    helm install my-heckle heckle/heckle -f values.yaml # 

To uninstall the chart:

    helm delete my-heckle

## Requirements

| Repository | Name | Version |
|------------|------|---------|
| https://apache.github.io/couchdb-helm | couchdb | 3.3.4 |

## Values

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
| host | string | `"heckle.example.com"` |  |
| imagePullSecrets | list | `[]` |  |
| ingress.annotations | string | `nil` |  |
| ingress.apiPath | string | `"/api/v1"` |  |
| ingress.enabled | bool | `false` |  |
| ingress.labels | object | `{}` |  |
| ingress.tls[0].hosts[0] | string | `"heckle.example.com"` |  |
| ingress.tls[0].secretName | string | `"heckle-tls"` |  |
| ingress.uiPath | string | `"/"` |  |
| ingress.websocketPath | string | `"/ws"` |  |
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
| server.jwt.secret | string | `nil` |  |
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


## Maintainers

| Name | Email | Url |
| ---- | ------ | --- |
| Richard Holzeis | richard@holzeis.me |  |
