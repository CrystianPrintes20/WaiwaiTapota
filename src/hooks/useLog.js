import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const baseURL = "http://localhost:5000/userLog";

export default function Uselog() {
    const { data: session } = useSession();
    const [token, setToken] = useState()

    useEffect(() => {
        if (session) {
            setToken(session?.user?.token)
        }
    }, [session])

    useEffect(() => {
        axios.get(baseURL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            return response.data;
        });
    }, [token]);
}