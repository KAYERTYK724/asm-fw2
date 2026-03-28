/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FooterAdmin = () => {
    return (
        <Container fluid className="pt-4 px-4">
            <div className="bg-secondary rounded-top p-4">
                <Row>
                    <Col xs={12} sm={6} className="text-center text-sm-start text-light">
                        &copy; <a href="#" className="text-primary text-decoration-none">DarkPan</a>, Bảo lưu mọi quyền.
                    </Col>
                    <Col xs={12} sm={6} className="text-center text-sm-end text-light">
                        Thiết kế bởi <a href="#" className="text-primary text-decoration-none">HTML Codex</a>
                        <br />Phát triển bởi: <a href="#" className="text-primary text-decoration-none">ThemeWagon</a>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default FooterAdmin;