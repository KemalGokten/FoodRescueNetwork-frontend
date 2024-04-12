import { Select, TextInput, PasswordInput, Button } from '@mantine/core';
import { useState } from "react"
import { useNavigate } from 'react-router-dom';


const SignupPage = () => {
    const [accountType, setAccountType] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const createUser = async () => {
        const payload = {
            accountType: accountType,
            email: email,
            fullName: fullName,
            userName: userName,
            password: password
        }

        const requestOptions = {
            method: `POST`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }

      try {
        const response = await fetch(`http://localhost:4000/users`, requestOptions);
        if (response.ok) {
            navigate("/");
        }
        else{
            console.log("Creating a new user on signup error: response is not ok")
        }
        
      } catch (error) {
        console.log("Creating a new user on signup", error)
        
      }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (accountType === "") {
            return;
        }

        createUser();
        console.log("Submit is succesful");
    };



    return (
        <>
            <h1>Signup Page</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <Select
                        placeholder="Choose account type"
                        data={['User', 'Restaurant Owner']}
                        value={accountType}
                        onChange={setAccountType}
                        error={accountType ? "" : "Please choose account"}
                    />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    <TextInput
                        placeholder="Full name"
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                        required
                    />
                    <TextInput
                        placeholder="Username"
                        value={userName}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                    />
                    <PasswordInput
                        radius="md"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <Button variant="filled" type="submit">Register</Button>
                </form>
            </div>

        </>

    );
}

export default SignupPage;