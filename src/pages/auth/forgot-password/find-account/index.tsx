import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FindAccountSchema } from "../../../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import EmailIcon from "../../../../assets/icons/sms.png";
import "../../../../assets/scss/find-account.scss";

type FindAccountForm = z.infer<typeof FindAccountSchema>;

const FindAccount = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindAccountForm>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(FindAccountSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    navigate("/forgot-password/verify-account");
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
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button" disabled={false}>
              Next {/* {isLoading ? 'Loading...' : 'Forgot Password'} */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FindAccount;
