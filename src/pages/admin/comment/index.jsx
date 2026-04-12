import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Badge, Modal, Spinner, Alert } from 'react-bootstrap';
import requestAPI from '../../../RequestAPI';
import './style.css';

const CommentAdmin = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await requestAPI({ method: 'GET', url: '/comments/list' });
      if (response && response.data) {
        setComments(response.data.data || []);
      } else {
        setError('Không thể tải bình luận');
      }
    } catch (err) {
      setError('Lỗi khi tải bình luận');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      setActionLoading(true);
      const response = await requestAPI({
        method: 'PUT',
        url: `/comments/status/${id}`,
        data: { status: 1 }
      });
      if (response && response.data) {
        // Cập nhật lại danh sách
        setComments(comments.map(c => c.id === id ? { ...c, status: 1 } : c));
        setShowModal(false);
      }
    } catch (err) {
      alert('Lỗi khi duyệt bình luận');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (id) => {
    try {
      setActionLoading(true);
      const response = await requestAPI({
        method: 'PUT',
        url: `/comments/status/${id}`,
        data: { status: 0 }
      });
      if (response && response.data) {
        setComments(comments.map(c => c.id === id ? { ...c, status: 0 } : c));
        setShowModal(false);
      }
    } catch (err) {
      alert('Lỗi khi từ chối bình luận');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn chắc chắn muốn xóa bình luận này?')) {
      try {
        setActionLoading(true);
        const response = await requestAPI({ method: 'DELETE', url: `/comments/${id}` });
        if (response && response.data) {
          setComments(comments.filter(c => c.id !== id));
          setShowModal(false);
        }
      } catch (err) {
        alert('Lỗi khi xóa bình luận');
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleViewComment = (comment) => {
    setSelectedComment(comment);
    setShowModal(true);
  };

  if (loading) {
    return (
      <Container className='mt-5'>
        <div className='text-center'>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  return (
    <Container className='mt-5'>
      <Row>
        <Col md={12}>
          <h2 className='mb-4'>Quản Lý Bình Luận</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {comments.length === 0 ? (
            <Alert variant='info'>Không có bình luận</Alert>
          ) : (
            <div className='table-responsive'>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Người Bình Luận</th>
                    <th>Nội Dung</th>
                    <th>Trạng Thái</th>
                    <th>Ngày Tạo</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map((comment) => (
                    <tr key={comment.id}>
                      <td>{comment.id}</td>
                      <td>{comment.user?.fullname || 'Unknown'}</td>
                      <td>{comment.content.substring(0, 50)}...</td>
                      <td>
                        <Badge bg={comment.status === 1 ? 'success' : 'warning'}>
                          {comment.status === 1 ? 'Hiển thị' : 'Chờ duyệt'}
                        </Badge>
                      </td>
                      <td>{new Date(comment.createdAt).toLocaleDateString('vi-VN')}</td>
                      <td>
                        <Button
                          variant='info'
                          size='sm'
                          onClick={() => handleViewComment(comment)}
                          className='me-2'
                        >
                          Xem
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Col>
      </Row>

      {/* Modal xem chi tiết */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Chi Tiết Bình Luận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedComment && (
            <div>
              <h5>Người Bình Luận</h5>
              <p><strong>{selectedComment.user?.fullname || 'Unknown'}</strong></p>

              <h5>Nội Dung</h5>
              <p>{selectedComment.content}</p>

              <h5>Trạng Thái</h5>
              <p>
                <Badge bg={selectedComment.status === 1 ? 'success' : 'warning'}>
                  {selectedComment.status === 1 ? 'Hiển thị' : 'Chờ duyệt'}
                </Badge>
              </p>

              <h5>Ngày Tạo</h5>
              <p>{new Date(selectedComment.createdAt).toLocaleString('vi-VN')}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedComment && selectedComment.status === 0 && (
            <Button
              variant='success'
              onClick={() => handleApprove(selectedComment.id)}
              disabled={actionLoading}
            >
              {actionLoading ? 'Đang xử lý...' : 'Duyệt'}
            </Button>
          )}
          {selectedComment && selectedComment.status === 1 && (
            <Button
              variant='warning'
              onClick={() => handleReject(selectedComment.id)}
              disabled={actionLoading}
            >
              {actionLoading ? 'Đang xử lý...' : 'Từ Chối'}
            </Button>
          )}
          <Button
            variant='danger'
            onClick={() => handleDelete(selectedComment.id)}
            disabled={actionLoading}
          >
            {actionLoading ? 'Đang xử lý...' : 'Xóa'}
          </Button>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CommentAdmin;
