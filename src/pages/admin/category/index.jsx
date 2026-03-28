/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrashAlt, FaPlusSquare } from 'react-icons/fa';
import './style.css';

const CategoryListAdmin = () => {
  const categoriesData = [
    { id: 1, name: 'Quần', status: 1 },
    { id: 2, name: 'Áo', status: 1 },
    { id: 3, name: 'Áo Khoác', status: 1 },
    { id: 4, name: 'Phụ kiện', status: 1 },
    { id: 5, name: 'Giày', status: 0 },
    { id: 6, name: 'Mùa xuân', status: 1 },
    { id: 7, name: 'Mùa hè', status: 1 },
    { id: 8, name: 'Mùa thu', status: 1 },
    { id: 9, name: 'Mùa đông', status: 1 },
    { id: 10, name: 'Phong cách', status: 1 },
  ];
  
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
          <Table
            hover
            bordered
            className='text-start align-middle mb-0 custom-table table-dark'
          >
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>DANH MỤC</th>
                <th scope='col'>TRẠNG THÁI</th>
                <th scope='col'>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              {categoriesData.map((c, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className='text-white'>{c.name}</td>
                  <td>
                    {c.status === 1 ? (
                      <Badge bg="success" className="rounded-pill">
                        Hiển thị
                      </Badge>
                    ) : (
                      <Badge bg="danger" className="rounded-pill">
                        Đã ẩn
                      </Badge>
                    )}
                  </td>
                  <td>
                    <div className='d-flex gap-2'>
                      <Button size='sm' variant='warning' className='rounded-pill px-3'>
                        <FaEdit />
                      </Button>
                      <Button size='sm' variant='danger' className='rounded-pill px-3'>
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

export default CategoryListAdmin;
