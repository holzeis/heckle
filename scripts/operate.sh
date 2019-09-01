#!/bin/bash
DEV_VERSION=dev

basedir=$( dirname "$0" )
cd "$basedir/.."

if [ -z $1 ]; then
    echo "Missing argument. (build | watch [ --rebuild ] [server | client])"
    exit 1
fi

if [ -z $2 ]; then
    echo "Missing argument. (server | client)"
    exit 1
fi

function build() {
    # rebuild heckle app
    docker build -t richardholzeis/heckle-$1:$DEV_VERSION $1

    # terminate old heckle pod, the deployment will automatically start a new pod.
    kubectl get pods -n heckle --no-headers -o=custom-columns=:metadata.name --selector=app=heckle-$1 | xargs -IPOD kubectl delete  --ignore-not-found=true -n heckle pod POD
}

if [ "build" = $1 ]; then
    build $2
fi

if [ "watch" = $1 ]; then
    
    if [[ "--rebuild" = $3 ]]; then
        build $2;
    fi
    cd $2;
    echo "Watching $2";
    onchange -d 5000 'src/**/*' -- bash -c -- "\
        if [ 'unlinkDir' = {{event}} ]; then \
            kubectl exec -i -n heckle $(kubectl get pods -n heckle --no-headers -o=custom-columns=:metadata.name --selector=app=heckle-$2 --field-selector=status.phase=Running) -- rm -r /usr/src/app/{{changed}}; \
        fi; \
        if [ 'addDir' = {{event}} ]; then \
            kubectl exec -i -n heckle $(kubectl get pods -n heckle --no-headers -o=custom-columns=:metadata.name --selector=app=heckle-$2 --field-selector=status.phase=Running) -- mkdir -p /usr/src/app/{{changed}}; \
        fi; \
        if [ 'unlink' = {{event}} ]; then \
            kubectl exec -i -n heckle $(kubectl get pods -n heckle --no-headers -o=custom-columns=:metadata.name --selector=app=heckle-$2 --field-selector=status.phase=Running) rm /usr/src/app/{{changed}}; \
        fi; \
        if [ 'add' = {{event}} ] || [ 'change' = {{event}} ]; then\
            kubectl cp -n heckle {{changed}} $(kubectl get pods -n heckle --no-headers -o=custom-columns=:metadata.name --selector=app=heckle-$2 --field-selector=status.phase=Running):/usr/src/app/{{changed}}; \
        fi"
fi
