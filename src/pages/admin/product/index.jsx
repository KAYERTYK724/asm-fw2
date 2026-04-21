import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrashAlt, FaPlusSquare } from "react-icons/fa";
import './style.css';
import requestAPI from "../../../RequestAPI";

const ProductListAdmin = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const res = await requestAPI({
                method: "GET",
                url: "/products/list",
            });

            setProducts(res.data.data);
            } catch (error) {
            console.log("Lỗi API:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (product) => {
        const isConfirm = window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm: "${product.name}"?`);
        if (!isConfirm) return;

        try {
            await requestAPI({
                method: "DELETE",
                url: `/products/${product.id}`,
            });

            setProducts(prev => prev.filter(p => p.id !== product.id));

            alert("Xóa sản phẩm thành công!");

        } catch (error) {
            const message = error.response?.data?.message || "Xóa thất bại";
            alert(message);
        }
    };

    const formatVND = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    return (
        <Container fluid className="pt-4 px-4">
            <div className="bg-secondary text-center rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h4 className="mb-0 text-white fw-bold">DANH SÁCH SẢN PHẨM</h4>
                    <Button as={Link} to='/admin/addProduct' variant="success" className="rounded-pill px-4">
                        <FaPlusSquare/>
                    </Button>
                </div>

                <div className="table-responsive">
                    <Table hover bordered className="text-start align-middle mb-0 custom-table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">HÌNH ẢNH</th>
                                <th scope="col">TÊN SẢN PHẨM</th>
                                <th scope="col">GIÁ BÁN</th>
                                <th scope="col">GIÁ GIẢM</th>
                                <th scope="col">TRẠNG THÁI</th>
                                <th scope="col">DANH MỤC</th>
                                <th scope="col">MÔ TẢ</th>
                                <th scope="col">HÀNH ĐỘNG</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            className="rounded-0 shadow-sm"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                                        />
                                    </td>
                                    <td className="text-white fw-medium">{product.name}</td>
                                    <td className="text-white fw-bold">
                                        {formatVND(product.price)}
                                    </td>

                                    <td className="text-white fw-bold">
                                    {product.sale_price > 0 
                                        ? formatVND(product.sale_price) 
                                        : "Không giảm"}
                                    </td>
                                    <td>
                                        <Badge bg={product.status === 1 ? "success" : "danger"} className="rounded-pill">
                                            {product.status === 1 ? "Còn hàng" : "Hết hàng"}
                                        </Badge>
                                    </td>
                                    <td>{product.category?.name}</td>
                                    <td style={{ maxWidth: '300px' }}>
                                        <div 
                                            className="text-truncate-2"
                                            dangerouslySetInnerHTML={{ 
                                                __html: product.description?.length > 100 
                                                    ? product.description.substring(0, 100) + "..." 
                                                    : product.description 
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button as={Link} to={`/admin/viewProduct/${product.id}`} size="sm" variant="info" className="rounded-pill px-3">
                                                <FaEye className="text-white" />
                                            </Button>
                                            <Button as={Link} to={`/admin/editProduct/${product.id}`} size="sm" variant="warning" className="rounded-pill px-3">
                                                <FaEdit />
                                            </Button>
                                            <Button 
                                                size="sm" 
                                                variant="danger" 
                                                className="rounded-pill px-3" 
                                                onClick={() => handleDelete(product)}>
                                                <FaTrashAlt />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </Container>
    );
};

export default ProductListAdmin;