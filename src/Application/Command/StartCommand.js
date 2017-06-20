/* @flow */
import type {ConfigurationInterface} from "solfegejs/interface"
import type {CommandInterface} from "solfegejs-cli/interface"
import ContainerAwareCommand from "solfegejs-cli/lib/Command/ContainerAwareCommand"

/**
 * Start website server
 */
export default class StartCommand extends ContainerAwareCommand implements CommandInterface
{
    /**
     * Solfege configuration
     */
    config:ConfigurationInterface;

    /**
     * Constructor
     *
     * @param   {ConfigurationInterface}    config  Solfege configuration
     */
    constructor(config:ConfigurationInterface)
    {
        super();
        this.config = config;
    }

    /**
     * Configure command
     */
    *configure():Generator<*,void,*>
    {
        this.setName("website:start");
        this.setDescription("Start website server");
    }

    /**
     * Execute the command
     */
    *execute():Generator<*,void,*>
    {
        let container = this.getContainer();
        let serverService = yield container.get("solfege_website_server");

        serverService.startServers();
    }
}
