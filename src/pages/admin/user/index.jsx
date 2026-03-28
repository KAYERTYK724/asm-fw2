import { Link } from 'react-router-dom';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';
import './style.css';

const UserListAdmin = () => {
  const userData = [
    {
      id: 1,
      name: 'Nguyen Van A',
      email: 'vana@email.com',
      phone: '0901234567',
      role: 'Customer',
      status: 'Active',
      joined: '2024-01-05',
    },
    {
      id: 2,
      name: 'Tran Thi B',
      email: 'thib@email.com',
      phone: '0912345678',
      role: 'Customer',
      status: 'Active',
      joined: '2024-01-08',
    },
    {
      id: 3,
      name: 'Le Van C',
      email: 'vanc@email.com',
      phone: '0923456789',
      role: 'Admin',
      status: 'Active',
      joined: '2024-01-10',
    },
    {
      id: 4,
      name: 'Pham Thi D',
      email: 'thid@email.com',
      phone: '0934567890',
      role: 'Customer',
      status: 'Banned',
      joined: '2024-01-15',
    },
    {
      id: 5,
      name: 'Hoang Van E',
      email: 'vane@email.com',
      phone: '0945678901',
      role: 'Customer',
      status: 'Active',
      joined: '2024-01-20',
    },
    {
      id: 6,
      name: 'Vo Thi F',
      email: 'thif@email.com',
      phone: '0956789012',
      role: 'Customer',
      status: 'Inactive',
      joined: '2024-01-22',
    },
  ];

  return (
    <Container fluid className='pt-4 px-4'>
      <div className='bg-secondary text-center rounded p-4'>
        <div className='d-flex align-items-center justify-content-between mb-4'>
          <h4 className='mb-0 text-white fw-bold'>DANH SÁCH BÀI VIẾT</h4>
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
                <th scope='col'>TÊN NGƯỜI DÙNG</th>
                <th scope='col'>EMAIL</th>
                <th scope='col'>SỐ ĐIỆN THOẠI</th>
                <th scope='col'>VAI TRÒ</th>
                <th scope='col'>TRẠNG THÁI</th>
                <th scope='col'>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((u, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className='text-white'>{u.name}</td>
                  <td className='text-white'>{u.email}</td>
                  <td className='text-white'>{u.phone}</td>
                  <td className='text-white'>{u.phone}</td>
                  <td>
                    {u.role === 'Admin' ? (
                      <Badge bg="danger" className="rounded-pill px-3">Quản trị viên</Badge>
                    ) : (
                      <Badge bg="primary" className="rounded-pill px-3">Người dùng</Badge>
                    )}
                  </td>
                  <td>
                    {u.status === 'Banned' ? (
                      <Badge bg="warning" className="rounded-pill px-3">Bị khóa</Badge>
                    ) : (
                      <Badge bg="success" className="rounded-pill px-3">Hoạt động</Badge>
                    )}
                  </td>
                  <td>
                    <div className='d-flex gap-2'>
                      <Button
                        as={Link}
                        to='/admin/viewUser'
                        size='sm'
                        variant='info'
                        className='rounded-pill px-3'
                      >
                        <FaEye className='text-white' />
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

export default UserListAdmin;
