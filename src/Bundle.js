/* @flow */
import ServerBundle from "solfegejs-server"
import type {ApplicationInterface, BundleInterface, DependentBundleInterface} from "solfegejs/interface"

/**
 * Website bundle
 */
export default class Bundle implements BundleInterface, DependentBundleInterface
{
    /**
     * Get bundle directory
     *
     * @return  {string}    Directory path
     */
    getPath():string
    {
        return  __dirname;
    }

    /**
     * Install dependencies
     *
     * @param   {ApplicationInterface}  application     SolfegeJS application
     */
    *installDependencies(application:ApplicationInterface):Generator<void,void,void>
    {
        // Install server bundle
        application.addBundle(new ServerBundle);
    }
}
