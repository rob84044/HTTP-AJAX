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
  DropdownItem
} from 'reactstrap';

export default class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friend: {
        name: '',
        age: '',
        email: ''
      }
    };
  }
  render() {
    return (
      <Form onSubmit={this.props.handleFriendSubmit}>
        <Modal
          isOpen={this.props.addModal}
          toggle={this.props.addToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.addToggle}>
            Don't be lonely! Add a friend.
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                onChange={this.props.friendChangeHandler}
                value={this.props.friend.name}
                placeholder="Whats their name?"
              />
            </FormGroup>
            <FormGroup>
              <Label for="age">Age</Label>
              <Input
                type="number"
                name="age"
                id="age"
                onChange={this.props.friendChangeHandler}
                value={this.props.friend.age}
                placeholder="Whats their age?"
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                onChange={this.props.friendChangeHandler}
                value={this.props.friend.email}
                placeholder="Whats their email?"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.handleFriendSubmit}>
              Add a friend
            </Button>{' '}
            <Button color="secondary" onClick={this.props.addToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Form>
    );
  }
}
