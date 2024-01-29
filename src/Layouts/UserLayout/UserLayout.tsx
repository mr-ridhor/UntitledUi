import { Outlet } from "react-router"


const UserLayout = () => {
  return (
    <div className="h-screen w-screen">
        <Outlet/>
      </div>
  )
}

export default UserLayout