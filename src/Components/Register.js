
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('user-info'))
        {
            navigate("/addProduct")
        }
    },[])

    async function SignUp(event) {
        event.preventDefault()
        let RegisterData = { username, email, password }

        let result = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(RegisterData)
        })
        result = await result.json()
        console.log(result)
        localStorage.setItem("user-info", JSON.stringify(result))
        navigate("/addProduct")
    }
    return (
        <>
            <Header />
            <div className="col-sm-4 mx-auto">
                <h1>Sign Up</h1>
                <form onSubmit={SignUp}>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Username" />
                    <br />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" />
                    <br />
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" />
                    <br />
                    <button className="form-control btn btn-primary">Sing Up</button>
                </form>
            </div>
        </>
    )
}
export default Register;