/* @flow */
import assert from "assert"
import type ServerFactory from "solfegejs-server/src/ServerFactory"

/**
 * Service service
 */
export default class ServerService
{
    /**
     * Server factory from server bundle
     */
    serverFactory:ServerFactory;

    /**
     * Server configurations
     */
    serverConfigs:Array<Object>;

    /**
     * Constructor
     *
     * @param   {ServerFactory}     serverFactory   Server factory
     * @param   {Array}             serverConfigs   Server configurations
     */
    constructor(serverFactory:ServerFactory, serverConfigs:Array<Object>)
    {
        this.serverFactory = serverFactory;
        this.serverConfigs = serverConfigs;
    }

    /**
     * Start servers
     */
    startServers()
    {
        if (!Array.isArray(this.serverConfigs)) {
            throw new Error("No server configured");
        }

        for (let serverConfig of this.serverConfigs) {
            assert.ok(Number.isInteger(serverConfig.port), "Port is required");
            let port = serverConfig.port;
            let server = this.serverFactory.create();
            server.start(port);
        }
    }
}
