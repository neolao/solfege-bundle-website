import solfege from "solfegejs"
import WebsiteBundle from "../../lib/Bundle"

// Create application instance
let application = solfege.factory([
    new WebsiteBundle
]);

// Load configuration file
//application.loadConfigurationFile(`${__dirname}/config/production.yml`, "yaml");

// Start the application
let parameters = process.argv.slice(2);
application.start(parameters);
