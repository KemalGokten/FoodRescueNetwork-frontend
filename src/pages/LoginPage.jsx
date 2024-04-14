import { PasswordInput, Button, TextInput, Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const LoginPage = () => {
  //States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const icon = <IconInfoCircle />;

  const loginUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/users?email=${email}&password=${password}`
      );

      if (response.ok) {
        const usersData = await response.json();
        if (usersData.length === 0) {
          setAlert({
            title: "Alert",
            message: "Email or password is wrong",
            color: "red",
          });
        } else {
          login(usersData[0]);
          navigate("/");
        }
      } else {
        console.log("Creating a new user on signup error: response is not ok");
      }
    } catch (error) {
      console.log("Login the user:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <>
      <h1>Login Page</h1>

      {alert && (
        <Alert
          variant="light"
          color={alert.color}
          title={alert.title}
          icon={icon}
          withCloseButton
          closeButtonLabel="Dismiss"
          onClose={() => setAlert(false)}
        >
          {alert.message}
        </Alert>
      )}

      <div>
        <img src="" alt="App Logo" />
        <h2>Food Rescue</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <TextInput
            value={email}
            variant="default"
            radius="md"
            placeholder="User name or email"
            type="text"
            required
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
          ;
          <PasswordInput
            radius="md"
            placeholder="Password"
            value={password}
            required
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <Button variant="filled" type="submit">
            Login
          </Button>
        </form>
      </div>
      <div>
        <p>
          Don't have an account?{" "}
          <Link to="/accounts/emailsignup/">Sign up</Link>{" "}
        </p>
      </div>
    </>
  );
};

export default LoginPage;
