## KIDDYER
Kiddyer is a children protection system based on real-time positioning map (Google Map). For detailed introduction, please have a look at our home page and blog.
Home: [http://www.kiddyer.com](http://www.kiddyer.com)
Blog: [http://blog.kiddyer.com](http://blog.kiddyer.com)

# Running On Simulators

Kiddyer is a multiple application which can be used on iOS, Android and Web. 

## iOS (iPhone)

For running on the iOS simulator, you need to follow the React Native offical documentations to build related dependencies:
https://facebook.github.io/react-native/docs/getting-started.html

While all dependencies are installed, now you can clone our project to your local:

```
git clone https://github.com/coolcode/kiddyer.git
```

The project will automatically download to your target folder and then run:

```
npm install
```

please ensure you have installed npm already, otherwhise download and install [npm](https://www.npmjs.com/get-npm)
Now all local dependencies will be installed to local, it may take a little bit long time based on your network.

Next run the command to link the map and React Native:

```
react-native link react-native-maps
```

Now the apllication will be able to run:

```
react-native run-ios
```

## Android

For running on the Android simulator, you also need to follow the React Native offical documentations to build related dependencies:
https://facebook.github.io/react-native/docs/getting-started.html

While all dependencies are installed, now you can clone our project to your local:

```
git clone https://github.com/coolcode/kiddyer.git
```

The project will automatically download to your target folder and then run:

```
npm install
```

please ensure you have installed npm already, otherwhise download and install [npm](https://www.npmjs.com/get-npm)
Now all local dependencies will be installed to local, it may take a little bit long time based on your network.

For Android simulator, you don not need to link maps, just simply run:

```
react-native run-androi, 
```
## Web

The web is built based on Python with Django, the expected IDE is Pycharm. After clone this project, use Pycharm to open the project folder "kiddyer-server" which is the Web code. Pycharm will automatically install the necessary dependecies. Then click the "run" button. You will be able to login the website at:

```
http://127.0.0.1:8000/login/
```


# Running On Real Devices

## iOS

### Plug in your device via USB

Connect your iOS device to your Mac using a USB to Lightning cable. Navigate to the ios folder in your project, then open the .xcodeproj file within it using Xcode.

If this is your first time running an app on your iOS device, you may need to register your device for development. Open the Product menu from Xcode's menubar, then go to Destination. Look for and select your device from the list. Xcode will then register your device for development.

### Configure code signing

Register for an [Apple developer account](https://developer.apple.com/) if you don't have one yet.

Select your project in the Xcode Project Navigator, then select your main target (it should share the same name as your project). Look for the "General" tab. Go to "Signing" and make sure your Apple developer account or team is selected under the Team dropdown.

![RealDevice](https://facebook.github.io/react-native/docs/assets/RunningOnDeviceCodeSigning.png)

### Build and Run your app

If everything is set up correctly, your device will be listed as the build target in the Xcode toolbar, and it will also appear in the Devices pane (⇧⌘2). You can now press the Build and run button (⌘R) or select Run from the Product menu. Your app will launch on your device shortly.

## Android

### Enable Debugging over USB

Most Android devices can only install and run apps downloaded from Google Play, by default. You will need to enable USB Debugging on your device in order to install your app during development.

To enable USB debugging on your device, you will first need to enable the "Developer options" menu by going to Settings → About phone and then tapping the Build number row at the bottom seven times. You can then go back to Settings → Developer options to enable "USB debugging".

### Plug in your device via USB

Let's now set up an Android device to run our React Native projects. Go ahead and plug in your device via USB to your development machine.

Now check that your device is properly connecting to ADB, the Android Debug Bridge, by running adb devices.

```
$ adb devices
List of devices attached
emulator-5554 offline   # Google emulator
14ed2fcc device         # Physical device
```

Seeing device in the right column means the device is connected. You must have only one device connected at a time.

### Run your app

Type the following in your command prompt to install and launch your app on the device:

```
react-native run-android
```

# Deployment (Bundle)

The two ways of running your app on your phone are (1.) as a local Node process, and (2.) as a bundled file that runs completely on the phone without external dependencies. There are some simple procedues to create bundled file, for detailed instructions on delpoyment, please have a look at [iOS deployment](https://medium.com/react-native-development/deploying-a-react-native-app-for-ios-pt-1-a79dfd15acb8) and [Android deployment](https://facebook.github.io/react-native/docs/signed-apk-android.html)

## iOS

On the AppDelegate.m file, you need to change the jsCodeLocation:

![JS](https://cdn-images-1.medium.com/max/1600/1*v4VPIxPHfWESxIM_wQezCQ.png)

```
jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
```

Make sure your Bundle Indentifier:

![Bundle](https://cdn-images-1.medium.com/max/1600/1*9vvdivYn0u9YRf3ykb6wZQ.png)

Now run the command:

```
react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios
```

After the bundling is finished, change the jsCodeLocation:

```
NSURL *jsCodeLocation;
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
//  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
```
Now this application will be running in a specific bundled version on iOS!

## Android

For bundling on Android Phone, you must generate a signed APK

### Generating a signing key

You can generate a private signing key using keytool. On Windows keytool must be run from C:\Program Files\Java\jdkx.x.x_x\bin.

### Setting up gradle variables

1. Place the my-release-key.keystore file under the android/app directory in your project folder.

2. Edit the file ~/.gradle/gradle.properties or android/gradle.properties and add the following (replace ***** with the correct keystore password, alias and key password)

```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

### Adding signing config to your app's gradle config

Edit the file android/app/build.gradle in your project folder and add the signing config

```
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

### Generating the release APK

Simply run the following in a terminal:

```
cd android && ./gradlew assembleRelease
```

The generated APK can be found under android/app/build/outputs/apk/app-release.apk, and is ready to be distributed.

# Configuration

This project is using [Firebase](https://firebase.google.com/) as our real-time database and authentication tools.

The configuration is necessary while you want to use your own Firebase account so that you will be able to monitoring the account behavior and design databases.

## Create a new project

If you have a Google account, you will be able to login at [Firebase](https://firebase.google.com/) and then go to the developer console.

Add a new project:

![image](https://koenig-media.raywenderlich.com/uploads/2018/02/02-Add-a-project.png)

Then, you need to click "Add firebase to your web app"

![image](https://koenig-media.raywenderlich.com/uploads/2018/03/03-Project-Overview.png)

And you will be able to see the configuration like this:

![image](http://shiffman.net/a2z/images/firebase1.png)

Modify the configuration structure so that it can keep similiar with the source code:

### kiddyer/App.js

```
componentWillMount() {
  const firebaseConf_Will = {
    apiKey: 'AIzaSyACti3poX0jG2tGD6cS-uZ25fDgHwDMorw',
    authDomain: 'kiddyer-capstone.firebaseapp.com',
    databaseURL: 'https://kiddyer-capstone.firebaseio.com',
    projectId: 'kiddyer-capstone',
    storageBucket: '',
    messagingSenderId: '226025468668'
  };

  const firebaseConf_Bruce = {
    apiKey: 'AIzaSyB7tQOQDyedWRypB4e301jHgzYPBJYf9wM',
    authDomain: 'kiddyer-1521547598504.firebaseapp.com',
    databaseURL: 'https://kiddyer-1521547598504.firebaseio.com',
    projectId: 'kiddyer-1521547598504',
    storageBucket: '',
    messagingSenderId: '226025468668'
  };

  firebase.initializeApp(firebaseConf_Bruce);
  //ignoreWarnings('Setting a timer');
  //ignoreWarnings('e');
}

```

Now, run the application, the data will be stored at your Firebase account.
