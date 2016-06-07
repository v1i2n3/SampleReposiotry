Sample: bluelist-mobiledata-cordova
===

The bluelist-mobiledata-cordova sample demonstrates how the BlueList app can be written using the hybrid development approach, building the user experience with HTML5, CSS3 technologies and running them inside a Cordova application shim.

This sample works with the Mobile Cloud, an application boilerplate that is available on [IBM Bluemix](https://www.ng.bluemix.net). With this boilerplate, you can quickly incorporate pre-built, managed, and scalable cloud services into your mobile applications without relying on IT involvement. You can focus on building your mobile applications rather than the complexities of managing the back end infrastructure.

This sample uses [Cordova](http://cordova.apache.org/) to manage the native Mobile experience. Within Cordova, the [Ionicframework](https://ionicframework.com) is used for the mobile user experience and the  [AngularJS](https://angularjs.org/) as the controller framework. The app uses the Mobile Cloud Data Service SDK for JavaScript to manage the CRUD (Create, Read, Update and Delete) operations. This enable the storage of data in the cloud and that is backed by  [Cloudant](https://cloudant.com/).

Downloading this sample
---

You can clone the samples from IBM DevOps Services with the following command:

    git clone https://hub.jazz.net/git/mobilecloud/bluelist-mobiledata

The bluelist-mobiledata-cordova code is located in the bluelist-mobiledata/bluelist-mobiledata-cordova directory.

Prerequisite's
---
Before you can run the sample you need to install the prerequisite software components.

Download and install the node.js runtime from http://nodejs.org/

Then install `cordova`
```bash
npm install -g cordova
```

Then install `ionic` utility.

```bash
$ npm install -g ionic
```

Then install `bower` utility.

```bash
$ npm install -g bower
```

Running this sample
---

To help with your setup we strongly recommend working through the following Platform guides:
* [Cordova Getting Started Guide for IOS](http://cordova.apache.org/docs/en/3.3.0/guide_platforms_ios_index.md.html#iOS%20Platform%20Guide)
* [Cordova Getting Started Guide for Android](http://cordova.apache.org/docs/en/3.3.0/guide_platforms_android_index.md.html#Android%20Platform%20Guide)

To test the app you need to have created a Mobile Cloud Boilerplate application with [IBM Bluemix](http://bluemix.net) and you need to make a note of your application id.

### Configuration

To run the app locally you need to first modify the ```www/bluelist.json``` file with your corresponding application id.

```json
{
    "applicationId": "<INSERT_APPLICATION_ID_HERE>",
    "applicationSecret": "<INSERT_APPLICATION_SECRET_HERE>",
    "applicationRoute": "<INSERT_APPLICATION_ROUTE_HERE>"
}

```
### Testing the Sample
Modern mobile web applications are now built using dependency managers. The hybrid application sample uses   ```bower``` for the client side components. This includes the pulling down of the latest levels of the [Mobile Cloud SDKs](https://hub.jazz.net/user/mobilec) .

1. From the sample app directory, run ```bower install```
2. To check the development runtime, make sure all existing copies of chrome have been shutdown.
3. Load chrome with web security turned off, this enables the mobile testing to avoid any Cross Origin.

_Mac_
```bash
open -a Google\ Chrome --args --disable-web-security
```
_Windows_
```bash
start chrome.exe --disable-web-security
```
3. From the app directory, run ```ionic serve```
4. The hybrid component should now be visible in chrome browser. The ionic tools support live reload, so if you edit the code you can see if refresh in the browser.
5. The sample app can be accessed using this local url. http://localhost:8100/#/tab/list

### Running in Emulator

You need to make sure you have the latest `xcode` and `android` development tools installed on your development environment.

1. From the sample app directory run the following command to build the sample for `ios`.
```bash
ionic build ios
```
2. To run it in the emulator you can run `emulate` command.
```bash
ionc emulate ios
```
3. You should now see the `bluelist-cordova` app now running inside the IOS Simulator.

### Android Specific Setup

Additional steps are required in order to run the sample using Android.

1. From the sample app directory add the android platform to the project with the following command.
```bash
cordova platform add android
```
2. For more recent versions of Cordova (5.0+), a whitelist must be established in order for the app to communicate with the server. First add the cordova whitelist plugin with the following command from the app directory.
```bash
cordova plugin add cordova-plugin-whitelist
```
3. Next add the following Content Security Policy code to the header of ```www/index.html```.
```js
<meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' * 'unsafe-inline' 'unsafe-eval'">
```
4. Now build the android sample.
```bash
ionic build android
```
5. You should now be able to run the android sample using the following command.
```bash
ionic run android
```

> Notes.  
* You can delete and edit items in a list by swiping the list item to the left. This reveals the options `delete` and `edit` options.
* The Content Security Policy provided in the Android sample is very generic and should not be used in a production-level app, please see the [Apache Documentation on Content Security Policies](https://github.com/apache/cordova-plugin-whitelist#content-security-policy) for further info.
* **WARNING**: Do not add the Bluemix Cordova plugin to this project. Dependencies will conflict. If you'd like to use the Cordova Bluemix plugins check out the Dev Works articles for mobile data [here](http://www.ibm.com/developerworks/mobile/library/mo-bluemix-cordova-plugin/index.html) and push notifications [here](http://www.ibm.com/developerworks/mobile/library/mo-cordova-push-app/index.html).
