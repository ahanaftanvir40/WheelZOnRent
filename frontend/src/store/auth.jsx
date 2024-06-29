import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext()





export const AuthProvider = ({ children }) => {

    //To get the current logged in user data
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)


    const userAuthentication = async () => {

        try {
            setIsLoading(true)
            let response = await axios.get(`http://localhost:3000/api/user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            if (response.status === 200) {
                console.log('Auth user: ', response);
                setUser(response.data)
                setIsLoading(false)
            } else {
                console.log('error fetching');
                setIsLoading(false)
            }

        } catch (error) {
            console.log(error);
        }




    }

    useEffect(() => {
        userAuthentication()
    }, [])



    return (
        <AuthContext.Provider value={{ user, isLoading }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext)
}
