import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

useEffect(() => {
  setOrders([
    {
      id: 1,
      code: "ORD001",
      name: "Nguyễn Văn An",
      email: "an@gmail.com",
      total: 1200000,
      status: "pending",
      date: "25/03/2026",
    },
    {
      id: 2,
      code: "ORD002",
      name: "Trần Thị Bình",
      email: "binh@gmail.com",
      total: 850000,
      status: "done",
      date: "24/03/2026",
    },
    {
      id: 3,
      code: "ORD003",
      name: "Lê Văn Cường",
      email: "cuong@gmail.com",
      total: 950000,
      status: "shipping",
      date: "26/03/2026",
    },
    {
      id: 4,
      code: "ORD004",
      name: "Phạm Thị Dung",
      email: "dung@gmail.com",
      total: 450000,
      status: "cancel",
      date: "22/03/2026",
    },
    {
      id: 5,
      code: "ORD005",
      name: "Hoàng Văn Em",
      email: "em@gmail.com",
      total: 780000,
      status: "pending",
      date: "27/03/2026",
    },
    {
      id: 6,
      code: "ORD006",
      name: "Đặng Thị Hạnh",
      email: "hanh@gmail.com",
      total: 660000,
      status: "done",
      date: "23/03/2026",
    },
    {
      id: 7,
      code: "ORD007",
      name: "Bùi Văn Khoa",
      email: "khoa@gmail.com",
      total: 520000,
      status: "shipping",
      date: "28/03/2026",
    },
    {
      id: 8,
      code: "ORD008",
      name: "Ngô Thị Lan",
      email: "lan@gmail.com",
      total: 300000,
      status: "pending",
      date: "29/03/2026",
    },
  ]);
}, []);

  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return <span className="order-status status-pending">Chờ xử lý</span>;
      case "done":
        return <span className="order-status status-done">Hoàn thành</span>;
      case "cancel":
        return <span className="order-status status-cancel">Đã hủy</span>;
      default:
        return <span className="order-status">Không rõ</span>;
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa đơn này?")) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
    }
  };

  return (
    <div className="order-page">
      <h3 className="order-title">Danh sách đơn hàng</h3>

      <div className="order-card">
        <table className="order-table text-center align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Mã đơn hàng</th>
              <th>Khách</th>
              <th>Email</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Ngày</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o, i) => (
              <tr key={o.id} className="order-row">
                <td>{i + 1}</td>
                <td className="order-code">#{o.code}</td>
                <td>{o.name}</td>
                <td>{o.email}</td>

                <td className="order-price">
                  {o.total.toLocaleString("vi-VN")}₫
                </td>

                <td>{renderStatus(o.status)}</td>
                <td>{o.date}</td>

                {/* ✅ ACTION */}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;