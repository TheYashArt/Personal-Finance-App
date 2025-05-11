import { useNavigate } from "react-router-dom"

function Header(){
    const nav = useNavigate()
    return(
        <div className="bg-white text-red-600 font-medium text-3xl flex justify-start items-center h-[60px] " >
            <div onClick={()=>{nav("/")}} className="ml-6">
                Finance Manager
            </div>
        </div>
    )
}
export default Header