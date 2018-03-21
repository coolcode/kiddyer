import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  InteractionManager,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base';
import MapView from 'react-native-maps';


export default class Gmap extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { width, height } = Dimensions.get('window');
    const ratio = width / height;

    const coordinates = {
      latitude: -33.8885795,
      longitude: 151.1851586,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0922 * ratio,
    }; 

    return ( 
      <Container>
        <Header>
          <Title>Map</Title>          
        </Header>

         <Content scrollEnabled={false}>
          <View style={{ width, height }}>
            {this.state.loading ? (
              <Loading />
            ) : (
              <MapView
                style={styles.map}
                initialRegion={coordinates}
              />
            )}
          </View>
        </Content>

        <Footer>
          <FooterTab>
            <Button transparent>
             <Text> Maps</Text> 
            </Button>
          </FooterTab>
        </Footer>
      </Container> 
    );
  }
}

const Loading = () => (
  <View style={styles.container}>
    <Text>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    marginTop: 1.5,
    ...StyleSheet.absoluteFillObject,
  },
});