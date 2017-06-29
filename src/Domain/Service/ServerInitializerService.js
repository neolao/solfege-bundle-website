/* @flow */
import assert from "assert"
import type ServerFactory from "solfegejs-server/src/ServerFactory"
import type HttpServer from "solfegejs-server/src/HttpServer"
import type YamlLoader from "solfegejs-server-router/src/routes-loader/YamlLoader"
import RouterMiddleware from "solfegejs-server-router/lib/middlewares/RouterMiddleware"

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
     * YAML loader for routes
     */
    yamlRoutesLoader:YamlLoader;

    /**
     * Server configurations
     */
    configs:Array<Object>;

    /**
     * Constructor
     *
     * @param   {ServerFactory}     serverFactory       Server factory
     * @param   {YamlLoader}        yamlRoutesLoader    YAML loader for routes
     * @param   {Array}             configs             Server configurations
     */
    constructor(serverFactory:ServerFactory, yamlRoutesLoader:YamlLoader ,configs:Array<Object>)
    {
        this.serverFactory = serverFactory;
        this.yamlRoutesLoader = yamlRoutesLoader;
        this.configs = configs;
    }

    /**
     * Get initialized servers
     *
     * @return  {HttpServer[]}  Servers
     */
    *getServers():Generator<*,Array<HttpServer>,*>
    {
        // Check configurations
        if (!Array.isArray(this.configs)) {
            throw new Error("No server configured");
        }

        // Create server list
        let servers:Array<HttpServer> = [];
        for (const config of this.configs) {
            const server:HttpServer = yield this.initializeServer(config);
            servers.push(server);
        }

        // Return server list
        return servers;
    }

    /**
     * Initialize HTTP server
     *
     * @param   {Object}        config  Configuration
     * @return  {HttpServer}            HTTP server instance
     */
    *initializeServer(config:Object):Generator<*,HttpServer,*>
    {
        assert.ok(Number.isInteger(config.port), "Port is required");

        // Create the server
        const server:HttpServer = this.serverFactory.create();

        // Set server parameters
        const port:number = config.port;
        server.setPort(port);

        // Add middlewares
        const router = new RouterMiddleware;
        yield router.loadRoutes(this.yamlRoutesLoader, config.routes);
        server.addMiddlewares([router]);

        return server;
    }
}
