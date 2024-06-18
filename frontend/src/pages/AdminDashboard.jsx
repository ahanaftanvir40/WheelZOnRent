import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../store/auth"

function AdminDashboard() {
    const { user, isLoading } = useAuth()
    if (isLoading) {
        return <h1>....Loading</h1>
    }
    
    const [users, setUsers] = useState([])

    //console.log('from admindash: ', user.isAdmin);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/admin/allusers`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                })
                console.log('from response admin: ', response.data);
                setUsers(response.data)
            } catch (error) {
                console.log(error);
            }

        }
        fetchUsers()
    }, [])

    return (
        <div>
            <h1>Welcome Admin</h1>
            {users.map((value) => (
                <div key={value._id}>
                    <h1>{value.name}</h1>
                </div>
            ))}
        </div>
    )
}

export default AdminDashboard
