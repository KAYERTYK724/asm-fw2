import "./style.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import requestAPI from "../../../RequestAPI";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    const res = await requestAPI({
      method: "POST",
      url: "/users/register", // đúng API
      data: {
        name: data.name,      // thêm name
        email: data.email,    //đúng field
        phone: data.phone,
        password: data.password,
      },
    });

    if (res && res.data) {
      alert("Đăng ký thành công!");
      navigate("/login");
    } else {
      alert("Đăng ký thất bại!");
    }
  };

  return (
    <div className="container-login100">
      <div className="wrap-login100">

        {/* IMAGE */}
        <div className="login100-pic">
          <img
            src="https://colorlib.com/etc/lf/Login_v1/images/img-01.png"
            alt="IMG"
          />
        </div>

        {/* FORM */}
        <form
          className="login100-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <span className="login100-form-title">
            Đăng ký
          </span>

          {/* NAME (optional, backend chưa dùng) */}
          <div className="wrap-input100">
            <input
              className={`input100 ${errors.name ? "input-error" : ""}`}
              placeholder="Họ và tên"
              {...register("name", {
                required: "Vui lòng nhập họ tên",
                minLength: {
                  value: 3,
                  message: "Ít nhất 3 ký tự",
                },
              })}
            />
            {errors.name && (
              <small className="error-text">{errors.name.message}</small>
            )}
          </div>

          {/* EMAIL */}
          <div className="wrap-input100">
            <input
              className={`input100 ${errors.email ? "input-error" : ""}`}
              placeholder="Email"
              {...register("email", {
                required: "Email không được để trống",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Email không đúng định dạng",
                },
              })}
            />
            {errors.email && (
              <small className="error-text">{errors.email.message}</small>
            )}
          </div>
          {/* PHONE */}
          <div className="wrap-input100">
            <input
              type="number"
              className={`input100 ${errors.phone ? "input-error" : ""}`}
              placeholder="Số điện thoại"
              {...register("phone", {
                required: "Vui lòng nhập số điện thoại"
              })}
            />
            {errors.phone && (
              <small className="error-text">{errors.phone.message}</small>
            )}
          </div>

          {/* PASSWORD */}
          <div className="wrap-input100">
            <input
              type="password"
              className={`input100 ${errors.password ? "input-error" : ""}`}
              placeholder="Mật khẩu"
              {...register("password", {
                required: "Vui lòng nhập mật khẩu",
                minLength: {
                  value: 6,
                  message: "Tối thiểu 6 ký tự",
                },
              })}
            />
            {errors.password && (
              <small className="error-text">{errors.password.message}</small>
            )}
          </div>

          {/* CONFIRM */}
          <div className="wrap-input100">
            <input
              type="password"
              className={`input100 ${errors.confirm ? "input-error" : ""}`}
              placeholder="Nhập lại mật khẩu"
              {...register("confirm", {
                required: "Vui lòng nhập lại mật khẩu",
                validate: (value) =>
                  value === password || "Mật khẩu không khớp",
              })}
            />
            {errors.confirm && (
              <small className="error-text">{errors.confirm.message}</small>
            )}
          </div>

          {/* BUTTON */}
          <div className="container-login100-form-btn">
            <button type="submit" className="login100-form-btn">
              Đăng ký
            </button>
          </div>

          {/* LOGIN LINK */}
          <div className="text-center p-t-12">
            <Link className="txt2" to="/login">
              Đã có tài khoản? Đăng nhập
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Register;