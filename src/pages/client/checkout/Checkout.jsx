import React from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import requestAPI from "../../../RequestAPI";

const Checkout = () => {
  const navigate = useNavigate();

  const cartRaw = localStorage.getItem("cart");
  const items = cartRaw ? JSON.parse(cartRaw) : [
    { id: 1, name: "Áo thun", price: 200000, qty: 2 },
    { id: 2, name: "Quần jean", price: 500000, qty: 1 },
  ];

  const subtotal = items.reduce((sum, i) => sum + i.price * (i.qty || i.quantity || 1), 0);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const orderRes = await requestAPI({
      method: "POST",
      url: "/orders/add",
      data: {
        user_id: user.id || 1,
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        payments: data.payment,
        payment_status: 0,
        order_status: 0,
        total_price: subtotal,
      },
    });

    if (!orderRes || !orderRes.data?.data) {
      alert("Đặt hàng thất bại, vui lòng thử lại!");
      return;
    }

    const orderId = orderRes.data.data.id;

    for (const item of items) {
      await requestAPI({
        method: "POST",
        url: "/order-details/add",
        data: {
          order_id: orderId,
          product_id: item.id,
          quantity: item.qty || item.quantity || 1,
          price: item.price,
        },
      });
    }

    localStorage.removeItem("cart");
    alert("Đặt hàng thành công!");
    navigate("/");
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h2>Thanh toán</h2>
        <p>Trang chủ / Giỏ hàng / Thanh toán</p>
      </div>

      <div className="checkout-container">

        {/* LEFT */}
        <form id="checkout-form" className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
          <h3>Thông tin nhận hàng</h3>

          <input
            placeholder="Họ và tên *"
            {...register("name", { required: "Vui lòng nhập họ tên" })}
          />
          {errors.name && <small>{errors.name.message}</small>}

          <input
            placeholder="Số điện thoại *"
            {...register("phone", {
              required: "Vui lòng nhập số điện thoại",
              pattern: { value: /^[0-9]{9,11}$/, message: "SĐT không hợp lệ" },
            })}
          />
          {errors.phone && <small>{errors.phone.message}</small>}

          <input
            placeholder="Email *"
            {...register("email", {
              required: "Vui lòng nhập email",
              pattern: { value: /^\S+@\S+$/i, message: "Email không hợp lệ" },
            })}
          />
          {errors.email && <small>{errors.email.message}</small>}

          <input
            placeholder="Địa chỉ nhận hàng *"
            {...register("address", { required: "Vui lòng nhập địa chỉ" })}
          />
          {errors.address && <small>{errors.address.message}</small>}

          <textarea placeholder="Ghi chú thêm (không bắt buộc)..." {...register("note")} />
        </form>

        {/* RIGHT */}
        <div className="checkout-summary">
          <h3>Đơn hàng của bạn</h3>

          {items.map((item, i) => (
            <div key={i} className="summary-item">
              <span>{item.name}</span>
              <span>{(item.qty || item.quantity || 1)} × {item.price.toLocaleString()}đ</span>
            </div>
          ))}

          <div className="summary-total">
            <span>Tạm tính</span>
            <span>{subtotal.toLocaleString()}đ</span>
          </div>

          <div className="summary-total total">
            <span>Tổng cộng</span>
            <span>{subtotal.toLocaleString()}đ</span>
          </div>

          <div className="payment">
            <label>
              <input type="radio" value="cod" defaultChecked {...register("payment", { required: true })} />
              Thanh toán khi nhận hàng
            </label>
            <label>
              <input type="radio" value="bank" {...register("payment", { required: true })} />
              Chuyển khoản ngân hàng
            </label>
            {errors.payment && <small>Vui lòng chọn phương thức thanh toán</small>}
          </div>

          <button form="checkout-form" className="btn-order">ĐẶT HÀNG</button>
        </div>

      </div>
    </div>
  );
};

export default Checkout;