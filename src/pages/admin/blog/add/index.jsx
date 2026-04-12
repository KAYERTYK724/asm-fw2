/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave } from "react-icons/fa";
import requestAPI from '../../../../RequestAPI';
import '../style.css'; 

const AddBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            title: '',
            date: '',
            image: '',
            content: '',
        },
    });

    useEffect(() => {
        const fetchBlog = async () => {
            if (!id) {
                setLoadingData(false);
                return;
            }

            const res = await requestAPI({ method: 'GET', url: `/blogs/${id}` });
            if (res?.data?.data) {
                const blog = res.data.data;
                reset({
                    title: blog.title || '',
                    date: blog.createdAt ? new Date(blog.createdAt).toISOString().slice(0, 10) : '',
                    image: blog.image || '',
                    content: blog.content || '',
                });
            }
            setLoadingData(false);
        };

        fetchBlog();
    }, [id, reset]);

    const onRegister = async (data) => {
        setIsSaving(true);

        const payload = {
            title: data.title,
            content: data.content,
            image: data.image,
            ...(data.date ? { createdAt: data.date } : {}),
        };

        const res = id
            ? await requestAPI({ method: 'PUT', url: `/blogs/${id}`, data: payload })
            : await requestAPI({ method: 'POST', url: '/blogs/add', data: payload });

        setIsSaving(false);

        if (res) {
            alert(id ? 'Cập nhật bài viết thành công' : 'Thêm bài viết mới thành công');
            navigate('/admin/blogAdmin');
        }
    };

    if (loadingData) {
        return (
            <Container fluid className="pt-4 px-4 text-center">
                <Spinner animation="border" role="status" variant="light">
                    <span className="visually-hidden">Đang tải...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container fluid className="pt-4 px-4">
            <div className="bg-secondary rounded p-4">
                <h4 className="mb-4 text-white fw-bold">
                    {id ? 'CẬP NHẬT BÀI VIẾT' : 'THÊM BÀI VIẾT MỚI'}
                </h4>
                <Form onSubmit={handleSubmit(onRegister)}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Tiêu đề bài viết</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tiêu đề..."
                                    className="bg-dark text-white border-0"
                                    {...register('title', {
                                        required: {
                                            value: true,
                                            message: 'Tiêu đề không được bỏ trống!',
                                        },
                                        minLength: {
                                            value: 15,
                                            message: 'Tiêu đề phải trên 15 ký tự!',
                                        },
                                    })}
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
                                    {...register('date', {
                                        required: {
                                            value: true,
                                            message: 'Thời gian không được bỏ trống!',
                                        },
                                    })}
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
                            {...register('image', {
                                required: {
                                    value: true,
                                    message: 'Hình ảnh không được bỏ trống!',
                                },
                            })}
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
                            {...register('content', {
                                required: {
                                    value: true,
                                    message: 'Nội dung không được bỏ trống!',
                                },
                                minLength: {
                                    value: 100,
                                    message: 'Nội dung phải trên 100 ký tự!',
                                },
                            })}
                        />
                        {errors.content && (
                            <small className="text-danger">{errors.content.message}</small>
                        )}
                    </Form.Group>

                    <div className="d-flex gap-2">
                        <Button variant="success" className="rounded-pill px-4" type="submit" disabled={isSaving}>
                            <FaSave /> {isSaving ? 'Đang lưu...' : 'Lưu bài viết'}
                        </Button>
                        <Button variant="secondary" className="rounded-pill px-4" onClick={() => navigate('/admin/blogAdmin')}>
                            Hủy
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default AddBlog;
