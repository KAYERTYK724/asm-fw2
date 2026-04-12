import "./style.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Cart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Áo thun túi trước",
      price: 300000,
      qty: 1,
      image: "https://tse2.mm.bing.net/th/id/OIP.4j9g9hU_n5ldonrC3Yd82wHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    {
      id: 2,
      name: "Giày thể thao",
      price: 500000,
      qty: 1,
      image: "https://tse2.mm.bing.net/th/id/OIP.QLQsC8plg4xhW0qiQBALIQHaFj?rs=1&pid=ImgDetMain&o=7&rm=3",
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // cập nhật số lượng
  const updateQty = (id, value) => {
    if (isNaN(value) || value < 1) value = 1;

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: value } : item
      )
    );
  };

  // xoá sản phẩm
  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  // tính tiền
  const subtotal = items.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  const onApplyCoupon = (data) => {
    alert("Áp dụng mã: " + data.coupon);
  };

  return (
    <div className="cart-page">

      {/* HEADER */}
      <div className="cart-header">
        <h2>Giỏ hàng</h2>
        <p>Trang chủ / Cửa hàng / Giỏ hàng</p>
      </div>

      <div className="cart-container">

        {/* LEFT */}
        <div className="cart-list">

          <div className="cart-title">
            <span>Sản phẩm</span>
            <span>Số lượng</span>
            <span>Tổng</span>
          </div>

          {items.length === 0 ? (
            <p>Giỏ hàng trống</p>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>

                {/* PRODUCT */}
                <div className="product">
                  <img src={item.image} alt="" />
                  <div>
                    <p>{item.name}</p>
                    <span>{item.price.toLocaleString()}đ</span>
                  </div>
                </div>

                {/* QUANTITY */}
                <div>
                  <input
                    type="number"
                    value={item.qty}
                    min="1"
                    onChange={(e) =>
                      updateQty(item.id, parseInt(e.target.value))
                    }
                    className="qty-input"
                  />
                </div>

                {/* TOTAL */}
                <div className="total">
                  {(item.price * item.qty).toLocaleString()}đ
                </div>

                {/* REMOVE */}
                <button
                  className="remove"
                  onClick={() => removeItem(item.id)}
                >
                  ×
                </button>
              </div>
            ))
          )}

          <div className="cart-actions">
            <button className="btn-light">← Tiếp tục mua</button>
            <button className="btn-dark">Cập nhật giỏ hàng</button>
          </div>
        </div>
        {/* RIGHT */}
        <div className="cart-summary">
          {/* COUPON */}
          <form
            onSubmit={handleSubmit(onApplyCoupon)}
            className="coupon-box"
          >
            <input
              placeholder="Nhập mã giảm giá"
              {...register("coupon", {
                required: "Vui lòng nhập mã",
              })}
            />
            <button>Áp dụng</button>
          </form>

          {errors.coupon && <small>{errors.coupon.message}</small>}

          <h3>Tổng giỏ hàng</h3>

          <div className="summary-row">
            <span>Tạm tính</span>
            <span>{subtotal.toLocaleString()}đ</span>
          </div>

          <div className="summary-row total">
            <span>Tổng</span>
            <span>{subtotal.toLocaleString()}đ</span>
          </div>

          <button className="btn-checkout">
            <Link to='/checkout' className='text-decoration-none text-white'>
              Thanh toán
            </Link>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;