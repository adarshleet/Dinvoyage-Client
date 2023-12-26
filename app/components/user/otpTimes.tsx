import React, { useState, useEffect } from 'react';

interface OtpProps {
    onTimeOut: () => void,
}

const OtpTimer: React.FC<OtpProps> = ({ onTimeOut }) => {
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime === 1) {
                    clearInterval(timer);
                    onTimeOut();
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onTimeOut]);

    return (
        <div className="text-left text-sm mt-2">
            {timeLeft === 0 ? (
                <button className="text-blue-500" onClick={onTimeOut}>
                    Resend OTP
                </button>
            ) : (
                <p>Resend OTP in {timeLeft} seconds</p>
            )}
        </div>
    );
};

export default OtpTimer;

