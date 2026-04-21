/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import { FaSave, FaBoxOpen } from "react-icons/fa";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams, useNavigate } from 'react-router-dom';
import UploadImage from '../../../../middlewares/cloude';
import '../style.css'; 
import requestAPI from '../../../../RequestAPI';


const AddProduct = () => {
    const { register, handleSubmit, formState: { errors }, watch, setValue, getValues, control} = useForm({
        defaultValues: {
            description: ""
        }
    });
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await requestAPI({
                    method: "GET",
                    url: "/categories/list" 
                });

                // Log để kiểm tra: console.log("Full Res:", res);
                
                // Lấy mảng từ thuộc tính 'data' bên trong response body
                const categoryArray = res?.data?.data || []; 
                
                setCategories(categoryArray);
            } catch (error) {
                console.error("Lỗi lấy danh mục:", error);
                setCategories([]); 
            }
        };
        fetchCategories();
    }, []);

    const onRegister = async (data) => {
        try {
            const newProduct = {
                name: data.name,
                image: data.image, // map lại
                price: Number(data.price),
                sale_price: Number(data.sale_price) || 0,
                category_id: Number(data.category), // quan trọng
                status: Number(data.status),
                description: data.description
            };

            const res = await requestAPI({
                method: "POST",
                url: "/products/add",
                data: newProduct
            });

            console.log("Thêm thành công:", res.data);
            alert("Thêm sản phẩm thành công!");
            navigate('/admin/productAdmin');
        } catch (error) {
            console.log("Lỗi:", error);
        }
    };
    
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
                                <Form.Label className="text-white">Hình ảnh</Form.Label>

                                <UploadImage 
                                    onUploaded={(url) => setValue("image", url)}
                                />

                                {errors.image && (
                                    <small className="text-danger">{errors.image.message}</small>
                                )}
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
                                    {...register('sale_price', {
                                        validate: (value) => {
                                            const price = Number(watch('price')); 
                                            const sale = Number(value);
                                            if (!value) return true;
                                            if (sale >= price) {
                                                return 'Giá khuyến mãi phải nhỏ hơn giá bán!';
                                            }
                                            return true;
                                        }
                                    })}
                                />
                                {errors.sale_price && 
                                    <small className="text-danger">
                                        {errors.sale_price.message}
                                    </small>
                                }
                            </Form.Group>
                        </Col>

                        {/* Danh mục */}
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Danh mục</Form.Label>
                                <Form.Select 
                                    className="bg-dark text-white border-0"
                                    {...register('category', { required: 'Vui lòng chọn danh mục!' })} // Đổi thành 'category'
                                >
                                    <option value="">Chọn loại...</option>
                                    {Array.isArray(categories) && categories.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Form.Select>
                                {errors.category && <small className="text-danger">{errors.category.message}</small>}
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

                                <Controller
                                    name="description"
                                    control={control}
                                    rules={{
                                        required: "Mô tả không được bỏ trống!",
                                        minLength: {
                                            value: 20,
                                            message: "Mô tả nên chi tiết hơn (trên 20 ký tự)"
                                        }
                                    }}
                                    render={({ field }) => (
                                        <div className="ck-editor-wrapper"> 
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data=""
                                                config={{
                                                    licenseKey: 'GPL'
                                                }}
                                                onChange={(event, editor) => {
                                                    field.onChange(editor.getData());
                                                }}
                                            />
                                        </div>
                                    )}
                                />

                                {errors.description && (
                                    <small className="text-danger d-block mt-1">
                                        {errors.description.message}
                                    </small>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex gap-2">
                        <Button variant="success" className="rounded-pill px-5 fw-bold shadow-sm" type="submit">
                            <FaSave className="me-2" /> XÁC NHẬN THÊM
                        </Button>
                        <Button variant="outline-light" className="rounded-pill px-4" type='reset'>
                            Hủy bỏ
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default AddProduct;