import {
  Select,
  TextInput,
  PasswordInput,
  Button,
  Flex,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/ui/logo";
import { Link } from "react-router-dom";

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
      password: password,
    };

    const requestOptions = {
      method: `POST`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users`,
        requestOptions
      );
      if (response.ok) {
        navigate("/");
      } else {
        console.log("Creating a new user on signup error: response is not ok");
      }
    } catch (error) {
      console.log("Creating a new user on signup", error);
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
    <Flex direction="column" justify="center" align="center">
      <Logo />
      <h3>Signup</h3>

      <div>
        <form onSubmit={handleSubmit}>
          <Flex direction={"column"} gap={16} w={350}>
            <Select
              placeholder="Choose account type"
              data={["User", "Restaurant Owner"]}
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
            <Button variant="filled" type="submit">
              Register
            </Button>
          </Flex>
        </form>
      </div>
      <Text size="16px" my={16}>
        Already have account? <Link to={"/"}>Login</Link>
      </Text>
    </Flex>
  );
};

export default SignupPage;
