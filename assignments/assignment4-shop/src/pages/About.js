import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 mb-4">About Steep & Bloom Co.</h1>
          <p className="lead mb-4">
            We're passionate about bringing exceptional coffee experiences to enthusiasts who appreciate quality beans and brewing tools.
          </p>
          <hr className="my-4" />
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={6} className="mb-4 mb-lg-0">
          <h2 className="mb-4">Our Story</h2>
          <p>
            Founded in 2020, Steep & Bloom Co. began with a simple mission: to make specialty coffee more accessible without compromising on quality or sustainability.
          </p>
          <p>
            Our founders, avid coffee enthusiasts themselves, noticed a gap in the market for thoughtfully sourced beans paired with well-designed brewing equipment that would help people create café-quality coffee at home.
          </p>
          <p>
            What started as a small operation has grown into a community of coffee lovers who share our passion for the perfect brew. We work directly with farmers across the globe to ensure fair practices and exceptional quality in every bean we sell.
          </p>
        </Col>
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <Image 
                src="https://images.unsplash.com/photo-1611653403437-9613069fa799?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Coffee beans"
                fluid 
                rounded
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="mb-4 text-center">Our Values</h2>
        </Col>
      </Row>

      <Row className="mb-5 g-4">
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <i className="bi bi-award fs-1 text-primary"></i>
              </div>
              <Card.Title>Quality</Card.Title>
              <Card.Text>
                We never compromise on quality. From bean selection to brewing equipment, everything we offer is tested and approved by our team of coffee experts.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <i className="bi bi-globe fs-1 text-primary"></i>
              </div>
              <Card.Title>Sustainability</Card.Title>
              <Card.Text>
                We're committed to sustainable practices throughout our supply chain, from supporting environmentally conscious farming to using eco-friendly packaging.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div className="mb-3">
                <i className="bi bi-people fs-1 text-primary"></i>
              </div>
              <Card.Title>Community</Card.Title>
              <Card.Text>
                We believe in building relationships with our customers, suppliers, and the communities where our coffee is grown. Your purchase helps support fair wages for farmers.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={8} className="mx-auto text-center">
          <h2 className="mb-4">Meet Our Team</h2>
          <p className="mb-5">
            Our dedicated team of coffee experts, roasters, and customer service specialists work together to ensure you have the best possible experience with Steep & Bloom Co.
          </p>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-5">
              <Image 
                src="https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Our team" 
                roundedCircle 
                className="mb-4"
                width={150}
                height={150}
              />
              <h4>The Steep & Bloom Team</h4>
              <p className="text-muted mb-0">
                "We're united by our love for exceptional coffee and our desire to share that passion with you."
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default About;