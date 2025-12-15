import { Button } from "@/components/ui/button"
import AppwriteAccount from "../appwrite/Account.services"
import { useNavigate } from "react-router";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const MyDashboard = () => {

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const appwriteAccount = new AppwriteAccount();
  const navigate = useNavigate();

  async function handleLogOut() {
    setIsLoggingOut(true)
    const result = await appwriteAccount.logout();
    console.log("result");
    if (!result?.message) {
      setIsLoggingOut(false)
      navigate("/login")
    }
  }

  console.log("Renders and Re-renders");

  return (
    <div>
      <h1>Secret Page</h1>
      <Button
        disabled={isLoggingOut ? true : false}
        variant="destructive" onClick={handleLogOut}>
        {
          isLoggingOut ? (
            <p className="flex items-center gap-2">
              <Spinner />
              <span>Logging Out</span>
            </p>
          ) : "Log Out"
        }
      </Button>
    </div>
  )
}

export default MyDashboard