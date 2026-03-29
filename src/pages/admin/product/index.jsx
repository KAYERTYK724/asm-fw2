import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrashAlt, FaPlusSquare } from "react-icons/fa";
import './style.css';

const ProductListAdmin = () => {
    const products = [
        { 
            id: 1, 
            name: 'Áo khoác Biker Piqué', 
            price: 120000, 
            sale_price: 100000,
            img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
            category: 'Áo khoác',
            status: 1, // 1: Còn hàng, 0: Hết hàng
            description: 'Áo khoác phong cách Biker với chất liệu vải Piqué cao cấp, mang lại sự thoải mái và vẻ ngoài nam tính.'
        },
        { 
            id: 2, 
            name: 'Túi đeo ngực nhiều ngăn', 
            price: 120000, 
            sale_price: 0, // Không giảm giá
            img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
            category: 'Phụ kiện',
            status: 1,
            description: 'Túi đeo ngực tiện lợi với thiết kế nhiều ngăn giúp bạn sắp xếp đồ dùng cá nhân một cách khoa học.'
        },
        { 
            id: 3, 
            name: 'Nón họa tiết chéo', 
            price: 120000, 
            sale_price: 100000,
            img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
            category: 'Phụ kiện',
            status: 1,
            description: 'Nón lưỡi trai với họa tiết chéo độc đáo, tạo điểm nhấn cho bộ trang phục dạo phố của bạn.'
        },
        { 
            id: 4, 
            name: 'Boot cổ ngắn', 
            price: 120000, 
            sale_price: 100000,
            img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
            category: 'Giày dép',
            status: 0, // Hết hàng
            description: 'Giày Boot cổ ngắn da thật, đế chống trượt, phù hợp cho cả đi làm và đi chơi.'
        },
        { 
            id: 5, 
            name: 'Áo thun túi phối', 
            price: 120000, 
            sale_price: 0,
            img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
            category: 'Áo thun',
            status: 1,
            description: 'Áo thun cotton 100% co giãn tốt, điểm nhấn là phần túi phối màu ở ngực trái.'
        },
        { 
            id: 6, 
            name: 'Khăn choàng basic', 
            price: 120000, 
            sale_price: 100000,
            img: 'https://i.pinimg.com/736x/84/07/b6/8407b6533a6efa71002985a412701162.jpg',
            category: 'Phụ kiện',
            status: 1,
            description: 'Khăn choàng len mỏng nhẹ, giữ ấm tốt và dễ dàng phối hợp với nhiều loại trang phục mùa đông.'
        }
    ];

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
                                            src={product.img} 
                                            alt={product.name} 
                                            className="rounded-0 shadow-sm"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                                        />
                                    </td>
                                    <td className="text-white fw-medium">{product.name}</td>
                                    <td className="text-white fw-bold">
                                        {product.price} VND
                                    </td>
                                    <td className="text-white fw-bold">
                                        {product.sale_price} VND
                                    </td>
                                    <td>
                                        <Badge bg={product.status === 1 ? "success" : "danger"} className="rounded-pill">
                                            {product.status === 1 ? "Còn hàng" : "Hết hàng"}
                                        </Badge>
                                    </td>
                                    <td style={{ maxWidth: '300px' }}>
                                        <div className="text-truncate-2">
                                            {product.description}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Button as={Link} to='/admin/viewProduct' size="sm" variant="info" className="rounded-pill px-3">
                                                <FaEye className="text-white" />
                                            </Button>
                                            <Button size="sm" variant="warning" className="rounded-pill px-3">
                                                <FaEdit />
                                            </Button>
                                            <Button size="sm" variant="danger" className="rounded-pill px-3">
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