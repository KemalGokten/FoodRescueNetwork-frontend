import {
  PasswordInput,
  Button,
  TextInput,
  Alert,
  Flex,
  Text,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Logo from "../components/ui/logo";

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
        `${
          import.meta.env.VITE_API_URL
        }/users?email=${email}&password=${password}`
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
    <Flex direction="column" justify="center" align="center">
      <Logo />
      <h3>Sign in</h3>
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

      <form onSubmit={handleSubmit}>
        <Flex direction={"column"} gap={16} w={350}>
          <TextInput
            value={email}
            variant="default"
            placeholder="User name or email"
            type="text"
            required
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
          <PasswordInput
            placeholder="Password"
            value={password}
            required
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <Button variant="filled" type="submit">
            Login
          </Button>
        </Flex>
      </form>

      <div>
        <Link to="/forgot_my_password" state={{ email }}>
          Forgot password?
        </Link>
      </div>
      <div>
        <p>
          Don't have an account?{" "}
          <Link to="/accounts/emailsignup/">Sign up</Link>{" "}
        </p>
      </div>
    </Flex>
  );
};

export default LoginPage;
