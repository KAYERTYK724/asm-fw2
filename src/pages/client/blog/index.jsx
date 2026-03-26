import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './style.css';

const Blog = () => {
  const blogData = [
    {
      id: 1,
      date: '16 Tháng 2, 2020',
      title: 'Máy uốn tóc nào tốt nhất hiện nay',
      img: 'https://i.pinimg.com/736x/8e/61/e2/8e61e2cc8d18ed28085e88e4117f8db3.jpg',
    },
    {
      id: 2,
      date: '21 Tháng 2, 2020',
      title: 'Nhẫn vĩnh cửu có thực sự tồn tại mãi mãi',
      img: 'https://i.pinimg.com/736x/d5/87/5e/d5875edd58f3c2f84fc75cde86f1c574.jpg',
    },
    {
      id: 3,
      date: '28 Tháng 2, 2020',
      title: 'Lợi ích sức khỏe của việc đeo kính râm',
      img: 'https://i.pinimg.com/736x/f3/ee/60/f3ee60a806a7ce2c2ea03e818f3cbbab.jpg',
    },
    {
      id: 4,
      date: '16 Tháng 2, 2020',
      title: 'Hướng tới tầm cao mới trong phẫu thuật thẩm mỹ',
      img: 'https://i.pinimg.com/736x/48/af/61/48af61d3c43874b66414ca52e322d45a.jpg',
    },
    {
      id: 5,
      date: '21 Tháng 2, 2020',
      title: 'Nhẫn cưới - Món quà cho cả một đời',
      img: 'https://i.pinimg.com/736x/39/02/08/3902086b0444a84bf635eeafcb4d74fb.jpg',
    },
    {
      id: 6,
      date: '28 Tháng 2, 2020',
      title: 'Các phương pháp tẩy lông khác nhau',
      img: 'https://i.pinimg.com/736x/20/57/9c/20579c9723e5f0c0eb6bbafcd19c7a84.jpg',
    },
    {
      id: 7,
      date: '16 Tháng 2, 2020',
      title: 'Bông tai vòng - Phong cách từ lịch sử',
      img: 'https://i.pinimg.com/736x/fa/71/a7/fa71a79b53a2668af050cb59421c108a.jpg',
    },
    {
      id: 8,
      date: '21 Tháng 2, 2020',
      title: 'Phẫu thuật mắt Lasik: Bạn đã sẵn sàng chưa?',
      img: 'https://i.pinimg.com/736x/74/cd/4a/74cd4a15641f19943080faeb23559c7f.jpg',
    },
    {
      id: 9,
      date: '28 Tháng 2, 2020',
      title: 'Phẫu thuật mắt Lasik: Những điều cần lưu ý',
      img: 'https://i.pinimg.com/736x/c4/f0/76/c4f076fe63047e53372b46e27ddd618f.jpg',
    },
  ];

  return (
    <div className='blog-page'>
      {/* Header Section */}
      <section className='blog-header'>
        <Container>
          <Row>
            <Col lg={12} className='text-center'>
              <h2>Blog Của Chúng Tôi</h2>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Main Blog Grid */}
      <section className='blog-section py-5'>
        <Container>
          <Row className='g-4'>
            {blogData.map((blog) => (
              <Col lg={4} md={6} sm={12} key={blog.id}>
                <Card className='blog-card border-0'>
                  <div className='blog-img-wrapper'>
                    <Card.Img variant='top' src={blog.img} className='blog-img' />
                  </div>
                  {/* Phần nội dung đè lên ảnh */}
                  <div className='blog-text-container'>
                    <div className='blog-date'>
                      <span className='calendar-icon'>📅</span> {blog.date}
                    </div>
                    <h5 className='blog-title'>{blog.title}</h5>
                    <div className='read-more-wrapper'>
                      <Link to='/detailBlog' className='read-more-link'>
                        ĐỌC THÊM BÀI VIẾT
                      </Link>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Blog;
