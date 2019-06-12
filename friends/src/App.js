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
  ModalFooter
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      errorMessage: '',
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
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

  render() {
    return (
      <div className="App">
        <div className="addFriend" style={{ paddingTop: '20px' }}>
          <Form>
            Would you like to add a friend?{' '}
            <Button outline color="info" onClick={this.toggle}>
              Yes, I am lonely!
            </Button>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggle}>
                Don't be lonely! Add a friend.
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
                <Button color="primary" onClick={this.toggle}>
                  Do Something
                </Button>{' '}
                <Button color="secondary" onClick={this.toggle}>
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
