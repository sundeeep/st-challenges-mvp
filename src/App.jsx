import { useEffect, useState } from "react";
import AppwriteAccount from "./appwrite/Account.services";
import { useNavigate } from "react-router";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const appwriteAccount = new AppwriteAccount();
  const navigate = useNavigate();

  async function checkUserSession() {
    const user = await appwriteAccount.getAppwriteUser()
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
    </>
  )
}

export default App;