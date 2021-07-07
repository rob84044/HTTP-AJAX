import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Col
} from 'reactstrap';

export default class DeleteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friend: {
        name: '',
        age: '',
        email: '',
        id: ''
      }
    };
  }
  select = e => {
    const name = e.target.value;
    const updateMe = this.props.friends.find(friend => friend.name === name);
    this.setState({ friend: updateMe });
  };
  inputChange = e => {
    e.persist();
    console.log(e.target.value);
    this.setState(prevState => ({
      friend: {
        ...prevState.friend,
        [e.target.name]: e.target.value
      }
    }));
  };
  render() {
    console.log(this.props);
    return (
      <Form onSubmit={this.props.handleFriendSubmit}>
        <Modal
          isOpen={this.props.deleteModal}
          toggle={this.props.deleteToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.deleteToggle}>
            You don't need them anyways!
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="chooseFriend">Select a friend</Label>
              <Input
                type="select"
                name="select"
                id="chooseFriend"
                onChange={this.select}
              >
                {this.props.friends.map(friend => {
                  return (
                    <option
                      onChange={this.select}
                      data-id={friend.id}
                      key={friend.id}
                    >
                      {friend.name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={e => {
                this.props.deleteFriend(e, this.state.friend);
                this.setState({
                  friend: {
                    name: '',
                    age: '',
                    email: '',
                    id: ''
                  }
                });
              }}
            >
              Delete
            </Button>{' '}
            <Button color="secondary" onClick={this.props.deleteToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Form>
    );
  }
}
