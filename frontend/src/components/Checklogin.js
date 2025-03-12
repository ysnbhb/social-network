import { API_URL } from "@/components/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Checklogin() {
    const router = useRouter();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await fetch(`${API_URL}/api/user/checklogin`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                if (res.status === 200) {
                    router.push('/home');
                } else {
                    router.push('/login');
                }
            } catch (error) {
                console.error("Error checking login:", error);
            }
        };

        checkLogin();
    }, [router]);

    return null;
}
