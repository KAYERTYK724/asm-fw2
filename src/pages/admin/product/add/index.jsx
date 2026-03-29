/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { FaSave, FaBoxOpen } from "react-icons/fa";
import '../style.css'; 

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors }, watch, setValue, getValues } = useForm();

    const onRegister = (data) => {
        console.log(data);
    }

    return (
        <Container fluid className="pt-4 px-4">
            <div className="bg-secondary rounded p-4 shadow-sm">
                <h4 className="mb-4 text-white fw-bold d-flex align-items-center">
                    <FaBoxOpen className="me-2 text-danger-custom" /> THÊM SẢN PHẨM MỚI
                </h4>
                
                <Form onSubmit={handleSubmit(onRegister)}>
                    <Row>
                        {/* Tên sản phẩm */}
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Tên sản phẩm</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Ví dụ: Áo khoác Biker Piqué..." 
                                    className="bg-dark text-white border-0" 
                                    {...register('name', {
                                        required: 'Tên sản phẩm không được bỏ trống!',
                                        minLength: { 
                                            value: 5, 
                                            message: 'Tên sản phẩm phải trên 5 ký tự!' 
                                        }
                                    })}
                                />
                                {errors.name && 
                                    <small className="text-danger">{errors.name.message}</small>
                                }
                            </Form.Group>
                        </Col>

                        {/* Hình ảnh sản phẩm */}
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Hình ảnh (URL)</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Dán link hình ảnh sản phẩm..." 
                                    className="bg-dark text-white border-0" 
                                    {...register('img', { 
                                        required: 'Vui lòng cung cấp link ảnh!' 
                                    })}
                                />
                                {errors.img && 
                                    <small className="text-danger">{errors.img.message}</small>
                                }
                            </Form.Group>
                        </Col>

                        {/* Giá gốc */}
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Giá bán ($)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    step="0.01"
                                    placeholder="0.00" 
                                    className="bg-dark text-white border-0" 
                                    {...register('price', { 
                                        required: 'Giá không được để trống!',
                                        min: { 
                                            value: 0.01, 
                                            message: 'Giá phải lớn hơn 0!' 
                                        }
                                    })}
                                />
                                {errors.price && 
                                    <small className="text-danger">{errors.price.message}</small>
                                }
                            </Form.Group>
                        </Col>

                        {/* Giá giảm */}
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Giá khuyến mãi ($)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    step="0.01"
                                    placeholder="Để trống nếu không giảm giá" 
                                    className="bg-dark text-white border-0" 
                                    {...register('sale_price')}
                                />
                            </Form.Group>
                        </Col>

                        {/* Danh mục */}
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Danh mục</Form.Label>
                                <Form.Select 
                                    className="bg-dark text-white border-0 select-custom"
                                    {...register('category', { 
                                        required: 'Vui lòng chọn danh mục!' 
                                    })}
                                >
                                    <option value="">Chọn loại...</option>
                                    <option value="Áo khoác">Áo khoác</option>
                                    <option value="Phụ kiện">Phụ kiện</option>
                                    <option value="Giày dép">Giày dép</option>
                                    <option value="Áo thun">Áo thun</option>
                                </Form.Select>
                                {errors.category && 
                                    <small className="text-danger">{errors.category.message}</small>
                                }
                            </Form.Group>
                        </Col>

                        {/* Trạng thái sản phẩm */}
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white d-block">Trạng thái kho hàng</Form.Label>
                                <div className="d-flex gap-4">
                                    <Form.Check 
                                        type="radio"
                                        label="Còn hàng"
                                        name="status"
                                        value="1"
                                        className="text-white"
                                        {...register('status')}
                                    />
                                    <Form.Check 
                                        type="radio"
                                        label="Hết hàng"
                                        name="status"
                                        value="0"
                                        className="text-white"
                                        {...register('status')}
                                    />
                                </div>
                            </Form.Group>
                        </Col>

                        {/* Mô tả chi tiết */}
                        <Col md={12}>
                            <Form.Group className="mb-4">
                                <Form.Label className="text-white">Mô tả sản phẩm</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={4} 
                                    placeholder="Nhập thông tin chi tiết về sản phẩm..."
                                    className="bg-dark text-white border-0" 
                                    {...register('description', {
                                        required: 'Mô tả không được bỏ trống!',
                                        minLength: { 
                                            value: 20, 
                                            message: 'Mô tả nên chi tiết hơn (trên 20 ký tự)' 
                                        }
                                    })}
                                />
                                {errors.description && 
                                    <small className="text-danger">{errors.description.message}</small>
                                }
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex gap-2">
                        <Button variant="success" className="rounded-pill px-5 fw-bold shadow-sm" type="submit">
                            <FaSave className="me-2" /> XÁC NHẬN THÊM
                        </Button>
                        <Button variant="outline-light" className="rounded-pill px-4">
                            Hủy bỏ
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default AddProduct;