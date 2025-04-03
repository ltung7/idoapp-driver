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
npm install idosell-apps-connector
```

## Usage 

### Enabling the license
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