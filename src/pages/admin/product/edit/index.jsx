/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import { FaSave, FaEdit } from "react-icons/fa"; // Đổi icon
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams, useNavigate } from 'react-router-dom'; // Thêm hook điều hướng
import UploadImage from '../../../../middlewares/cloude';
import '../style.css'; 
import requestAPI from "../../../../RequestAPI"; 

const EditProduct = () => {
    const { id } = useParams(); // Lấy ID sản phẩm từ URL
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [previewImage, setPreviewImage] = useState("");
    
    const { register, handleSubmit, formState: { errors }, reset, control,setValue, getValues } = useForm();

    // 1. Fetch danh mục và dữ liệu sản phẩm cũ
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy danh sách category
                const catRes = await requestAPI({ method: "GET", url: "/categories/list" });
                setCategories(catRes?.data?.data || []);

                // Lấy dữ liệu sản phẩm theo ID
                const prodRes = await requestAPI({ method: "GET", url: `/products/${id}` });
                const product = prodRes.data.data;

                // Đổ dữ liệu vào Form
                reset({
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    sale_price: product.sale_price,
                    category: product.category_id, // Map ID vào select
                    status: String(product.status), // Radio cần string
                    description: product.description
                });
                setPreviewImage(product.image);
            } catch (error) {
                console.error("Lỗi fetch dữ liệu:", error);
                alert("Không tìm thấy sản phẩm!");
            }
        };
        fetchData();
    }, [id, reset]);

    // 2. Xử lý Update
    const onUpdate = async (data) => {
        try {
            const updatedProduct = {
                name: data.name,
                image: data.image,
                price: Number(data.price),
                sale_price: Number(data.sale_price) || 0,
                category_id: Number(data.category),
                status: Number(data.status),
                description: data.description
            };

            await requestAPI({
                method: "PUT", // Sử dụng phương thức PUT để cập nhật
                url: `/products/${id}`,
                data: updatedProduct
            });

            alert("Cập nhật sản phẩm thành công!");
            navigate('/admin/productAdmin'); // Chuyển hướng sau khi xong
        } catch (error) {
            console.log("Lỗi cập nhật:", error);
            alert("Cập nhật thất bại!");
        }
    };

    return (
        <Container fluid className="pt-4 px-4">
            <div className="bg-secondary rounded p-4 shadow-sm">
                <h4 className="mb-4 text-white fw-bold d-flex align-items-center">
                    <FaEdit className="me-2 text-warning" /> CẬP NHẬT SẢN PHẨM (ID: {id})
                </h4>
                
                <Form onSubmit={handleSubmit(onUpdate)}>
                    <Row>
                        {/* Tên sản phẩm */}
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Tên sản phẩm</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    className="bg-dark text-white border-0" 
                                    {...register('name', { required: 'Tên không được trống' })}
                                />
                                {errors.name && <small className="text-danger">{errors.name.message}</small>}
                            </Form.Group>
                        </Col>

                        {/* Hình ảnh */}
                        <Col md={12}>
                            <Form.Label className="text-white">Hình ảnh</Form.Label>
                                {previewImage && (
                                    <div className="mb-2">
                                        <img
                                            src={previewImage}
                                            alt="preview"
                                            style={{
                                                width: 120,
                                                height: 120,
                                                objectFit: "cover",
                                                borderRadius: 8
                                            }}
                                        />
                                    </div>
                                )}

                                <UploadImage
                                    onUploaded={(url) => {
                                        setValue("image", url);      
                                        setPreviewImage(url);       
                                    }}
                                />
                                <input
                                    type="hidden"
                                    {...register("image", { required: "Ảnh không được trống" })}
                                />

                                {errors.image && (
                                    <small className="text-danger">{errors.image.message}</small>
                                )}
                        </Col>

                        {/* Giá và Danh mục */}
                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Giá bán ($)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    step="0.01"
                                    className="bg-dark text-white border-0" 
                                    {...register('price', { required: 'Giá không được trống' })}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Giá khuyến mãi ($)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    step="0.01"
                                    className="bg-dark text-white border-0" 
                                    {...register('sale_price', {
                                        validate: (value) => {
                                            const price = Number(getValues("price"));
                                            const sale = Number(value);
                                            if (!value) return true;
                                            if (sale >= price) {
                                                return "Giá khuyến mãi phải nhỏ hơn giá bán!";
                                            }
                                            return true;
                                        }
                                    })}
                                />

                                {errors.sale_price && (
                                    <small className="text-danger">
                                        {errors.sale_price.message}
                                    </small>
                                )}
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Danh mục</Form.Label>
                                <Form.Select 
                                    className="bg-dark text-white border-0"
                                    {...register('category', { required: 'Chọn danh mục' })}
                                >
                                    <option value="">Chọn loại...</option>
                                    {categories.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        {/* Trạng thái */}
                        <Col md={12}>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white d-block">Trạng thái kho hàng</Form.Label>
                                <div className="d-flex gap-4">
                                    <Form.Check 
                                        type="radio" label="Còn hàng" value="1"
                                        className="text-white" {...register('status')}
                                    />
                                    <Form.Check 
                                        type="radio" label="Hết hàng" value="0"
                                        className="text-white" {...register('status')}
                                    />
                                </div>
                            </Form.Group>
                        </Col>

                        {/* Mô tả chi tiết (CKEditor) */}
                        <Col md={12}>
                            <Form.Group className="mb-4">
                                <Form.Label className="text-white">Mô tả sản phẩm</Form.Label>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="ck-editor-wrapper"> 
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={field.value || ""} // Quan trọng: lấy dữ liệu từ field.value
                                                onChange={(event, editor) => {
                                                    field.onChange(editor.getData());
                                                }}
                                            />
                                        </div>
                                    )}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex gap-2">
                        <Button variant="warning" className="rounded-pill px-5 fw-bold shadow-sm" type="submit">
                            <FaSave className="me-2" /> LƯU THAY ĐỔI
                        </Button>
                        <Button variant="outline-light" className="rounded-pill px-4" onClick={() => navigate(-1)}>
                            Hủy bỏ
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default EditProduct;