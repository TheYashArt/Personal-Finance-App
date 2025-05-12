import { useNavigate } from "react-router-dom"

function UserProfile(){
    const nav = useNavigate()
    function handleLogOut(){
        localStorage.removeItem("user")
        nav("/Login")
    }
    return(
        <div>
            
            <button onClick={handleLogOut}>
                log out
            </button>
        </div>
    )
}
export default UserProfile