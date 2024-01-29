import { useNavigate } from "react-router";
import { PrimaryButton } from "../../../Components/Button";
import UserPix from "../../../Components/UserPix";
import Images from "../../../Utils/Images";
import Home from "../../../assets/Icons/Home";
import Signout from "../../../assets/Icons/Signout";
import Bars from "../../../assets/Icons/Bars";
import { useEffect, useState } from "react";
import {
  deleteAllLocalStorage,
  getAllValuesFromLocalStorage,
} from "../../../Service/AuthService";
import { AuthUser } from "../../../axiosClient";
import { AuthResponse } from "../../../Types/UserType";
import PageLoader from "../../../Components/PageLoader";

const ProtectedRoute = () => {
  const user = getAllValuesFromLocalStorage();
  const [data, setData] = useState<AuthResponse>();
  const [processing, setProcessing] = useState("idle");

  useEffect(() => {
    setProcessing("loading");
    const fetch = () => {
      AuthUser.get(`user/?id=${user?.user.id}`)
        .then(({ data }) => {
          console.log(data.user.id);
          setData(data);
          setProcessing("data");
        })
        .catch((error) => {
          setProcessing("error");
          console.error("Error fetching OTP values:", error);
        });
    };

    fetch();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      {processing === "loading" ? (
        <PageLoader />
      ) : processing === "error" ? (
        <>No data</>
      ) : (
        <>
          <section className="h-full w-full md:flex hidden bg-white ">
            <div className=" border-r lg:w-[15%] w-[25%]  h-full p-4">
              <div className="flex flex-col justify-between h-full">
                <div className="">
                  <div className="flex gap-2 h-full items-center">
                    <img src={Images.logo} className="w-8 h-8" />
                    <p className="text-[#101828] font-bold">Untitled UI</p>
                  </div>
                  <div className="flex bg-[#F9F5FF] rounded-lg mr-2 p-1 gap-1">
                    <div className="w-6 h-6 flex">
                      <Home />
                    </div>
                    <p className="text-[#6941C6] font-bold">Home</p>
                  </div>
                </div>
                <div className="border-t mx-2 h-16 py-2">
                  <div className="md:h-10   -2 flex cursor-pointer">
                    <UserPix />
                    {/* {data.} */}
                    <div className="h-full flex flex-1 justify-between">
                      <div className="h-full flex flex-col justify-between ">
                        <p className="text-sm">{data?.user.first_name}</p>
                        <p className="text-[10px]">@{data?.user.username}</p>
                      </div>
                    </div>
                    <div
                      className="h-8 w-8 flex cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem("user");
                        navigate("/login");
                      }}
                    >
                      <Signout />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <main className="w-[85%] h-full space-y-2 p-4">
              <div className="flex justify-between w-full">
                <div className="">
                  <p className="text-[#101828] text-[30px]">
                    Assessment Dashboard
                  </p>
                  <p className="text-[#667085]">
                    Welcome back, {data?.user.first_name} {data?.user.last_name}
                  </p>
                </div>
                <div className="w- py-1">
                  <PrimaryButton
                    className="bg-[#7F56D9] text-center text-[14px] rounded-lg py-1 px-2 text-white cursor-pointer"
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/login")}}
                  >
                    Logout
                  </PrimaryButton>
                </div>
              </div>
              <div className="bg-blu-300 ">
                <div className="border px-4 rounded-md w-[300px] h-[120px] flex flex-col items-cen ">
                  <p className="font-semibold py-2">Below are your details</p>
                  <div className="w-full h-[1px] bg-gray-300"></div>
                  <div className="flex justify-between w-full items-center">
                    <div className="w-[70%] space-y-1">
                      <p className="text-[#101828]">{data?.user.first_name}</p>
                      <p className="text-[#667085]">{data?.user.email}</p>
                    </div>
                    <div className="text-[#101828]">
                      <p>ID: {data?.user.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </section>
          <section className="h-full w-full md:hidden flex flex-col">
            <div className="flex w-full h-16 justify-between p-3 items-center">
              <div className="flex gap-2 h-full items-center  cursor-pointer">
                <img src={Images.logo} className="w-8 h-8" />
                <p className="text-[#101828] font-bold">Untitled UI</p>
              </div>
              <div className="cursor-pointer">
                <Bars />
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-300"></div>
            <div className="my-2 space-y-3 p-3">
              <div className="">
                <p className="text-[#101828] text-[24px]">
                  Assessment Dashboard
                </p>
                <p className="text-[#667085] text-base">
                  {" "}
                  Welcome back, [Full name]{" "}
                </p>
              </div>
              <PrimaryButton
                className="bg-[#7F56D9] px-2 h-8 w-[70px] text-white rounded-lg cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("user"); 
                 navigate("/login");
                }}
              >
                Logout
              </PrimaryButton>
            </div>
            <div className="bg-blu-300 p-3 ">
              <div className="border px-4 rounded-md w-full h-[120px] flex flex-col items-cen ">
                <p className="font-semibold py-2">Below are your details</p>
                <div className="w-full h-[1px] bg-gray-300"></div>
                <div className="flex justify-between w-full items-center">
                  <div className="w-[70%] space-y-1">
                    <p className="text-[#101828]">User name</p>
                    <p className="text-[#667085]">user email</p>
                  </div>
                  <div className="text-[#101828]">
                    <p>ID: 203491</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
