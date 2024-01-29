// import {
//   createBrowserRouter,

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AuthLayout from "./Layouts/Auth/AuthLayout";
import RegisterPage from "./Pages/Auth/Register/RegisterPage";
import LoginPage from "./Pages/Auth/Login/LoginPage";
import OtpVerificationPage from "./Pages/Auth/OtpVerification/OtpVerificationPage";
import UserLayout from "./Layouts/UserLayout/UserLayout";
import UserDashboard from "./Pages/User/UserDashboard";

// } from "react-router-dom";
// // import HomeLayout from "./Layouts/Home/HomeLayout";
// import AuthLayout from "./Layouts/Auth/AuthLayout";
// import LoginPage from "./Pages/Auth/Login/LoginPage";
// import RegisterPage from "./Pages/Auth/Register/RegisterPage";
// import OtpVerificationPage from "./Pages/Auth/OtpVerification/OtpVerificationPage";
// import UserLayout from "./Layouts/UserLayout/UserLayout";
// import UserDashboard from "./Pages/User/UserDashboard";

// const router = createBrowserRouter(

//   [
//   // auth routes
//      {
//       path: "/",
//       element: <AuthLayout />,
//       children: [

//         {
//           path: "/",
//           element: <RegisterPage/>,
//         },

//         {
//           path: "/login",
//           element: <LoginPage />,
//         },
//         {
//           path: "/auth/verification",
//           element: <OtpVerificationPage />,
//         },
//       ],

//     },
//   // all user routes
//      {
//       path: "/user",
//       element: <UserLayout />,
//       children: [
//         {
//           path: "/user/",
//           element: <UserDashboard />,
//         },

//       ],
//   }
//   ]
// );
// export default router;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path="/" element={<AuthLayout />}>
      <Route index element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verification" element={<OtpVerificationPage  />} />
      <Route path="/dashboard" element={<UserLayout/>}>
        <Route index element={<UserDashboard/>}/>
      </Route>
      </Route>
    </Route>
  )
);

export default router;
