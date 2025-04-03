# IdoSell Apps Connector

A **TypeScript plugin** to easily connect to [IdoSell Apps](https://idosell.readme.io/docs/apps).  
This plugin simplifies handling incoming requests from IdoSell Apps and responding efficiently.

## 🚀 Features
- Easy integration with IdoSell Apps API  
- Handles authentication and request validation  
- Provides a structured response format  
- Supports license management, pricing, and client data  

## 📦 Installation
Install via npm:
```sh
npm install idoapp-driver
```

## 📖 Usage 

Any Idosell application is required to enable for endpoints: 
* Enabling the application - this is sent when a new client installs yout app in their panel
* Launching the application - this is sent every time client wants to access your application through their panel
* Disabling the application - this is sent when client uninstalls your app in their panel
* Modifying the license - this is sent when client modifies their license in their panel

### Enabling the license

This initial request sends basic information about the client as well as their url and apiKey in encrypted form. Your App key is used to decrypt the api key. Store safely that data to make API calls later.

Also, as a requirement, developer is supposed to send a signal when installation is done to a designated endpoint.

```js
import { IdosellApplicationDriver } from "idoapp-driver";

const enableLicense = (data) => {
    // Initialize the driver with your configurations
    const driver = new IdosellApplicationDriver(configs);

    // Decrypt the API key
    const apiKey = driver.decryptIdosellKey(data.api_key);

    // Initialize your database and save Api Key

    // Send confirmation of installation signal to Idosell Server
    driver.signalInstallationDone(req.body).catch(console.error);
    
    // Generate a signed response
    const signedResponse = driver.getSignedResponse();
    
    // return generated signed response for validation
    return signedResponse;
}
```

### Lanching the application

This request sends basic information about the client every time when they click on your app in their panel. Developer is supposed to generate and return an url to the working application. For example:
```https://my.server.com/app/123456/``` where 123456 is the client id.

```js
import { IdosellApplicationDriver } from "idoapp-driver";

const launchApplication = (data) => {
    // Initialize the driver with your configurations
    const driver = new IdosellApplicationDriver(configs);

    // Generate url to you application
    const redirectUrl = "YOUR_REDIRECT_URL";

    // Generate a signed response with redirect url
    const signedResponse = driver.getSingedRedirectResponse(redirectUrl);
    
    // return generated signed response for validation and redirect user
    return signedResponse;
}
```

### Modify / revoke license

Clients may want to calcel of modify the license. This is when next request is sent.

```js
import { IdosellApplicationDriver } from "idoapp-driver";

const modifyLicense = (data) => {
    // Initialize the driver with your configurations
    const driver = new IdosellApplicationDriver(configs);

    // Modify your license data

    // Generate a signed response
    const signedResponse = driver.getSignedResponse();
    
    // return generated signed response for validation purposes
    return signedResponse;
}
```

### Get License Data

This method allows you to query all the licenses of the application.

```js
import { IdosellApplicationDriver } from "idoapp-driver";

const getLicenses = (data) => {
    // Initialize the driver with your configurations
    const driver = new IdosellApplicationDriver(configs);

    // Set optional data
    const license = '...';
    const active = true;

    // Get your license data
    return driver.getLicenses(license, active);
}
```

## 📝 License
This project is licensed under the MIT License.