import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Form, Thumbnail, Input, Left, Body, Right, Button, Text, View, Spinner, ListItem, Icon } from 'native-base';
import { loadData2, deleteMember } from '../actions';

class ManageMember extends Component {

  componentDidMount() {
    //dispatch({ type: CREATE_MEMBERGROUP });

    console.log(this.props);
    const { id } = this.props;
    console.log(`load group key: ${id}`);
    this.props.loadData2(id);
  }

  onButtonPress(index) {
    this.props.deleteMember(this.props.id, index);
  }

  render() {
    return (
      <Container>
        <Content>
          <FlatList
            data={this.props.members}
            renderItem={({ item: rowData, index }) => {
              return (
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={require('../assets/img/child.png') } />
                  </Left>
                  <Body>
                    <Text>{index}</Text>
                    <Text>{rowData.email}</Text>
                  </Body>
                  <Right>
                    <Button
                      iconLeft danger small
                      onPress={() => this.onButtonPress(index)}
                    >
                      <Icon name="trash" />
                      <Text>Delete</Text>
                    </Button>
                  </Right>
                </ListItem>
              );
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
