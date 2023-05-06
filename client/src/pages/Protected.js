import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";


const Protected = ({children}) => {
    const {user} = useAppContext();
    if(!user){
        return <Navigate to='/landing' />
    }
    return children
  
}

export default Protected