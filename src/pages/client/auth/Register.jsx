import "./style.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    console.log(data);
    alert("Đăng ký thành công!");
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

          {/* NAME */}
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