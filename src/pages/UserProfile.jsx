import { useNavigate } from "react-router";
import AppwriteAccount from "../appwrite/Account.services";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const UserProfile = (props) => {
  const {user} = props;

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
  return (
    <div className="flex flex-col items-start">

      <article>
        <p className="font-semibold text-red-500">{user.name}</p>
        <p>{user.email}</p>
      </article>

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

export default UserProfile