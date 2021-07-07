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

export default class UpdateForm extends React.Component {
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
          isOpen={this.props.updateModal}
          toggle={this.props.updateToggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.updateToggle}>
            Your friend is morphing!
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
            <FormGroup row>
              <Label sm={2} for="name" placeholder="Name">
                Name:
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={this.state.friend.name}
                  onChange={this.inputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} for="age" placeholder="Age">
                Age:
              </Label>
              <Col sm={10}>
                <Input
                  type="number"
                  name="age"
                  id="age"
                  value={this.state.friend.age}
                  onChange={this.inputChange}
                >
                  {/*PlaceHolder*/}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} for="email" placeholder="Email">
                Email:
              </Label>
              <Col sm={10}>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={this.state.friend.email}
                  onChange={this.inputChange}
                >
                  {/*PlaceHolder*/}
                </Input>
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={e => {
                this.props.updateFriend(e, this.state.friend);
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
              Update
            </Button>{' '}
            <Button color="secondary" onClick={this.props.updateToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Form>
    );
  }
}
