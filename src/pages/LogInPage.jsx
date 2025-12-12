import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import AppwriteAccount from "../appwrite/Account.services"
import { useNavigate } from "react-router"

function LogInPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleNavigateToRegisterPage(){
        navigate("/register")
    }

    const appwriteAccount = new AppwriteAccount();

    async function handleLogInUser(){
        const result = await appwriteAccount.createAppwriteEmailPasswordSession(email, password);
        console.log(result)
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>
                        <Button onClick={handleNavigateToRegisterPage}>Sign Up</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    onChange={() => setEmail(event.target.value)}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                onChange={() => setPassword(event.target.value)}
                                id="password" type="password" required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button onClick={handleLogInUser} className="w-full">
                        Login
                    </Button>
                    <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}



export default LogInPage;