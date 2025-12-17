import { useEffect, useState } from "react";
import AppwriteAccount from "./appwrite/Account.services";
import { Link, useNavigate } from "react-router";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const appwriteAccount = new AppwriteAccount();
  const navigate = useNavigate();

  async function checkUserSession() {
    const user = await appwriteAccount.getAppwriteUser()
    setUser(user);
    if (!user) {
      console.log("User Not Found! at / home route")
      navigate("/login");
    }
    setIsLoading(false)
  }

  // componentDidMount()
  useEffect(() => {
    checkUserSession();
  }, []);

  if (isLoading) {
    return (
      <>
        <h1 className="font-bold text-5xl">Loading...</h1>
      </>
    )
  }

  return (
    <>
      <h1 className="font-bold text-5xl">Social Media Feed</h1>
      <nav className="bg-red-300 rounded-full p-3 flex items-center gap-5">
        {
          user.labels.includes('admin') && <Link to="/dashboard">My Dashboard</Link>
        }
        <Link to="/profile">My Profile</Link>
        
      </nav>
    </>
  )
}

export default App;