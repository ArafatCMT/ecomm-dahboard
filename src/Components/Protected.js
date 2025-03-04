import { useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";


function Protected(props){
    const navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem('user-info'))
            {
                navigate("/login")
            }
    })
   let Cmp = props.Cmp
    return(
       <>
       <Cmp/>
       </>
    )
}
export default Protected;