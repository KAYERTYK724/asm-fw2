import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import requestAPI from '../../../RequestAPI';
import './style.css';

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await requestAPI({ method: 'GET', url: '/blogs/list' });
      if (res && res.data?.data) {
        setBlogData(res.data.data);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  if (loading) return <div className="text-center py-5">Đang tải...</div>;

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
          {blogData.length === 0 ? (
            <p className="text-center text-muted">Chưa có bài viết nào.</p>
          ) : (
            <Row className='g-4'>
              {blogData.map((blog) => (
                <Col lg={4} md={6} sm={12} key={blog.id}>
                  <Card className='blog-card border-0'>
                    <div className='blog-img-wrapper'>
                      <Card.Img
                        variant='top'
                        src={blog.image || 'https://i.pinimg.com/736x/8e/61/e2/8e61e2cc8d18ed28085e88e4117f8db3.jpg'}
                        className='blog-img'
                      />
                    </div>
                    <div className='blog-text-container'>
                      <div className='blog-date'>
                        <span className='calendar-icon'>📅</span>{' '}
                        {new Date(blog.createdAt).toLocaleDateString('vi-VN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </div>
                      <h5 className='blog-title'>{blog.title}</h5>
                      <div className='read-more-wrapper'>
                        <Link to={`/detailBlog/${blog.id}`} className='read-more-link'>
                          ĐỌC THÊM BÀI VIẾT
                        </Link>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>
    </div>
  );
};

export default Blog;