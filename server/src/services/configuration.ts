export class Configuration {
    /* Couch db configuration */
    public readonly couchdbAdminUser: string = process.env.COUCHDB_ADMIN_USER;
    public readonly couchdbAdminPassword: string = process.env.COUCHDB_ADMIN_PASSWORD;
    public readonly couchdbEndpoint: string = process.env.COUCHDB_ENDPOINT;
    public readonly couchdbPort: string = process.env.COUCHDB_PORT;

    public readonly secret: string = process.env.JSON_WEBTOKEN_SECRET || "";
    public readonly privateKey: string = process.env.VAPID_PRIVATE;
    public readonly publicKey: string = process.env.VAPID_PUBLIC;

    public readonly apiPort: string = process.env.API_PORT || "3000";
    public readonly websocketPort: string = process.env.WEBSOCKET_PORT || "2000";

    private static configuration: Configuration;
    public static instance(): Configuration {
        if (Configuration.configuration == null) {
            Configuration.configuration = new Configuration();
        }
        return Configuration.configuration;
    }
}