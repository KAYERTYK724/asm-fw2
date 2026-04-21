import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import requestAPI from "../../../RequestAPI";
import "./style.css";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const orderRes = await requestAPI({ method: "GET", url: `/orders/${id}` });
      if (orderRes && orderRes.data?.data) {
        setOrder(orderRes.data.data);
      }

      const detailRes = await requestAPI({ method: "GET", url: `/order-details/order/${id}` });
      if (detailRes && detailRes.data?.data) {
        setItems(detailRes.data.data);
      }

      setLoading(false);
    };
    fetchData();
  }, [id]);

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

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (loading) return <div className="text-center text-white py-5">Đang tải...</div>;
  if (!order) return <div className="text-center text-white py-5">Không tìm thấy đơn hàng.</div>;

  return (
    <div className="order-page">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="order-title mb-0">Chi tiết đơn hàng <span>#{order.id}</span></h3>
        <button className="btn-back" onClick={() => navigate("/admin/orders")}>
          ← Trở về
        </button>
      </div>

      <div className="row g-3">
        {/* THÔNG TIN KHÁCH */}
        <div className="col-md-4" >
          <div className="order-card order-info rounded-1">
            <h5 className="text-white mb-3">Thông tin khách hàng</h5>
            <p><b>Tên:</b> {order.name}</p>
            <p><b>Email:</b> {order.user?.email || '—'}</p>
            <p><b>SĐT:</b> {order.phone}</p>
            <p><b>Địa chỉ:</b> {order.address || '—'}</p>
            <p><b>Thanh toán:</b> {order.payments?.toUpperCase()}</p>
            <p><b>Trạng thái TT:</b> {renderPaymentStatus(order.payment_status)}</p>
            <p><b>Trạng thái đơn:</b> {renderOrderStatus(order.order_status)}</p>
            <p><b>Ngày đặt:</b> {new Date(order.createdAt).toLocaleDateString("vi-VN")}</p>
          </div>
        </div>

        {/* SẢN PHẨM */}
        <div className="col-md-8">
          <div className="order-card rounded-1">
            <h5 className="text-white mb-3">Sản phẩm</h5>
            {items.length === 0 ? (
              <p className="text-center">Không có sản phẩm nào.</p>
            ) : (
              <>
                <table className="order-table">
                  <thead>
                    <tr>
                      <th>Tên sản phẩm</th>
                      <th>SL</th>
                      <th>Giá</th>
                      <th>Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, i) => (
                      <tr key={i}>
                        <td>{item.product?.name || `SP #${item.product_id}`}</td>
                        <td>{item.quantity}</td>
                        <td>{Number(item.price).toLocaleString("vi-VN")}₫</td>
                        <td>{(item.price * item.quantity).toLocaleString("vi-VN")}₫</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="order-total">
                  Tổng: {total.toLocaleString("vi-VN")}₫
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;