import React from "react";
import "./style.css";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const items = [
    { id: 1, name: "Áo thun", price: 200000, qty: 2 },
    { id: 2, name: "Quần jean", price: 500000, qty: 1 },
  ];

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Đặt hàng thành công!");
  };

  return (
    <div className="checkout-page">

      {/* HEADER */}
      <div className="checkout-header">
        <h2>Thanh toán</h2>
        <p>Trang chủ / Giỏ hàng / Thanh toán</p>
      </div>

      <div className="checkout-container">

        {/* LEFT */}
        <form
          id="checkout-form"
          className="checkout-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3>Thông tin thanh toán</h3>

          <div className="row">
            <div>
              <input
                placeholder="Họ *"
                {...register("firstName", { required: "Vui lòng nhập họ" })}
              />
              {errors.firstName && <small>{errors.firstName.message}</small>}
            </div>

            <div>
              <input
                placeholder="Tên *"
                {...register("lastName", { required: "Vui lòng nhập tên" })}
              />
              {errors.lastName && <small>{errors.lastName.message}</small>}
            </div>
          </div>

          <input
            placeholder="Quốc gia *"
            {...register("country", { required: "Vui lòng nhập quốc gia" })}
          />
          {errors.country && <small>{errors.country.message}</small>}

          <input
            placeholder="Địa chỉ *"
            {...register("address", { required: "Vui lòng nhập địa chỉ" })}
          />
          {errors.address && <small>{errors.address.message}</small>}

          <input placeholder="Căn hộ, số nhà (không bắt buộc)" />

          <input
            placeholder="Thành phố *"
            {...register("city", { required: "Vui lòng nhập thành phố" })}
          />
          {errors.city && <small>{errors.city.message}</small>}

          <input
            placeholder="Tỉnh / Thành *"
            {...register("state", { required: "Vui lòng nhập tỉnh" })}
          />
          {errors.state && <small>{errors.state.message}</small>}

          <input
            placeholder="Mã bưu điện *"
            {...register("zip", { required: "Vui lòng nhập mã ZIP" })}
          />
          {errors.zip && <small>{errors.zip.message}</small>}

          <div className="row">
            <div>
              <input
                placeholder="Số điện thoại *"
                {...register("phone", {
                  required: "Vui lòng nhập số điện thoại",
                  pattern: {
                    value: /^[0-9]{9,11}$/,
                    message: "SĐT không hợp lệ",
                  },
                })}
              />
              {errors.phone && <small>{errors.phone.message}</small>}
            </div>

            <div>
              <input
                placeholder="Email *"
                {...register("email", {
                  required: "Vui lòng nhập email",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email không hợp lệ",
                  },
                })}
              />
              {errors.email && <small>{errors.email.message}</small>}
            </div>
          </div>

          <textarea placeholder="Ghi chú thêm..." />

        </form>

        {/* RIGHT */}
        <div className="checkout-summary">
          <h3>Đơn hàng của bạn</h3>

          {items.map((item) => (
            <div key={item.id} className="summary-item">
              <span>{item.name}</span>
              <span>
                {item.qty} × {item.price.toLocaleString()}đ
              </span>
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
              <input
                type="radio"
                value="cod"
                {...register("payment", { required: true })}
              />
              Thanh toán khi nhận hàng
            </label>

            <label>
              <input
                type="radio"
                value="bank"
                {...register("payment", { required: true })}
              />
              Chuyển khoản ngân hàng
            </label>

            {errors.payment && (
              <small>Vui lòng chọn phương thức thanh toán</small>
            )}
          </div>

          <button form="checkout-form" className="btn-order">
            ĐẶT HÀNG
          </button>
        </div>

      </div>
    </div>
  );
};

export default Checkout;