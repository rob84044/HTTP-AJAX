import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle
} from 'reactstrap';

export default class FriendForm extends Component {
  constructor() {
    super();
    this.state = {
      //Placeholder
    };
  }
  render() {
    return (
      <div className="FriendForm">
        <Card>
          <CardBody>
            <CardTitle>This is one of my Friends</CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}
