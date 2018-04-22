import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Button, Text, View, Spinner } from 'native-base';
import { groupNameChanged, createMemberGroup } from '../actions';

class InviteMember extends Component {
 
  onGroupNameChange(text){
    this.props.groupNameChanged(text);
  }

  onButtonPress() { 
    const { key, groupName } = this.props;
    this.props.createMemberGroup({ key, groupName });
  }
 
  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner color='blue' />;
    }
    return (
      <Button
        block style={{ marginTop: 10 }}
        onPress={this.onButtonPress.bind(this)}
      >
          <Text> Save </Text>
      </Button>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Input
                placeholder="Group Name" 
                autoCapitalize="none"
                onChangeText={this.onGroupNameChange.bind(this)}
                value={this.props.groupName}
              />
            </Item> 
            <Form>
              <Item style={{ height: 50 }}>
                <Text>Join Key: {this.props.key}</Text>
              </Item> 
            </Form>
          </Form>
          {this.renderError()}
          {this.renderButton()}
        </Content>
      </Container>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'red',
  }
};

// mapStateToProps 完成了 reducer state 到 component props，为了链接对应的action，使用connect 链接reducer state 和 actions
const mapStateToProps = state => {
  return {
    groupName: state.famy.groupName,
    key: state.famy.key
  };
};

export default connect(mapStateToProps, { groupNameChanged, createMemberGroup })(InviteMember);
