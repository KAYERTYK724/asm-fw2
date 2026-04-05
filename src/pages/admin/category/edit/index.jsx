/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Container, Form, Button, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import requestAPI from '../../../../RequestAPI';
import '../style.css';

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        const fetchCategory = async () => {
            const res = await requestAPI({ method: 'GET', url: `/categories/${id}` });
            if (res && res.data?.data) {
                setValue('name', res.data.data.name);
            }
        };
        fetchCategory();
    }, [id, setValue]);

   const onSubmit = async (data) => {
        const res = await requestAPI({
            method: 'PUT',
            url: `/categories/${id}`,
            data: { name: data.name }
        });
        if (res) {
            alert('Cập nhật danh mục thành công!');
            navigate('/admin/category');
        }
    }; 

    return (
        <Container fluid className="pt-4 px-4">
            <div className="bg-secondary rounded p-4">
                <h4 className="mb-4 text-white fw-bold">SỬA DANH MỤC</h4>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Col md={12}>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Tên danh mục</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên danh mục..."
                                className="bg-dark text-white border-0"
                                {...register('name', {
                                    required: {
                                        value: true,
                                        message: 'Tên danh mục không được bỏ trống!'
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'Tên danh mục phải trên 3 ký tự!'
                                    }
                                })}
                            />
                            {errors.name && (
                                <small className="text-danger">{errors.name.message}</small>
                            )}
                        </Form.Group>
                    </Col>

                    <div className="d-flex gap-2">
                        <Button variant="success" className="rounded-pill px-4" type="submit">
                            <FaSave /> Cập nhật
                        </Button>
                        <Button
                            variant="secondary"
                            className="rounded-pill px-4"
                            onClick={() => navigate('/admin/category')}
                        >
                            Hủy
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default EditCategory;