class APIUtils {

    /*
*  Sets up an API context
*  Sends a POST request to log in
*  Ensures the response is successful
*  Extracts and stores the authentication token
* */

    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
        this.token = null;
        this.orderID = null;
    }

    // create a method getToken() to get token     //login API



    //creating an order
    async createOrder(orderPayLoad) {

        let response = {};
        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": response.token,
                },
            }
        );

        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        response.orderID = orderResponseJson.orders[0];

        return response;
    }


}

module.exports = APIUtils;