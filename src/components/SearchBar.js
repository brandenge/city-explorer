import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

class SearchBar extends React.Component {
  render() {
    return (
      <Form className='form' onSubmit={this.props.handleSubmit}>
        <InputGroup className='input' size='lg'>
          <InputGroup.Text id="inputGroup-sizing-lg">
            Enter the name of a U.S. city:
          </InputGroup.Text>
          <Form.Control onInput={this.props.handleInput}/>
        </InputGroup>
        <Button className='button' variant='outline-secondary' id='button-addon2' type='submit'>
          Explore!
        </Button>
      </Form>
    );
  }
}

export default SearchBar;
