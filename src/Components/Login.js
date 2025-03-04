import { useEffect,useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";



function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('user-info'))
        {
            navigate("/addProduct")
        }
    },[])

    async function LogIn(event) {
        event.preventDefault()
        let LoginData = {username, password}

        let result = await fetch("http://127.0.0.1:8000/api/login/",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(LoginData)
        })
        result = await result.json()
        console.log(result)
        localStorage.setItem("user-info", JSON.stringify(result))
        navigate("/addProduct")
    }
    return(
        <div>
            <Header />
            <div className="col-sm-4 mx-auto">
                <h1>Login</h1>
                <form onSubmit={LogIn}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Username" />
                    <br />
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" />
                    <br />
                    <button className="form-control btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;