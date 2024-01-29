import ProtectedRoute from "./Partials/ProtectedRoute"


const UserDashboard = () => {
  return (
    <div className="h-full w-full">
      <ProtectedRoute/>
    </div>
  )
}

export default UserDashboard