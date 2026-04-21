/* eslint-disable react-hooks/exhaustive-deps */
import './style.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import requestAPI from '../../../RequestAPI';

const Cart = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Vui lòng đăng nhập!');
      navigate('/login');
    }
  }, []);

  const fetchCart = async () => {
    try {
      if (!user) return;

      const res = await requestAPI({
        method: 'GET',
        url: `/orders/cart/${user.id}`,
      });

      setItems(res?.data?.data || []);
    } catch (error) {
      console.log('Lỗi load cart:', error);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (id, value) => {
    if (isNaN(value) || value < 1) return;

    try {
      await requestAPI({
        method: 'PUT',
        url: `/orders/cart/${id}`,
        data: { quantity: value },
      });

      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: value } : item)),
      );
    } catch (error) {
      console.log('Lỗi update:', error);
    }
  };

  const removeItem = async (id) => {
    try {
      await requestAPI({
        method: 'DELETE',
        url: `/orders/cart/${id}`,
      });

      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      console.log('Lỗi xoá:', error);
    }
  };

  // ✅ format tiền
  const formatVND = (price) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price || 0);

  // ✅ subtotal chuẩn (dùng item.price)
  const subtotal = items.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0);

  return (
    <div className='cart-page'>
      <div className='cart-header'>
        <h2>Giỏ hàng</h2>
        <p>Trang chủ / Cửa hàng / Giỏ hàng</p>
      </div>

      <div className='cart-container '>
        {/* LEFT */}
        <div className='cart-list rounded-0'>
          <div className='cart-title'>
            <span>Sản phẩm</span>
            <span>Số lượng</span>
            <span>Tổng</span>
          </div>

          {items.length === 0 ? (
            <p>Giỏ hàng trống</p>
          ) : (
            items.map((item) => {
              const product = item.product;
              const isSale =
                product?.sale_price &&
                product.sale_price > 0 &&
                product.sale_price < product.price;

              return (
                <div className='cart-item' key={item.id}>
                  {/* PRODUCT */}
                  <div className='product'>
                    <img src={product?.image} alt='' />
                    <div>
                      <p>{product?.name}</p>

                      {/* ✅ GIÁ */}
                      {isSale ? (
                        <>
                          <span className='text-danger fw-bold'>{formatVND(item.price)}</span>
                          <br />
                          <small
                            style={{
                              textDecoration: 'line-through',
                              color: '#999',
                            }}
                          >
                            {formatVND(product.price)}
                          </small>
                        </>
                      ) : (
                        <span>{formatVND(item.price)}</span>
                      )}
                    </div>
                  </div>

                  {/* QUANTITY */}
                  <div>
                    <input
                      type='number'
                      value={item.quantity}
                      min='1'
                      onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
                      className='qty-input rounded-0'
                    />
                  </div>

                  {/* TOTAL */}
                  <div className='total'>{formatVND(item.price * item.quantity)}</div>

                  {/* REMOVE */}
                  <button className='remove' onClick={() => removeItem(item.id)}>
                    ×
                  </button>
                </div>
              );
            })
          )}

          <div className='cart-actions'>
            <button className='btn-light rounded-0' onClick={() => navigate('/shop')}>
              ← Tiếp tục mua
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className='cart-summary rounded-0'>
          <h3>Tổng giỏ hàng</h3>

          <div className='summary-row'>
            <span>Tạm tính</span>
            <span>{formatVND(subtotal)}</span>
          </div>

          <div className='summary-row total'>
            <span>Tổng</span>
            <span>{formatVND(subtotal)}</span>
          </div>

          <button className='btn-checkout rounded-0'>
            <Link to='/checkout' className='text-decoration-none text-white '>
              Thanh toán
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
