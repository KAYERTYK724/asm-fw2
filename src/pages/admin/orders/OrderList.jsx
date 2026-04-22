import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import requestAPI from "../../../RequestAPI";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const res = await requestAPI({ method: "GET", url: "/orders/list" });
    if (res && res.data?.data) {
      setOrders(res.data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderOrderStatus = (status) => {
    switch (status) {
      case 0: return <span className="order-status status-pending">Chờ xác nhận</span>;
      case 1: return <span className="order-status status-shipping">Đang giao</span>;
      case 2: return <span className="order-status status-done">Hoàn thành</span>;
      case 3: return <span className="order-status status-cancel">Đã hủy</span>;
      default: return <span className="order-status">Không rõ</span>;
    }
  };

  const renderPaymentStatus = (status) => {
    return status === 1
      ? <span className="order-status status-done">Đã thanh toán</span>
      : <span className="order-status status-pending">Chưa thanh toán</span>;
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa đơn hàng này?")) return;
    const res = await requestAPI({ method: "DELETE", url: `/orders/${id}` });
    if (res) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
    }
  };

  if (loading) return <div className="text-center text-white py-5">Đang tải...</div>;

  return (
    <div className="order-page p-4">
      <h3 className="order-title">Danh sách đơn hàng</h3>

      <div className="order-card rounded-1 p-4">
        <table className="order-table text-center align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Khách hàng</th>
              <th>Email</th>
              <th>SĐT</th>
              <th>Thanh toán</th>
              <th>Trạng thái</th>
              <th>Ngày đặt</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center">Chưa có đơn hàng nào.</td>
              </tr>
            ) : (
              orders.map((o, i) => (
                <tr key={o.id} className="order-row">
                  <td>{i + 1}</td>
                  <td>{o.name}</td>
                  <td>{o.user?.email || '—'}</td>
                  <td>{o.phone}</td>
                  <td>{renderPaymentStatus(o.payment_status)}</td>
                  <td>{renderOrderStatus(o.order_status)}</td>
                  <td>{new Date(o.createdAt).toLocaleDateString("vi-VN")}</td>
                  <td className="order-action">
                    <i
                      className="bi bi-eye action-icon view"
                      title="Xem chi tiết"
                      onClick={() => navigate(`/admin/orders/${o.id}`)}
                    ></i>
                    <i
                      className="bi bi-trash action-icon delete"
                      title="Xóa đơn"
                      onClick={() => handleDelete(o.id)}
                    ></i>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;