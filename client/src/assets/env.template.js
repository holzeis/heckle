(function(window) {
    window["env"] = window["env"] || {};
  
    // Environment variables
    window["env"]["host"] = "${HOST}";
    window["env"]["api"] = "${API}";
    window["env"]["socket"] = "${SOCKET}";
    window["env"]["publicKey"] = "${PUBLIC_KEY}";
  })(this);