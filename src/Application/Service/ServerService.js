/* @flow */
import type ServerInitializer from "../../Domain/Service/ServerInitializerService"
import type HttpServer from "solfegejs-server/src/HttpServer"

/**
 * Service service
 */
export default class ServerService
{
    /**
     * Server initializer service
     */
    serverInitializer:ServerInitializer;

    /**
     * Constructor
     *
     * @param   {ServerInitializer} serverInitializer   Server initializer service
     */
    constructor(serverInitializer:ServerInitializer)
    {
        this.serverInitializer = serverInitializer;
    }

    /**
     * Start servers
     */
    *startServers():Generator<*,void,*>
    {
        const servers:Array<HttpServer> = yield this.serverInitializer.getServers();

        for (const server:HttpServer of servers) {
            server.start();
            console.log(`Server "${server.getName()}" started on port ${server.getPort()}`);
        }
    }
}
