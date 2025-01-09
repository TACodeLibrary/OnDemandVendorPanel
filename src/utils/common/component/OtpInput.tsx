import { useState, useEffect } from 'react';
import '../../../assets/scss/otp-input.scss';
interface OtpInputProps {
  email?: string; 
  timerStart?: number; 
  showTimer?: boolean; 
  showResend?: boolean; 
  onOtpComplete?: () => void; 
  onResend?: () => void; 
}

const OtpInput = ({
  email = 'lisa@gmail.com',
  timerStart = 45,
  showTimer = true,
  showResend = true,
  onOtpComplete,
  onResend,
}: OtpInputProps) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(timerStart); 

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus on the next input field
    if (value.length === 1 && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }

    // If OTP is complete, trigger callback
    if (newOtp.every(digit => digit !== "")) {
      onOtpComplete && onOtpComplete();
    }
  };

  // Countdown timer for OTP resend
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer]);

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setTimer(timerStart); 
    onResend && onResend(); 
  };

  return (
    <div className="otp-verification-container">
      <div className="otp-verification-form">
        <p className="form-title">OTP Verification</p>
        <p className="form-subtitle">
          Please enter the one-time 4-digit code sent to{' '}
        </p>
          <span className="email">{email}</span>

        <div className="otp-input-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="otp-input"
            />
          ))}
        </div>

        {showTimer && (
          <div className="timer">
            <p className="timer-text">{timer > 0 ? `00:${timer < 10 ? `0${timer}` : timer}` : "00:00"}</p>
          </div>
        )}

        {showResend && (
          <div className="resend-container">
            <p className="resend-text">
              Didn’t Receive OTP?{' '}
              <button
                disabled={timer > 0}
                onClick={handleResend}
                className={`resend-button ${timer === 0 ? "enabled" : "disabled"}`}
              >
                Resend
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtpInput;
