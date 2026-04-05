/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import requestAPI from '../../../RequestAPI';

const Cart = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  // ✅ check login
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Vui lòng đăng nhập!');
      navigate('/login');
    }
  }, []);

  // ✅ load cart
  const fetchCart = async () => {
    try {
      if (!user) return;

      const res = await requestAPI({
        method: 'GET',
        url: `/orders/cart/${user.id}`,
      });

      if (res && res.data) {
        setItems(res.data.data || []);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.log('Lỗi load cart:', error);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ update số lượng
  const updateQty = async (id, value) => {
    if (isNaN(value) || value < 1) return;

    try {
      await requestAPI({
        method: 'PUT',
        url: `/orders/cart/${id}`, // ✅ FIX API
        data: { quantity: value },
      });

      // update local state cho mượt
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: value } : item)),
      );
    } catch (error) {
      console.log('Lỗi update:', error);
    }
  };

  // ✅ xoá sản phẩm
  const removeItem = async (id) => {
    try {
      await requestAPI({
        method: 'DELETE',
        url: `/orders/cart/${id}`, // ✅ FIX API
      });

      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      console.log('Lỗi xoá:', error);
    }
  };

  // ✅ tính tổng tiền (anti crash)
  const subtotal = items.reduce((sum, i) => sum + (i.product?.price || 0) * i.quantity, 0);

  const onApplyCoupon = (data) => {
    alert('Áp dụng mã: ' + data.coupon);
  };

  return (
    <div className='cart-page'>
      <div className='cart-header'>
        <h2>Giỏ hàng</h2>
        <p>Trang chủ / Cửa hàng / Giỏ hàng</p>
      </div>

      <div className='cart-container'>
        {/* LEFT */}
        <div className='cart-list'>
          <div className='cart-title'>
            <span>Sản phẩm</span>
            <span>Số lượng</span>
            <span>Tổng</span>
          </div>

          {items.length === 0 ? (
            <p>Giỏ hàng trống</p>
          ) : (
            items.map((item) => (
              <div className='cart-item' key={item.id}>
                {/* PRODUCT */}
                <div className='product'>
                  <img src={item.product?.image} alt='' />
                  <div>
                    <p>{item.product?.name}</p>
                    <span>{(item.product?.price || 0).toLocaleString()}đ</span>
                  </div>
                </div>

                {/* QUANTITY */}
                <div>
                  <input
                    type='number'
                    value={item.quantity}
                    min='1'
                    onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                    className='qty-input'
                  />
                </div>

                {/* TOTAL */}
                <div className='total'>
                  {((item.product?.price || 0) * item.quantity).toLocaleString()}đ
                </div>

                {/* REMOVE */}
                <button className='remove' onClick={() => removeItem(item.id)}>
                  ×
                </button>
              </div>
            ))
          )}

          <div className='cart-actions'>
            <button className='btn-light' onClick={() => navigate('/shop')}>
              ← Tiếp tục mua
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className='cart-summary'>
          <form onSubmit={handleSubmit(onApplyCoupon)} className='coupon-box'>
            <input
              placeholder='Nhập mã giảm giá'
              {...register('coupon', {
                required: 'Vui lòng nhập mã',
              })}
            />
            <button>Áp dụng</button>
          </form>

          {errors.coupon && <small>{errors.coupon.message}</small>}

          <h3>Tổng giỏ hàng</h3>

          <div className='summary-row'>
            <span>Tạm tính</span>
            <span>{subtotal.toLocaleString()}đ</span>
          </div>

          <div className='summary-row total'>
            <span>Tổng</span>
            <span>{subtotal.toLocaleString()}đ</span>
          </div>

          <button className='btn-checkout'>
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
