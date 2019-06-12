import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle,
  CardHeader
} from 'reactstrap';

const Friend = props => {
  const { name, age, email } = props.friend;

  return (
    <div
      className="friend-Container"
      style={{ margin: '20px', borderRadius: '20px' }}
    >
      <Card
        style={{ width: '85%', margin: '0 auto', borderRadius: '20px' }}
        outline
        color="danger"
      >
        <CardHeader style={{ borderRadius: '20px' }}>
          <Card
            Body
            className="text-center"
            outline
            color="warning"
            style={{ borderRadius: '15px' }}
          >
            <CardTitle style={{ verticalAlign: 'middle', paddingTop: '10px' }}>
              This is one of my Friends, their name is {name}
            </CardTitle>
          </Card>
        </CardHeader>
        <div className="inside-cont">
          <div
            className="age"
            style={{
              width: '30%',
              display: 'inline-block',
              verticalAlign: 'middle',
              paddingRight: '10px'
            }}
          >
            They are {age}'yrs old today
          </div>

          <div
            className="email"
            style={{
              fontSize: '15px',
              borderRadius: '20px',
              width: '60%',
              display: 'inline-block',
              verticalAlign: 'middle'
            }}
          >
            I signed them up for spam-emails using this email "{email}"
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Friend;
