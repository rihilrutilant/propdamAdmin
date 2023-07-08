import React, { useState } from 'react';
import { Form, FormGroup, FormControl, FormLabel, Button, TextArea, Row, Col } from 'react-bootstrap';


const EditApproval = () => {
    let oldname = 'JohnDoe';
    let oldDes = "dsfrbg difjgi jdnfjnrg ndjlgnkrrng ndnkdngfmnvjfjnbnd";
    let oldCity = ['Delhi','mumbai'];
    let p_type = "residentials"
    const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'input1':
        setInput1(value);
        break;
      case 'input2':
        setInput2(value);
        break;
      case 'input3':
        setInput3(value);
        break;
      case 'input4':
        setInput4(value);
        break;
      default:
        break;
    }
  };
  return (
    <div>
        <div className="container">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form>
          <FormGroup>
              <FormLabel>Old name</FormLabel>
              <FormControl
                name="JohnDoe"
                value='JohnDoe'
                onChange={handleChange}
                disabled={true}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>New name</FormLabel>
              <FormControl
                name="input1"
                value={input1}
                onChange={handleChange}
                disabled={false}
              />
            </FormGroup>


            <FormGroup>
              <FormLabel>Property type</FormLabel>
              <FormControl
                name="input2"
                value={p_type}
                onChange={handleChange}
                disabled={true}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>New type</FormLabel>
              <FormControl
                name="input2"
                value={input2}
                onChange={handleChange}
                disabled={false}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Old Description</FormLabel>
              <FormControl
                as="textarea"
                name="textarea2"
                value={oldDes}
                onChange={handleChange}
                disabled={true}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>New Description</FormLabel>
              <FormControl
                as = "textarea"
                onChange={handleChange}
                disabled={false}
              />
            </FormGroup>


            <Button type="submit" style={{marginTop : '20px'}}>Submit</Button>
          </Form>
        </Col>
      </Row>
    </div>
    </div>
  )
}

export default EditApproval