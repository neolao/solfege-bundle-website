/**
 * Homepage controller
 */
export default class HomepageController
{
    /**
     * Homepage
     *
     * @param   {Request}   request     HTTP request
     * @param   {Response}  response    HTTP response
     */
    *index(request, response)
    {
        console.log("Homepage");

        response.setBody("Homepage");
    }
}
