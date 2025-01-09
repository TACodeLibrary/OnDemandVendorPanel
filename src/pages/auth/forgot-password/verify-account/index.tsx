import { useNavigate } from "react-router-dom";
import OtpInput from "../../../../utils/common/component/OtpInput";

const VerifyAccount = () => {
  const navigate = useNavigate();

  const handleOtpComplete = () => {
    console.log("OTP completed");
    navigate("/reset-password");
  };

  const handleResend = () => {
    alert("OTP resent");
  };

  return (
    <div className="verify-account-container">
      <OtpInput
        email="lisa@gmail.com"
        timerStart={45}
        showTimer={true}
        showResend={true}
        onOtpComplete={handleOtpComplete}
        onResend={handleResend}
      />
    </div>
  );
};

export default VerifyAccount;
