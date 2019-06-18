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
import AddForm from '../src/components/AddForm';
import UpdateForm from '../src/components/UpdateForm';
import DeleteForm from '../src/components/DeleteForm';
class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
      errorMessage: '',
      updateModal: false,
      deleteModal: false,
      addModal: false,
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

  updateFriend = (e, friend) => {
    axios
      .put(`http://localhost:5000/friends/${friend.id}`, friend)
      .then(res => {
        this.setState({ friends: res.data });

        this.updateToggle();

        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  deleteFriend = (e, friend) => {
    axios
      .delete(`http://localhost:5000/friends/${friend.id}`)
      .then(res => {
        this.setState({ friends: res.data });
        this.deleteToggle();
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
      friend: {
        name: '',
        age: '',
        email: ''
      },
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

          <AddForm
            addModal={this.state.addModal}
            addToggle={this.addToggle}
            handleFriendSubmit={this.handleFriendSubmit}
            friendChangeHandler={this.friendChangeHandler}
            friend={this.state.friend}
          />

          {/* Update a Friend Modal */}
          <UpdateForm
            updateModal={this.state.updateModal}
            updateToggle={this.updateToggle}
            handleFriendSubmit={this.handleFriendSubmit}
            friendChangeHandler={this.friendChangeHandler}
            friend={this.state.friend}
            friends={this.state.friends}
            updateFriend={this.updateFriend}
          />
          {/* Delete a Friend Modal */}
          <DeleteForm
            deleteModal={this.state.deleteModal}
            deleteToggle={this.deleteToggle}
            handleFriendSubmit={this.handleFriendSubmit}
            friendChangeHandler={this.friendChangeHandler}
            friend={this.state.friend}
            friends={this.state.friends}
            deleteFriend={this.deleteFriend}
          />
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
