
"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import imageSrc from '../../image/vecteezy_global-business-internet-network-connection-and-social_9276510.jpg';
 

import Image from "next/image";
import { FcGoogle} from "react-icons/fc"
import axios from "axios";
export default function Login(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

    return (
        <main className="bg-[#26313c] h-screen flex items-center justify-center p-10">
            <div className="grid box-animate  w-full h-full bg-white md:grid-cols-2  ">
              <div className="bg-[#16202a] text-white flex items-center justify-center flex-col rounded-tl-lg rounded-bl-lg">
              <div className="my-4">
                 <h1 className="text-3xl font-semibold">LOGIN</h1>
                <p className="mt-2 text-xs text-slate-400">
                    {' '}
                    see your informations

                </p>
              
              </div>
              <form >
                <Button className="flex items-center w-full grp-4 px-12 bg-transparent rounded-full " variant="outline">
                <FcGoogle/>
                 Sing In With google
                </Button>
                <Label htmlFor="email" > Email </Label>
                <Input className="mt-2 bg-transparent rounded-full"
                type="email" id="email" placeholder="Email " value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />

                <Label htmlFor="password" > password </Label>
                <Input className="mt-2 bg-transparent rounded-full"
                type="password" id="password" placeholder="password " 
                
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
           
                <Button type="submit"  disabled={loading} 
                className="w-full mt-6 bg-indigo-600 rounded-full hover:bg-indigo-700">
                  {loading ? "Logging in..." : "Login"}</Button>
              </form>
              <p className="mt-4 text-xs text-slate-200">@2025 All right</p>
            </div>
            <div className="relative hidden md:block">
            <Image className="object-cover"
            src={imageSrc}
             alt="background image"
            fill
            priority
          />
           </div>
            </div>
        </main>
    )
}
 
async function Loginuse(email ,password){
  try {
    const response=await axios.post()
  } catch (error) {
    
  }
}