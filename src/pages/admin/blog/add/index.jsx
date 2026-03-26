/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import '../style.css'; 

const AddBlog = () => {
    const {register, handleSubmit, formState : {errors}, watch, setValue, getValues} = useForm();

    const onRegister = (data) => {
        console.log(data);
    }

    return (
        <Container fluid className="pt-4 px-4">
            <div className="bg-secondary rounded p-4">
                <h4 className="mb-4 text-white fw-bold">THÊM BÀI VIẾT MỚI</h4>
                <Form onSubmit={handleSubmit(onRegister)}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Tiêu đề bài viết</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Nhập tiêu đề..." 
                                    className="bg-dark text-white border-0" 
                                    {...register('title',
                                        {
                                            required : {
                                                value : true,
                                                message : 'Tiêu đề không được bỏ trống!'
                                            },
                                            minLength : {
                                                value : 15,
                                                message : 'Tiêu đề phải trên 15 ký tự!'
                                            }
                                        }
                                    )}
                                />
                                {errors.title && (
                                    <small className="text-danger">{errors.title.message}</small>
                                )}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Ngày đăng</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    className="bg-dark text-white border-0" 
                                    {...register('date',
                                        {
                                            required : {
                                                value : true,
                                                message : 'Thời gian không được bỏ trống!'
                                            }
                                        }
                                    )}
                                />
                                {errors.date && (
                                    <small className="text-danger">{errors.date.message}</small>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3">
                        <Form.Label className="text-white">Hình ảnh (URL)</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Dán link hình ảnh..." 
                            className="bg-dark text-white border-0" 
                            {...register('image',
                                {
                                    required : {
                                        value : true,
                                        message : 'Hình ảnh không được bỏ trống!'
                                    }
                                }
                            )}
                        />
                        {errors.image && (
                            <small className="text-danger">{errors.image.message}</small>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="text-white">Nội dung chi tiết</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={6} 
                            className="bg-dark text-white border-0" 
                            {...register('content',
                                {
                                    required : {
                                        value : true,
                                        message : 'Nội dung không được bỏ trống!'
                                    },
                                    minLength : {
                                        value : 100,
                                        message : 'Tiêu đề phải trên 100 ký tự!'
                                    }
                                }
                            )}
                        />
                        {errors.content && (
                            <small className="text-danger">{errors.content.message}</small>
                        )}
                    </Form.Group>

                    <div className="d-flex gap-2">
                        <Button variant="success" className="rounded-pill px-4" type="submit">
                            <FaSave /> Lưu bài viết
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default AddBlog;