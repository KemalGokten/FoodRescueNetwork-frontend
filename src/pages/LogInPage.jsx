import { PasswordInput ,Button , TextInput} from '@mantine/core';
import {Link}  from "react-router-dom";
import {useState} from "react"
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

   const loginUser = async()=>{
    try {
        const response = await fetch(`http://localhost:4000/users?email=${email}&password=${password}`)

        if (response.ok) {
            const usersData = await response.json();
            if(usersData.length===0){
                alert("Email or password is wrong");
            }
            else{
                navigate("/");
            }
        }
        else{
            console.log("Creating a new user on signup error: response is not ok")
        }
        
    } catch (error) {
        console.log("Login the user:", error)
    }
   }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser();
        
    };

    return (
        <>
            <h1>
                Login Page
            </h1>

            <div>
                <img src="" alt="App Logo" />
                <h2>Food Rescue</h2>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <TextInput value={email} variant="default" radius="md" placeholder="User name or email" type='text' required onChange={(event) => setEmail(event.currentTarget.value)} />;
                    <PasswordInput
                        radius="md"
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(event) => setPassword(event.currentTarget.value)}
                    />
                    <Button variant="filled" type="submit">Login</Button>

                </form>

            </div>
            <div>
                <p>Don't have an account? <Link to="/accounts/emailsignup/">Sign up</Link> </p>
            </div>
        </>
    );
}

export default LoginPage;