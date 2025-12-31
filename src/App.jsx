import { useEffect, useState } from "react";
import AppwriteAccount from "./appwrite/Account.services";
import { Link, useNavigate } from "react-router";
import useAuthStore from "./store/authStore";
import { getAllChallenges } from "./utils/appwrite/challengesTableOps.js";

function App() {
  const appwriteAccount = new AppwriteAccount();
  const navigate = useNavigate();

  const currentUser = useAuthStore((state) => state.currentUser) // schedules the component re-render
  const isCheckingUser = useAuthStore((state) => state.isCheckingUser)
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser)
  const setIsCheckingUser = useAuthStore((state) => state.setIsCheckingUser)

  const [challenges, setChallenges] = useState(null);

  console.log("Component Renders...")
  // console.log(currentUser); // null
  console.log(setCurrentUser); // fn body

  async function getCurrentUser() {

    const user = await appwriteAccount.getAppwriteUser()
    console.log("Current User from appwrite: ", user);
    setCurrentUser(user);
    if (!user) {
      console.log("User Not Found! at / home route")
      navigate("/login");
    }
    console.log("After calling the function from zustand")
    setIsCheckingUser();
  }

  // componentDidMount()
  useEffect(() => {
    getCurrentUser();
  }, []);

  async function getChallenges() {
    const allChallenges = await getAllChallenges();
    console.log(allChallenges)
    setChallenges(allChallenges);
  }

  useEffect(() => {
    console.log("Component Re-rendered because of change in currentUser")
    if (currentUser?.status) {
      getChallenges()
    }
  }, [currentUser])

  if (isCheckingUser) {
    return (
      <>
        <h1 className="font-bold text-5xl">Loading...</h1>
      </>
    )
  }

  function handleClickOnChallenge(challengeId){
    navigate(`/challenges/${challengeId}`)
  }

  return (
    <>
      <h1 className="font-bold text-5xl">Social Media Feed</h1>
      <nav className="bg-red-300 rounded-full p-3 flex items-center gap-5">
        {
          currentUser.labels.includes('admin') && <Link to="/dashboard">My Dashboard</Link>
        }
        <Link to="/profile">My Profile</Link>
      </nav>

      <main>
        <section>
          {
            challenges && challenges?.map((challenge) => (
              <article onClick={() => handleClickOnChallenge(challenge?.$id)} className="border rounded-2xl p-6 bg-red-200" key={challenge.$id}>
                <p className="font-semibold text-lg">{challenge.title ? challenge.title : "Untitled"}</p>
                <p>{challenge.description ? challenge.description : "No Description"}</p>
              </article>
            ))
          }
        </section>
      </main>
    </>
  )
}

export default App;