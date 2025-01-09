import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetPasswordSchema } from "../../../schema";
import { z } from "zod";
import { useNavigate } from "react-router";
import "../../../assets/scss/reset-password.scss";
import lockIcon from "../../../assets/icons/lock.png";
import ViewIcon from "../../../assets/icons/view.png";

type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const [newPasswordVisible, setNewPasswordVisible] = useState(false); // Default is password hidden
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Default is password hidden

  const onSubmit = (data: ResetPasswordForm) => {
    console.log("Form Submitted:", data);
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <p className="form-title">Reset Password</p>
        <p className="form-subtitle">
          Please enter & confirm the new password for your account
        </p>

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-fields">
            <span className="input-title">New Password</span>
            <div className="form-group">
              <img className="email-icon" src={lockIcon} alt="email" />
              <input
                type={newPasswordVisible ? "text" : "password"}
                id="newPassword"
                className="input-field"
                placeholder=""
                {...register("newPassword")}
              />
              <label htmlFor="email" className="input-label">
                Enter New Password
              </label>
              <img
                src={ViewIcon}
                alt="view"
                className="view-icon"
                onClick={() => setNewPasswordVisible((prev) => !prev)}
              />
            </div>
            {errors.newPassword && (
              <span className="error-message">
                {errors.newPassword.message}
              </span>
            )}
            <span className="input-title">Confirm New Password</span>
            <div className="form-group">
              <img className="password-icon" src={lockIcon} alt="lock" />

              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                className="input-field"
                placeholder=""
                {...register("confirmPassword")}
              />
              <label htmlFor="confirmPassword" className="input-label-pwd">
                Confirm New Password
              </label>

              <img
                src={ViewIcon}
                alt="view"
                className="view-icon"
                onClick={() => setConfirmPasswordVisible((prev) => !prev)}
              />
            </div>
            {errors.confirmPassword && (
              <span className="error-message">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="button-container">
            <button
              type="submit"
              className="update-button"
              // disabled={isLoading}
            >
              {/* {isLoading ? 'Loading...' : 'Log In'} */}
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
