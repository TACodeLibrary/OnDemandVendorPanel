import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "../../../schema";
import { useLoginMutation } from "../../../rtk/endpoints/authApi";
import { toast } from "sonner";
import { aesEncrypt } from "../../../utils/aes-encrypt-decrypt";
import "../../../assets/scss/login.scss";
import passwordIcon from "../../../assets/icons/Password.png";
import viewIcon from "../../../assets/icons/View.png";
import EmailIcon from "../../../assets/icons/sms.png";

type LoginSchema = z.infer<typeof LoginFormSchema>;

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async ({ email, password }: LoginSchema) => {
    try {
      const res = await login({
        email: aesEncrypt(email),
        password,
        device_token: "deviceToken",
      }).unwrap();

      if (res?.error) {
        throw res.error;
      }

      toast.success("Login Success!");
    } catch (error) {
      toast.error("Login Failed!");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <p className="form-title">Welcome Back</p>
        <p className="form-subtitle">
          Please enter your credentials to log into your account
        </p>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-fields">
            <div className="form-group">
              <img className="email-icon" src={EmailIcon} alt="email" />
              <input
                type="email"
                id="email"
                className="input-field"
                placeholder=""
                {...register("email")}
              />
              <label htmlFor="email" className="input-label">
                Email Address
              </label>
            </div>
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}

            <div className="form-group">
              <img className="password-icon" src={passwordIcon} alt="lock" />

              <input
                type={passwordVisible ? "text" : "password"} // Default is password hidden, toggle with eye icon
                id="password"
                className="input-field"
                placeholder=""
                {...register("password")}
              />
              <label htmlFor="password" className="input-label-pwd">
                Password
              </label>

              <img
                src={viewIcon}
                alt="view"
                className="view-icon"
                onClick={() => setPasswordVisible((prev) => !prev)} // Toggle visibility
              />
            </div>
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>

          <div className="forgot-password">
            <a
              href="/forgot-password/find-account"
              className="forgot-password-link"
            >
              Forgot Password?
            </a>
          </div>

          <div className="button-container">
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Log In"}
            </button>
            <div className="signup-link-container">
              <span>Don't have an account?</span>{" "}
              <a href="/" className="signup-link">
                Sign Up
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
