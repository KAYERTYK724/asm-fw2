import React from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

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
          loading="lazy"
        ></iframe>
      </div>

      <Container>
        <Row className="g-4">
          
          {/* LEFT */}
          <Col lg={5}>
            <div className="contact-info">
              <p className="tag">THÔNG TIN</p>

              <h2>
                <i className="bi bi-envelope-paper me-2"></i>
                Liên hệ với chúng tôi
              </h2>

              <p className="desc">
                Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy để lại thông tin để được tư vấn nhanh nhất.
              </p>

              <div className="info-box">
                <h4>
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  Việt Nam
                </h4>

                <p>
                  <i className="bi bi-house-door me-2"></i>
                  Đ. Số 22, Thường Thạnh, Cái Răng, Cần Thơ
                </p>

                <p>
                  <i className="bi bi-telephone me-2"></i>
                  0962896153
                </p>
              </div>
            </div>
          </Col>

          {/* RIGHT */}
          <Col lg={7}>
            <div className="contact-form">
              <Form onSubmit={handleSubmit(onSubmit)}>

                {/* ROW 1 */}
                <Row className="mb-3 g-3">
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
                    {errors.name && <small className="text-danger">{errors.name.message}</small>}
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
                    {errors.email && <small className="text-danger">{errors.email.message}</small>}
                  </Col>
                </Row>

                {/* ROW 2 */}
                <Row className="mb-3 g-3">
                  <Col md={6}>
                    <Form.Control
                      placeholder="Số điện thoại"
                      {...register("phone", {
                        required: "Vui lòng nhập số điện thoại",
                        pattern: {
                          value: /^[0-9]{9,11}$/,
                          message: "SĐT không hợp lệ",
                        },
                      })}
                    />
                    {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
                  </Col>

                  <Col md={6}>
                    <Form.Control
                      placeholder="Địa chỉ"
                      {...register("address", {
                        required: "Vui lòng nhập địa chỉ",
                      })}
                    />
                    {errors.address && <small className="text-danger">{errors.address.message}</small>}
                  </Col>
                </Row>

                {/* SUBJECT */}
                <Form.Group className="mb-3">
                  <Form.Control
                    placeholder="Tiêu đề liên hệ"
                    {...register("subject", {
                      required: "Vui lòng nhập tiêu đề",
                    })}
                  />
                  {errors.subject && <small className="text-danger">{errors.subject.message}</small>}
                </Form.Group>

                {/* MESSAGE */}
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
                  {errors.message && <small className="text-danger">{errors.message.message}</small>}
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100">
                  <i className="bi bi-send me-2"></i>
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