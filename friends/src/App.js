import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { Component } from 'react';
import Friend from '../src/components/Friend';
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

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      errorMessage: '',
      addModal: false,
      updateModal: false,
      deleteModal: false,
      addFriendMessage: '',
      addFriendError: '',
      updateFriendMessage: '',
      updateFriendError: '',
      deleteFriendMessage: '',
      deleteFriendError: '',
      showForm: 'add',
      dropdownOpen: false,
      friend: {
        name: '',
        age: '',
        email: ''
      }
    };

    this.addToggle = this.addToggle.bind(this);
    this.updateToggle = this.updateToggle.bind(this);
    this.deleteToggle = this.deleteToggle.bind(this);

    this.decideButton = this.decideButton.bind(this);
  }

  changeTabs = tab => {
    this.setState({
      showForm: tab,
      addFriendMessage: '',
      addFriendError: '',
      updateFriendMessage: '',
      updateFriendError: '',
      deleteFriendMessage: '',
      deleteFriendError: ''
    });
  };
  decideButton() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  //.post axios call
  addFriend = (e, friend) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/friends', friend)
      .then(res => {
        this.setState({ friends: res.data });
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  addToggle() {
    this.setState(prevState => ({
      addModal: !prevState.addModal
    }));
  }
  updateToggle() {
    this.setState(prevState => ({
      updateModal: !prevState.updateModal
    }));
  }
  deleteToggle() {
    this.setState(prevState => ({
      deleteModal: !prevState.deleteModal
    }));
  }
  componentDidMount() {
    axios
      .get('http://localhost:5000/friends')
      .then(response => this.setState({ friends: response.data }))
      .catch(err => {
        console.log(err);
        this.setState({ errorMessage: 'error getting friends list' });
      });
  }

  friendChangeHandler = e => {
    e.persist();
    let value = e.target.value;

    this.setState(prevState => ({
      friend: {
        ...prevState.friend,
        [e.target.name]: value
      }
    }));
  };

  handleFriendSubmit = e => {
    this.addFriend(e, this.state.friend);
    this.setState(prevState => ({
      name: '',
      age: '',
      email: '',
      addModal: !prevState.addModal
    }));
  };

  render() {
    return (
      <div className="App">
        <div className="addFriend" style={{ paddingTop: '20px' }}>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.decideButton}>
            <DropdownToggle caret>
              What changes would you like to make?
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Choose from the options below</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <Button
                  style={{ width: '100%' }}
                  color="info"
                  onClick={this.addToggle}
                >
                  Add a Friend
                </Button>
              </DropdownItem>
              <DropdownItem>
                <Button
                  style={{ width: '100%' }}
                  color="info"
                  onClick={this.updateToggle}
                >
                  Update a friends info
                </Button>
              </DropdownItem>
              <DropdownItem>
                <Button
                  style={{ width: '100%' }}
                  color="info"
                  onClick={this.deleteToggle}
                >
                  Kill..I mean delete a friend
                </Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {/* Add a Friend Modal */}
          <Form onSubmit={this.handleFriendSubmit}>
            <Modal
              isOpen={this.state.addModal}
              toggle={this.addToggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.addToggle}>
                Don't be lonely! Add a friend.
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    onChange={this.friendChangeHandler}
                    value={this.state.friend.name}
                    placeholder="Whats their name?"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="age">Age</Label>
                  <Input
                    type="number"
                    name="age"
                    id="age"
                    onChange={this.friendChangeHandler}
                    value={this.state.friend.age}
                    placeholder="Whats their age?"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    onChange={this.friendChangeHandler}
                    value={this.state.friend.email}
                    placeholder="Whats their email?"
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.handleFriendSubmit}>
                  Add a friend
                </Button>{' '}
                <Button color="secondary" onClick={this.addToggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Form>
          {/* Update a Friend Modal */}
          <Form>
            <Modal
              isOpen={this.state.updateModal}
              toggle={this.updateToggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.updateToggle}>
                Your friend is morphing!
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Whats their name?"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="age">Age</Label>
                  <Input
                    type="number"
                    name="age"
                    id="age"
                    placeholder="Whats their age?"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Whats their email?"
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.updateToggle}>
                  Do Something
                </Button>{' '}
                <Button color="secondary" onClick={this.updateToggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Form>
          {/* Delete a Friend Modal */}
          <Form>
            <Modal
              isOpen={this.state.deleteModal}
              toggle={this.deleteToggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.deleteToggle}>
                You don't need them anyways!
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Whats their name?"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="age">Age</Label>
                  <Input
                    type="number"
                    name="age"
                    id="age"
                    placeholder="Whats their age?"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Whats their email?"
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.deleteToggle}>
                  Do Something
                </Button>{' '}
                <Button color="secondary" onClick={this.deleteToggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Form>
        </div>
        {this.state.friends.map(friend => (
          <div key={friend.id} className="friend-Parent-Container">
            <Friend key={friend.id} friend={friend} />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
