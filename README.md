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
react-native run-android
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



