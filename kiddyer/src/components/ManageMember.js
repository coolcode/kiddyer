import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Form, Thumbnail, Input, Left, Body, Right, Button, Text, View, Spinner, ListItem, Icon } from 'native-base';
import { loadData2, deleteMember } from '../actions';
import { Actions } from 'react-native-router-flux';

class ManageMember extends Component {

  componentWillMount() {
    //dispatch({ type: CREATE_MEMBERGROUP });

    console.log(this.props);
    const { id } = this.props;
    console.log(`load group key: ${id}`);
    this.props.loadData2(id);
  }

  onButtonPress(index) {
    this.props.deleteMember(this.props.id, index);
  }

  renderDelete(isDelete, index) {
    if (isDelete) {
      return (
        <Button
          style={{ marginBottom: 5 }}
          danger
          transparent
          onPress={() => this.onButtonPress(index)}
        >
          <Icon name="trash" />
        </Button>
    );
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <FlatList
            data={this.props.members}
            renderItem={({ item: rowData, index }) => {
              if (rowData) {
              return (
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={require('../assets/img/child.png') } />
                  </Left>
                  <Body>
                    <Text>{rowData.email}</Text>
                  </Body>
                  <Right style={{ borderColor: 'transparent' }}>
                    <Button
                      transparent
                      block
                      onPress={()=> Actions.locationHistoryToMap({uid:rowData.uid})}
                    >
                        <Icon name="map" />
                    </Button>
                  </Right>
                  <Right style={{ borderColor: 'transparent' }}>
                    {this.renderDelete(this.props.deleteAuth, index)}
                  </Right>
                </ListItem>
              );
            }
            }}
            keyExtractor={(item, index) => index}
          />
        </Content>
      </Container>
    );
  }
}


// mapStateToProps 完成了 reducer state 到 component props，为了链接对应的action，使用connect 链接reducer state 和 actions
const mapStateToProps = state => {
  return {
    groupName: state.famy.groupName,
    groupCode: state.famy.groupCode,
    members: state.famy.members,
    //groupCode: state.famy.groupCode
  };
};

export default connect(mapStateToProps, { loadData2, deleteMember })(ManageMember);
