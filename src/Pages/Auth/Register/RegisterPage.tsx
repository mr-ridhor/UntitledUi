import { Link, useNavigate } from "react-router-dom";
import Images from "../../../Utils/Images";
import { TextInput } from "../../../Components/TextInput";
import { AuthTypes } from "../../../Types/AuthTypes";
import { ZodType, z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PrimaryButton } from "../../../Components/Button";
import toast, { Toaster } from "react-hot-toast";
import { axl, } from "../../../axiosClient";
import { storeUserInfo } from "../../../Service/AuthService";

const RegisterPage = () => {
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const schema: ZodType<AuthTypes> = z.object({
    name: z.string().min(2).max(30),
    username: z.string().min(2).max(30),
    email: z.string().email(),
    password: z.string().min(8),
  });
  // .refine((data) => data.name && data.username && data.email && data.password, {
  //   message: "All fields are required",
  // });
  // .refine((data) => data.password , {
  //   message: "Password must be at least 8 characters",
  //   path: ["password"],
  // })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthTypes>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: AuthTypes) => {
    const [firstName, ...lastNameArray] = data.name?.split(" ") ?? [];
    const lastName = lastNameArray.join(" ").trimStart();
    setProcessing(true);
    axl
      .post("auth/register", {
        ...data,
        first_name: firstName,
        last_name: lastName,
      })
      .then(({ data }) => {
        storeUserInfo({
          token: data.token,
          user: data.user.id,
        });
        reset();
        setProcessing(false);
        navigate("/verification");
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
    <div className="w-screen h-screen b flex flex-col">
      <div className="flex  h-full w-full items-center ">
        <div className="md:w-[50%] p-4 h-full  bg-white w-full">
          <div className="flex w-full items-center font-bold gap-1 h-[7%]">
            <Link to={"/"} className="h-8 w-8">
              <img src={Images.logo} />
            </Link>
            <p className="">UntitleUI</p>
          </div>
          <div className=" w-full h-[93%]  flex items-center justify-center">
            <div className="h-full md:w-[50%] w-[90%] flex items-center">
              <div className="my-3 md:my-5 md:pt-10 w-full">
                <div className="">
                  <p className="font-bold">Sign up</p>
                  <p className="text-[#667085]">
                    Start your 30-day free trial.
                  </p>
                </div>
                <form
                  className="space-y-4 my-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <TextInput
                    type="text"
                    name="name"
                    label="Name*"
                    register={register}
                    error={errors.name}
                  />

                  <TextInput
                    type="text"
                    name="username"
                    label="Username*"
                    register={register}
                    error={errors.username}
                  />
                  <TextInput
                    type="email"
                    name="email"
                    label="Email*"
                    register={register}
                    error={errors.email}
                  />
                  <TextInput
                    type="password"
                    name="password"
                    label="Password*"
                    register={register}
                    error={errors.password}
                  />
                  <PrimaryButton
                    className="w-full bg-[#7F56D9] text-white h-10 rounded-lg"
                    loading={processing}
                  >
                    Create account
                  </PrimaryButton>
                </form>
                <div className=" w-full flex items-center justify-center flex-col">
                  <div className="w-full flex gap-2 justify-center my-4 text-sm">
                    <p className="text-[#667085]">Already have an account?</p>
                    <Link to={"/login"} className="text-[#7f56d9] font-medium">
                      Log in
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[50%] h-[100%]  items-center justify-center md:flex hidden">
          {/* <div
             className=" h-full w-full"
             style={{
               backgroundImage: `url(${Images.bg})`,
               backgroundSize: "contain",
               backgroundRepeat: "no-repeat",
              
             }}
           ></div> */}
          <img src={`${Images.bg}`} className="w-full h-full" />
        </div>
      </div>

      <Toaster position="top-right" />
    </div>
  );
};

export default RegisterPage;
