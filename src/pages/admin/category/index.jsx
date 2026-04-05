/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrashAlt, FaPlusSquare } from 'react-icons/fa';
import requestAPI from '../../../RequestAPI';
import './style.css';

const CategoryListAdmin = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    const res = await requestAPI({ method: 'GET', url: '/categories/list' });
    if (res && res.data?.data) {
      setCategoriesData(res.data.data);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa danh mục này?')) return;
    const res = await requestAPI({ method: 'DELETE', url: `/categories/${id}` });
    if (res) {
      setCategoriesData(prev => prev.filter(c => c.id !== id));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <div className="text-center text-white py-5">Đang tải...</div>;

  return (
    <Container fluid className='pt-4 px-4'>
      <div className='bg-secondary text-center rounded p-4'>
        <div className='d-flex align-items-center justify-content-between mb-4'>
          <h4 className='mb-0 text-white fw-bold'>DANH SÁCH DANH MỤC</h4>
          <Button as={Link} to='/admin/addCategory' variant='success' className='rounded-pill'>
            <FaPlusSquare className='me-2' />
          </Button>
        </div>

        <div className='table-responsive'>
          <Table hover bordered className='text-start align-middle mb-0 custom-table table-dark'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>DANH MỤC</th>
                <th scope='col'>TRẠNG THÁI</th>
                <th scope='col'>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              {categoriesData.length === 0 ? (
                <tr>
                  <td colSpan={4} className='text-center text-white'>Chưa có danh mục nào.</td>
                </tr>
              ) : (
                categoriesData.map((c, index) => (
                  <tr key={c.id}>
                    <td>{index + 1}</td>
                    <td className='text-white'>{c.name}</td>
                    <td>
                      <Badge bg="success" className="rounded-pill">Hiển thị</Badge>
                    </td>
                    <td>
                      <div className='d-flex gap-2'>
                        <Button
                          as={Link}
                          to={`/admin/editCategory/${c.id}`}
                          size='sm'
                          variant='warning'
                          className='rounded-pill px-3'
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          size='sm'
                          variant='danger'
                          className='rounded-pill px-3'
                          onClick={() => handleDelete(c.id)}
                        >
                          <FaTrashAlt />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default CategoryListAdmin;