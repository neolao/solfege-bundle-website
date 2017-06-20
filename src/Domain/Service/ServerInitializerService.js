/* @flow */
import assert from "assert"
import type ServerFactory from "solfegejs-server/src/ServerFactory"
import type HttpServer from "solfegejs-server/src/HttpServer"

/**
 * Initialize servers
 */
export default class ServerInitializerService
{
    /**
     * Server factory from server bundle
     */
    serverFactory:ServerFactory;

    /**
     * Server configurations
     */
    configs:Array<Object>;

    /**
     * Constructor
     *
     * @param   {ServerFactory}     serverFactory       Server factory
     * @param   {Array}             configs             Server configurations
     */
    constructor(serverFactory:ServerFactory, configs:Array<Object>)
    {
        this.serverFactory = serverFactory;
        this.configs = configs;
    }

    /**
     * Get initialized servers
     *
     * @return  {HttpServer[]}  Servers
     */
    getServers():Array<HttpServer>
    {
        // Check configurations
        if (!Array.isArray(this.configs)) {
            throw new Error("No server configured");
        }

        // Create server list
        let servers:Array<HttpServer> = [];
        for (const config of this.configs) {
            assert.ok(Number.isInteger(config.port), "Port is required");

            // Create the server
            const server:HttpServer = this.serverFactory.create();

            // Set server parameters
            const port:number = config.port;
            server.setPort(port);

            // Add configured server to the list
            servers.push(server);
        }

        // Return server list
        return servers;
    }
}
