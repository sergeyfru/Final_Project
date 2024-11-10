import Login from "../features/users/Login";
import { useEffect, useState } from "react";
import { ProviderProps } from "../types/type";
import { callApi } from "../service/CallApi";

const Auth = ({ children }: ProviderProps) => {
    const refreshToken = localStorage.getItem("refresh");
    const token = localStorage.getItem("u_token");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        verify();
    }, []);

    const verify = async () => {
        console.log("AUTH", "token", token, "refreshToken", refreshToken);

        try {
            const response = await callApi(`/users/verify`, "post", {
                config: {
                    headers: {
                        "x-access-token": token,
                        "x-refresh-token": refreshToken,
                    },
                },
            });
            if (response.status === 200) {
                setRedirect(true);
            } else {
                console.log(response);
            }
        } catch (error) {
            setRedirect(false);
        }
    };

    return redirect ? (
        children
    ) : (
        <>
            Not Authorised <Login page={"Login"} />
        </>
    );
};

export default Auth;
