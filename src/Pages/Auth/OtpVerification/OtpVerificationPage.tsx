import { useEffect, useState } from "react";
import Images from "../../../Utils/Images";
import { PrimaryButton } from "../../../Components/Button";
import { useNavigate } from "react-router";
import Check from "../../../assets/Icons/Check";
import Arrow from "../../../assets/Icons/Arrow";
import { AuthUser } from "../../../axiosClient";
import { getAllValuesFromLocalStorage } from "../../../Service/AuthService";
import toast from "react-hot-toast";

interface OTPInputProps {
  onInputChange?: (otp: string) => void;
}
const OtpVerificationPage = ({ onInputChange }: OTPInputProps) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
const user =getAllValuesFromLocalStorage()
const [processing, setProcessing] = useState(false);

  const [step, setStep] = useState(1);
  const isOtpComplete = otpValues.every((value) => value !== "");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOtpValues = () => {
      AuthUser.get(`auth/check-verification/?id=${user?.user.id}`)
        .then((response) => {
          const otpCode = response.data.code;
          setOtpValues(otpCode.split('')); // Ensure otpValues is an array of characters
        })
        .catch((error) => {
          console.error("Error fetching OTP values:", error);
        });
    };

    fetchOtpValues();
  }, [])
  
  const handleChange = (index: number, value: string) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Concatenate the values to form the complete OTP
    const formattedOTP = newOtpValues.join("");
    if (onInputChange) {
      onInputChange(formattedOTP);
    }
  };
  const handleStep = () => {
    setProcessing(true)
    
    AuthUser.post("auth/verify", {
      verification_token:otpValues.join('')
    })
    .then(() => {
    setStep(2);
    setProcessing(false);
     
    })
    .catch((error) => {
      setProcessing(false);
      if (error) {
        console.log(error);
        return toast.error(error.response.data.message);
      }

      return error.response.data.errors.forEach((error: any) => {
        toast.error(error.msg);
      });
    });
  };
  return (
    <div className="w-hull h-full flex justify-center my-4">
      {step === 1 ? (
        <div className="flex flex-col justify-center items-center">
          <div className="h-10 w-10">
            <img src={Images.logo} alt="" />
          </div>
          <h2 className="text-[#101828] font-semibold text-2xl md:text-[30px]">
            Enter your verification code
          </h2>
          <span className="text-base flex space-x-0.5  gap-0.5 text-[#667085]">
            Your OTP is <p className="text-[#1C1D20]">463-291</p>. Resets in
            00:30
          </span>
          <div className="space-y-2">
            <div className="flex items-center justify-center ">
              {otpValues.map((char, index) => (
                <>
                  <input
                    key={index}
                    type="text"
                    value={char}
                    maxLength={1}
                    placeholder="0"
                    className={`${"border rounded text-center text-[#7F56D9]  "} rounded p-2 m-1 w-[36px] h-[36px] text-[]  text-center focus:outline-none
              ${char ? "border-[#D6BBFB] font-bold" : "border-gray-300"}
              `}
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                  {index === 2 && (
                    <div className="separator-div bg-gray-200 w-3 h-[2px] space-x-6" />
                  )}
                </>
              ))}
            </div>
            <PrimaryButton
              onClick={handleStep}
              className={`${
                isOtpComplete
                  ? "bg-[#7F56D9]"
                  : "bg-[#E9D7FE] cursor-not-allowed"
              } w-full rounded-lg text-white py-1 text-base focus:outline-none`}
              disabled={!isOtpComplete ?? processing}
              loading={processing}
            >
              Submit OTP
            </PrimaryButton>
            <div className=" flex w-full items-center justify-center h-8 gap-2 cursor-pointer"
            onClick={()=> navigate('/')}>
              <span className="h- " >
                <Arrow/>
              </span>
              <p className="text-[14px] text-[#667085]">Back to sign up</p>

            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-5 w-full ">
          <div className="h-10 w-10 flex">
            <Check />
          </div>
          <div className="space-y-1 text-center">
            <p className="md:text-[30px] text-[24px] text-[#101828] font-bold">
              Account verified
            </p>
            <p className="text-[#667085] text-base">Click below to log in.</p>
          </div>
          <div className="xl:w-[20%] md:w-[40%] w-[60%]">
            <PrimaryButton
              onClick={() => {
                if (isOtpComplete) {
                  navigate("/login");
                }
                
              }}
              className={`bg-[#7F56D9]
               w-full rounded-lg text-white py-1.5 text-base focus:outline-none`}
            >
              Continue
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtpVerificationPage;
