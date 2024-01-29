import { BounceLoader } from "react-spinners";

const PageLoader = () => {
  return (
    <div className="w-full h-full  flex items-center justify-center">
      <BounceLoader />
    </div>
  );
};

export default PageLoader;