/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaHeart, FaCode } from 'react-icons/fa';

const FooterAdmin = () => {
    return (
        <Container fluid className="pt-4 px-4">
            <div className="footer-admin rounded-top p-4">
                <Row className="align-items-center">
                    <Col xs={12} sm={6} className="text-center text-sm-start mb-2 mb-sm-0">
                        <span className="text-muted">
                            &copy; {new Date().getFullYear()}{' '}
                            <a href="#" className="text-primary text-decoration-none fw-semibold">DarkPan</a>
                            {' '}— All rights reserved.
                        </span>
                    </Col>
                    <Col xs={12} sm={6} className="text-center text-sm-end">
                        <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                            <FaCode className="me-1 text-primary" />
                            Designed by{' '}
                            <a href="#" className="text-primary text-decoration-none">HTML Codex</a>
                            {' · '}
                            <FaHeart className="mx-1 text-danger" style={{ fontSize: '0.75rem' }} />
                            Built by{' '}
                            <a href="#" className="text-primary text-decoration-none">ThemeWagon</a>
                        </span>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default FooterAdmin;