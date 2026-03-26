import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrashAlt, FaPlusSquare } from "react-icons/fa";
import './style.css';

const BlogListAdmin = () => {
    const blogData = [
        { 
            id: 1, 
            date: '16 Tháng 2, 2020', 
            title: 'Máy uốn tóc nào tốt nhất hiện nay', 
            img: 'https://i.pinimg.com/736x/8e/61/e2/8e61e2cc8d18ed28085e88e4117f8db3.jpg',
            content: 'Khám phá danh sách các loại máy uốn tóc cao cấp giúp bạn tạo kiểu chuyên nghiệp ngay tại nhà mà không gây hư tổn cho tóc...'
        },
        { 
            id: 2, 
            date: '21 Tháng 2, 2020', 
            title: 'Nhẫn vĩnh cửu có thực sự tồn tại mãi mãi', 
            img: 'https://i.pinimg.com/736x/d5/87/5e/d5875edd58f3c2f84fc75cde86f1c574.jpg',
            content: 'Tìm hiểu về ý nghĩa sâu sắc đằng sau những chiếc nhẫn vĩnh cửu và chất liệu tạo nên sự bền bỉ thách thức thời gian của chúng...'
        },
        { 
            id: 3, 
            date: '28 Tháng 2, 2020', 
            title: 'Lợi ích sức khỏe của việc đeo kính râm', 
            img: 'https://i.pinimg.com/736x/f3/ee/60/f3ee60a806a7ce2c2ea03e818f3cbbab.jpg',
            content: 'Đeo kính râm không chỉ là thời trang mà còn là cách bảo vệ võng mạc khỏi tia UV độc hại và ngăn ngừa lão hóa vùng da mắt...'
        },
        { 
            id: 4, 
            date: '16 Tháng 2, 2020', 
            title: 'Hướng tới tầm cao mới trong phẫu thuật thẩm mỹ', 
            img: 'https://i.pinimg.com/736x/48/af/61/48af61d3c43874b66414ca52e322d45a.jpg',
            content: 'Những công nghệ hiện đại nhất đang thay đổi hoàn toàn bộ mặt của ngành phẫu thuật thẩm mỹ, giúp giảm đau và phục hồi nhanh chóng...'
        },
        { 
            id: 5, 
            date: '21 Tháng 2, 2020', 
            title: 'Nhẫn cưới - Món quà cho cả một đời', 
            img: 'https://i.pinimg.com/736x/39/02/08/3902086b0444a84bf635eeafcb4d74fb.jpg',
            content: 'Hướng dẫn cách lựa chọn nhẫn cưới hoàn hảo, phù hợp với cá tính của cặp đôi để lưu giữ khoảnh khắc hạnh phúc nhất...'
        },
        { 
            id: 6, 
            date: '28 Tháng 2, 2020', 
            title: 'Các phương pháp tẩy lông khác nhau', 
            img: 'https://i.pinimg.com/736x/20/57/9c/20579c9723e5f0c0eb6bbafcd19c7a84.jpg',
            content: 'So sánh chi tiết ưu và nhược điểm của các phương pháp tẩy lông phổ biến như Waxing, Laser và sử dụng máy triệt lông cầm tay...'
        },
        { 
            id: 7, 
            date: '16 Tháng 2, 2020', 
            title: 'Bông tai vòng - Phong cách từ lịch sử', 
            img: 'https://i.pinimg.com/736x/fa/71/a7/fa71a79b53a2668af050cb59421c108a.jpg',
            content: 'Hành trình từ một món trang sức cổ đại trở thành biểu tượng thời trang không bao giờ lỗi mốt của phái đẹp hiện đại...'
        },
        { 
            id: 8, 
            date: '21 Tháng 2, 2020', 
            title: 'Phẫu thuật mắt Lasik: Bạn đã sẵn sàng chưa?', 
            img: 'https://i.pinimg.com/736x/74/cd/4a/74cd4a15641f19943080faeb23559c7f.jpg',
            content: 'Những tiêu chuẩn y tế cần thiết và lời khuyên từ chuyên gia trước khi bạn quyết định thực hiện phẫu thuật xóa cận bằng Lasik...'
        },
        { 
            id: 9, 
            date: '28 Tháng 2, 2020', 
            title: 'Phẫu thuật mắt Lasik: Những điều cần lưu ý', 
            img: 'https://i.pinimg.com/736x/c4/f0/76/c4f076fe63047e53372b46e27ddd618f.jpg',
            content: 'Quy trình chăm sóc mắt sau phẫu thuật vô cùng quan trọng để đảm bảo thị lực hồi phục tối đa và tránh các biến chứng không mong muốn...'
        },
    ];

    return (
        <Container fluid className="pt-4 px-4">
            <div className="bg-secondary text-center rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h4 className="mb-0 text-white fw-bold">DANH SÁCH BÀI VIẾT</h4>
                    <Button as={Link} to='/admin/addBlog' variant="success" className="rounded-pill">
                        <FaPlusSquare className="me-2" />
                    </Button>
                </div>

                <div className="table-responsive">
                    <Table hover bordered className="text-start align-middle mb-0 custom-table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">TIÊU ĐỀ</th>
                                <th scope="col">HÌNH ẢNH</th>
                                <th scope="col">NỘI DUNG</th>
                                <th scope="col">NGÀY ĐĂNG</th>
                                <th scope="col">HÀNH ĐỘNG</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogData.map((blog, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="text-white">{blog.title || "Tiêu đề bài viết..."}</td>
                                    <td>
                                        <img src={blog.img} alt="blog" style={{ width: '100px' }} />
                                    </td>
                                    <td style={{ maxWidth: '500px' }}>
                                        <div className="text-truncate-2">
                                            {blog.content}
                                        </div>
                                    </td>
                                    <td>{blog.date}</td>
                                    <td >
                                        <div className="d-flex gap-2">
                                            <Button as={Link} to='/admin/viewBlog' size="sm" variant="info" className="rounded-pill px-3">
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

export default BlogListAdmin;