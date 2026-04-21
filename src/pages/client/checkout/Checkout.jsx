import React, { useEffect, useState } from 'react';
import './style.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import requestAPI from '../../../RequestAPI';

const Checkout = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const fetchCart = async () => {
      try {
        const res = await requestAPI({
          method: 'GET',
          url: `/orders/cart/${user.id}`,
        });

        setItems(res.data.data || []);
      } catch (error) {
        console.log('Lỗi lấy giỏ hàng:', error);
      }
    };

    fetchCart();
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const onSubmit = async (data) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const res = await requestAPI({
        method: 'POST',
        url: '/orders/checkout',
        data: {
          user_id: user.id,
          name: data.name,
          phone: data.phone,
          email: data.email, 
          address: data.address,
        },
      });

      if (res.status === 200) {
        alert('Đặt hàng thành công (COD)');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      alert('Thanh toán thất bại');
    }
  };

  return (
    <div className='checkout-page'>
      <div className='checkout-header'>
        <h2>Thanh toán</h2>
        <p>Trang chủ / Giỏ hàng / Thanh toán</p>
      </div>

      <div className='checkout-container'>
        {/* LEFT */}
        <form id='checkout-form' className='checkout-form' onSubmit={handleSubmit(onSubmit)}>
          <h3>Thông tin nhận hàng</h3>

          <input
            placeholder='Họ và tên *'
            {...register('name', { required: 'Vui lòng nhập họ tên' })}
          />
          {errors.name && <small>{errors.name.message}</small>}

          <input
            placeholder='Số điện thoại *'
            {...register('phone', {
              required: 'Vui lòng nhập số điện thoại',
              pattern: { value: /^[0-9]{9,11}$/, message: 'SĐT không hợp lệ' },
            })}
          />
          {errors.phone && <small>{errors.phone.message}</small>}

          <input
            placeholder='Email *'
            {...register('email', {
              required: 'Vui lòng nhập email',
              pattern: { value: /^\S+@\S+$/i, message: 'Email không hợp lệ' },
            })}
          />
          {errors.email && <small>{errors.email.message}</small>}

          <input
            placeholder='Địa chỉ nhận hàng *'
            {...register('address', { required: 'Vui lòng nhập địa chỉ' })}
          />
          {errors.address && <small>{errors.address.message}</small>}

          <textarea placeholder='Ghi chú thêm (không bắt buộc)...' {...register('note')} />
        </form>

        {/* RIGHT */}
        <div className='checkout-summary'>
          <h3>Đơn hàng của bạn</h3>

          {items.map((item, i) => (
            <div key={i} className='summary-item'>
              <span>{item.product?.name}</span>
              <span>
                {item.quantity} × {item.price.toLocaleString()}đ
              </span>
            </div>
          ))}

          <div className='summary-total'>
            <span>Tạm tính</span>
            <span>{subtotal.toLocaleString()}đ</span>
          </div>

          <div className='summary-total total'>
            <span>Tổng cộng</span>
            <span>{subtotal.toLocaleString()}đ</span>
          </div>

          <div className='payment'>
            <label>
              <input
                type='radio'
                value='cod'
                defaultChecked
                {...register('payment', { required: true })}
              />
              Thanh toán khi nhận hàng
            </label>
          </div>

          <button form='checkout-form' className='btn-order'>
            ĐẶT HÀNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
