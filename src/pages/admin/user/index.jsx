import { Link } from 'react-router-dom';
import { Container, Table, Button, Badge } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import requestAPI from '../../../RequestAPI';
import './style.css';

const UserListAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await requestAPI({
        method: 'GET',
        url: '/users/list',
      });

      if (res && res.data?.data) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


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
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className='text-center text-white'>
                    Chưa có người dùng
                  </td>
                </tr>
              ) : (
                users.map((u, index) => (
                  <tr key={u.id}>
                    <td>{index + 1}</td>
                    <td className='text-white'>{u.fullname}</td>
                    <td className='text-white'>{u.email}</td>
                    <td className='text-white'>{u.phone}</td>
                    <td>
                      {u.role === 'admin' ? (
                        <Badge bg='danger'>Quản trị viên</Badge>
                      ) : (
                        <Badge bg='primary'>Người dùng</Badge>
                      )}
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

export default UserListAdmin;
