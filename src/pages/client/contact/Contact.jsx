import React from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="contact-page">

      {/* MAP */}
      <div className="map mb-4">
        <iframe
          src="https://www.google.com/maps?q=Vietnam&output=embed"
          title="map"
          width="100%"
          height="400"
        ></iframe>
      </div>

      <Container>
        <Row>
          {/* LEFT */}
          <Col lg={5}>
            <div className="contact-info">
              <p className="tag">THÔNG TIN</p>
              <h2>Liên hệ với chúng tôi</h2>
              <p className="desc">
                Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy để lại thông tin để được tư vấn nhanh nhất.
              </p>

              <div className="info-box">
                <h4>Việt Nam</h4>
                <p>123 Nguyễn Văn A, TP.HCM</p>
                <p>+84 123 456 789</p>
              </div>

              <div className="info-box">
                <h4>Pháp</h4>
                <p>109 Avenue Léon</p>
                <p>+33 123 456 789</p>
              </div>
            </div>
          </Col>

          {/* RIGHT */}
          <Col lg={7}>
            <div className="contact-form">
              <Form onSubmit={handleSubmit(onSubmit)}>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Control
                      placeholder="Họ và tên"
                      {...register("name", {
                        required: "Vui lòng nhập họ tên",
                        minLength: {
                          value: 3,
                          message: "Tên phải >= 3 ký tự",
                        },
                      })}
                    />
                    {errors.name && (
                      <small className="text-danger">
                        {errors.name.message}
                      </small>
                    )}
                  </Col>

                  <Col md={6}>
                    <Form.Control
                      placeholder="Email"
                      {...register("email", {
                        required: "Vui lòng nhập email",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Email không hợp lệ",
                        },
                      })}
                    />
                    {errors.email && (
                      <small className="text-danger">
                        {errors.email.message}
                      </small>
                    )}
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Nội dung..."
                    {...register("message", {
                      required: "Vui lòng nhập nội dung",
                      minLength: {
                        value: 10,
                        message: "Ít nhất 10 ký tự",
                      },
                    })}
                  />
                  {errors.message && (
                    <small className="text-danger">
                      {errors.message.message}
                    </small>
                  )}
                </Form.Group>

                <Button variant="dark" type="submit">
                  GỬI TIN NHẮN
                </Button>

              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;