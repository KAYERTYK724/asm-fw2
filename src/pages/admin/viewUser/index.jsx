import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../../layout/admin/admin-layout';
import './style.css';

const users = [
  { id: 1, name: 'Nguyen Van A', email: 'vana@email.com', phone: '0901234567', role: 'Customer', status: 'Active', joined: '2024-01-05', address: '123 Le Loi, Ho Chi Minh City', orders: 12, totalSpent: '$1,200' },
  { id: 2, name: 'Tran Thi B', email: 'thib@email.com', phone: '0912345678', role: 'Customer', status: 'Active', joined: '2024-01-08', address: '456 Tran Hung Dao, Ha Noi', orders: 5, totalSpent: '$430' },
  { id: 3, name: 'Le Van C', email: 'vanc@email.com', phone: '0923456789', role: 'Admin', status: 'Active', joined: '2024-01-10', address: '789 Nguyen Hue, Da Nang', orders: 0, totalSpent: '$0' },
  { id: 4, name: 'Pham Thi D', email: 'thid@email.com', phone: '0934567890', role: 'Customer', status: 'Banned', joined: '2024-01-15', address: '321 Hai Ba Trung, Can Tho', orders: 3, totalSpent: '$150' },
  { id: 5, name: 'Hoang Van E', email: 'vane@email.com', phone: '0945678901', role: 'Customer', status: 'Active', joined: '2024-01-20', address: '654 Pham Ngu Lao, Ho Chi Minh City', orders: 8, totalSpent: '$870' },
  { id: 6, name: 'Vo Thi F', email: 'thif@email.com', phone: '0956789012', role: 'Customer', status: 'Inactive', joined: '2024-01-22', address: '987 Ly Tu Trong, Ho Chi Minh City', orders: 1, totalSpent: '$60' },
];

const recentOrders = [
  { id: '#001', product: 'Product A', amount: '$120', status: 'Completed', date: '2024-03-01' },
  { id: '#002', product: 'Product B', amount: '$85', status: 'Pending', date: '2024-03-10' },
  { id: '#003', product: 'Product C', amount: '$200', status: 'Processing', date: '2024-03-15' },
];

const getStatusBadge = (status) => {
  const map = {
    Active: 'bg-success',
    Banned: 'bg-danger',
    Inactive: 'bg-warning text-dark',
  };
  return map[status] || 'bg-secondary';
};

const getOrderStatusBadge = (status) => {
  const map = {
    Completed: 'bg-success',
    Pending: 'bg-warning text-dark',
    Processing: 'bg-info text-dark',
    Cancelled: 'bg-danger',
  };
  return map[status] || 'bg-secondary';
};

const ViewUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const user = users.find((u) => u.id === Number(id)) || users[0];

  return (
    <AdminLayout title="View User">
      <div className="row g-4">
        {/* Back button */}
        <div className="col-12">
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => navigate('/admin/user/list')}
          >
            <i className="fa fa-arrow-left me-2"></i>Back to List
          </button>
        </div>

        {/* User Info Card */}
        <div className="col-12 col-xl-4">
          <div className="bg-secondary rounded p-4 text-center">
            {/* Avatar */}
            <div
              className="rounded-circle bg-primary d-flex align-items-center justify-content-center mx-auto mb-3 text-white fw-bold"
              style={{ width: 80, height: 80, fontSize: 32 }}
            >
              {user.name.charAt(0)}
            </div>
            <h5 className="mb-1">{user.name}</h5>
            <span className={`badge ${user.role === 'Admin' ? 'bg-primary' : 'bg-info text-dark'} mb-2`}>
              {user.role}
            </span>
            <br />
            <span className={`badge ${getStatusBadge(user.status)}`}>
              {user.status}
            </span>

            <hr className="border-light my-3" />

            {/* Info */}
            <div className="text-start">
              <div className="mb-3">
                <small className="text-muted d-block">Email</small>
                <span>{user.email}</span>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block">Phone</small>
                <span>{user.phone}</span>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block">Address</small>
                <span>{user.address}</span>
              </div>
              <div className="mb-3">
                <small className="text-muted d-block">Joined</small>
                <span>{user.joined}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats + Orders */}
        <div className="col-12 col-xl-8">
          {/* Stats */}
          <div className="row g-3 mb-4">
            <div className="col-6">
              <div className="bg-secondary rounded p-4 text-center">
                <i className="fa fa-shopping-bag fa-2x text-primary mb-2"></i>
                <h4 className="mb-0">{user.orders}</h4>
                <small className="text-muted">Total Orders</small>
              </div>
            </div>
            <div className="col-6">
              <div className="bg-secondary rounded p-4 text-center">
                <i className="fa fa-dollar-sign fa-2x text-success mb-2"></i>
                <h4 className="mb-0">{user.totalSpent}</h4>
                <small className="text-muted">Total Spent</small>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-secondary rounded p-4">
            <h6 className="mb-3">Recent Orders</h6>
            <div className="table-responsive">
              <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                  <tr className="text-white">
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, i) => (
                    <tr key={i}>
                      <td>{order.id}</td>
                      <td>{order.product}</td>
                      <td>{order.amount}</td>
                      <td>{order.date}</td>
                      <td>
                        <span className={`badge ${getOrderStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewUser;