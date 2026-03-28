/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import '../style.css'; 

const AddCategory = () => {
    const {register, handleSubmit, formState : {errors}, watch, setValue, getValues} = useForm();

    const onRegister = (data) => {
        console.log(data);
    }

    return (
        <Container fluid className="pt-4 px-4">
            <div className="bg-secondary rounded p-4">
                <h4 className="mb-4 text-white fw-bold">THÊM DANH MỤC</h4>
                <Form onSubmit={handleSubmit(onRegister)}>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Tên danh mục</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Nhập tên danh mục..." 
                                className="bg-dark text-white border-0" 
                                {...register('name',
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
                            {errors.name && (
                                <small className="text-danger">{errors.name.message}</small>
                            )}
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Danh mục bài viết</Form.Label>
                            <Form.Select 
                                className="bg-dark text-white border-0 shadow-none" 
                                style={{ cursor: 'pointer' }}
                                {...register('categoryId', {
                                    required: {
                                        value: true,
                                        message: 'Vui lòng chọn danh mục!'
                                    }
                                })}
                            >
                                <option value="">-- Chọn danh mục --</option>
                                <option value="1" className="bg-dark">Quần</option>
                                <option value="2" className="bg-dark">Áo</option>
                                <option value="3" className="bg-dark">Áo Khoác</option>
                                <option value="4" className="bg-dark">Phụ kiện</option>
                                <option value="5" className="bg-dark">Giày</option>
                                <option value="6" className="bg-dark">Mùa xuân</option>
                                <option value="7" className="bg-dark">Mùa hè</option>
                                <option value="8" className="bg-dark">Mùa thu</option>
                                <option value="9" className="bg-dark">Mùa đông</option>
                                <option value="10" className="bg-dark">Phong cách</option>
                            </Form.Select>

                            {errors.categoryId && (
                                <small className="text-danger mt-1 d-block">
                                    {errors.categoryId.message}
                                </small>
                            )}
                        </Form.Group>
                    </Col>

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

export default AddCategory;