import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../layout/admin/admin-layout';
import './style.css';

const ListUser = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    { id: 1, name: 'Nguyen Van A', email: 'vana@email.com', phone: '0901234567', role: 'Customer', status: 'Active', joined: '2024-01-05' },
    { id: 2, name: 'Tran Thi B', email: 'thib@email.com', phone: '0912345678', role: 'Customer', status: 'Active', joined: '2024-01-08' },
    { id: 3, name: 'Le Van C', email: 'vanc@email.com', phone: '0923456789', role: 'Admin', status: 'Active', joined: '2024-01-10' },
    { id: 4, name: 'Pham Thi D', email: 'thid@email.com', phone: '0934567890', role: 'Customer', status: 'Banned', joined: '2024-01-15' },
    { id: 5, name: 'Hoang Van E', email: 'vane@email.com', phone: '0945678901', role: 'Customer', status: 'Active', joined: '2024-01-20' },
    { id: 6, name: 'Vo Thi F', email: 'thif@email.com', phone: '0956789012', role: 'Customer', status: 'Inactive', joined: '2024-01-22' },
  ]);

  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('All');

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === 'All' || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      Active: 'bg-success',
      Banned: 'bg-danger',
      Inactive: 'bg-warning text-dark',
    };
    return map[status] || 'bg-secondary';
  };

  return (
    <AdminLayout title="List User">
      <div className="row g-4">
        <div className="col-12">
          <div className="bg-secondary rounded p-4">
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">All Users ({users.length})</h6>
            </div>

            {/* Filters */}
            <div className="row g-3 mb-4">
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control bg-dark border-0 text-light"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="col-sm-4">
                <select
                  className="form-select bg-dark border-0 text-light"
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <option value="All">All Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="Customer">Customer</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                  <tr className="text-white">
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length > 0 ? (
                    filtered.map((user, i) => (
                      <tr key={user.id}>
                        <td>{i + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2 text-white fw-bold"
                              style={{ width: 35, height: 35, fontSize: 14 }}
                            >
                              {user.name.charAt(0)}
                            </div>
                            {user.name}
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                          <span className={`badge ${user.role === 'Admin' ? 'bg-primary' : 'bg-info text-dark'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${getStatusBadge(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>{user.joined}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-info me-2"
                            onClick={() => navigate(`/admin/user/view/${user.id}`)}
                          >
                            <i className="fa fa-eye"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(user.id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <small className="text-light">
                Showing {filtered.length} of {users.length} users
              </small>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item disabled">
                    <a className="page-link bg-secondary border-0" href="#">Previous</a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link bg-primary border-0" href="#">1</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link bg-secondary border-0" href="#">Next</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListUser;