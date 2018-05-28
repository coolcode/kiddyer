### KIDDYER
Kiddyer is a children protection system based on real-time positioning map (Google Map). For detailed introduction, please have a look at our home page and blog.
Home: [http://www.kiddyer.com](http://www.kiddyer.com)
Blog: [http://blog.kiddyer.com](http://blog.kiddyer.com)

## Running On Simulators

Kiddyer is a multiple application which can be used on iOS, Android and Web. 

### iOS (iPhone)

For running on the iOS simulator, you need to following the React Native offical documentations to build related dependencies:
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
