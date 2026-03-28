import "./style.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Email:", data.email);
    console.log("Password:", data.password);

    alert("Đăng nhập thành công!");
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
          className="login100-form validate-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <span className="login100-form-title">
            Đăng nhập
          </span>

          {/* EMAIL */}
          <div className="wrap-input100">
            <input
              className="input100"
              type="text"
              placeholder="Email"
              {...register("email", {
                required: "Email không được để trống",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Email không đúng định dạng",
                },
              })}
            />

            <span className="focus-input100"></span>
            <span className="symbol-input100">
              <i className="fa fa-envelope"></i>
            </span>

            {errors.email && (
              <small className="error-text">
                {errors.email.message}
              </small>
            )}
          </div>

          {/* PASSWORD */}
          <div className="wrap-input100">
            <input
              className="input100"
              type="password"
              placeholder="Mật khẩu"
              {...register("password", {
                required: "Mật khẩu không được để trống",
                minLength: {
                  value: 6,
                  message: "Mật khẩu tối thiểu 6 ký tự",
                },
              })}
            />

            <span className="focus-input100"></span>
            <span className="symbol-input100">
              <i className="fa fa-lock"></i>
            </span>

            {errors.password && (
              <small className="error-text">
                {errors.password.message}
              </small>
            )}
          </div>

          {/* BUTTON */}
          <div className="container-login100-form-btn">
            <button type="submit" className="login100-form-btn">
              Đăng nhập
            </button>
          </div>

          {/* FORGOT */}
          <div className="text-center p-t-12">
            <Link className="txt2" to="/forgot-password">
              Quên mật khẩu?
            </Link>
          </div>

          {/* REGISTER */}
          <div className="text-center p-t-136">
            <Link className="txt2" to="/register">
              Tạo tài khoản
              <i className="fa fa-long-arrow-right m-l-5"></i>
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;