import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // fake data
  const order = {
    id,
    code: "ORD001",
    name: "Nguyễn Văn A",
    email: "a@gmail.com",
    phone: "0123456789",
    address: "TP.HCM",
    status: "pending",
    date: "28/03/2026",
    items: [
      { name: "Áo thun", price: 200000, qty: 2 },
      { name: "Quần jean", price: 500000, qty: 1 },
    ],
  };

  const total = order.items.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return <span className="order-status status-pending">Chờ xử lý</span>;
      case "shipping":
        return <span className="order-status status-shipping">Đang giao</span>;
      case "done":
        return <span className="order-status status-done">Hoàn thành</span>;
      case "cancel":
        return <span className="order-status status-cancel">Đã hủy</span>;
      default:
        return <span className="order-status">Không rõ</span>;
    }
  };

  return (
    <div className="order-page">

      {/* HEADER + BUTTON */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="order-title mb-0">
           Chi tiết đơn hàng <span>#{order.code}</span>
        </h3>

        <button
          className="btn-back"
          onClick={() => navigate("/admin/orders")}
        >
          ← Trở về
        </button>
      </div>

      <div className="row g-3">

        {/* THÔNG TIN KHÁCH */}
        <div className="col-md-4">
          <div className="order-card order-info">
            <h5 className="text-white mb-3">
              Thông tin khách hàng
            </h5>

            <p><b>Tên:</b> {order.name}</p>
            <p><b>Email:</b> {order.email}</p>
            <p><b>SĐT:</b> {order.phone}</p>
            <p><b>Địa chỉ:</b> {order.address}</p>
            <p><b>Ngày:</b> {order.date}</p>

            <p>
              <b>Trạng thái:</b>{" "}
              {renderStatus(order.status)}
            </p>
          </div>
        </div>

        {/* SẢN PHẨM */}
        <div className="col-md-8">
          <div className="order-card">
            <h5 className="text-white mb-3">
              Sản phẩm
            </h5>

            <table className="order-table">
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>SL</th>
                  <th>Giá</th>
                  <th>Tổng</th>
                </tr>
              </thead>

              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>{item.price.toLocaleString("vi-VN")}₫</td>
                    <td>
                      {(item.price * item.qty).toLocaleString("vi-VN")}₫
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="order-total">
              Tổng: {total.toLocaleString("vi-VN")}₫
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetail;