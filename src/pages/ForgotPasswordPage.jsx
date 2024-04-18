import React, { useState } from "react";
import emailjs from "emailjs-com";
import { TextInput, Button, Alert, Flex, Text } from "@mantine/core";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../components/ui/logo";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { email } = location.state || {};
  const [userEmail, setUserEmail] = useState(email);
  const [verificationCode, setVerificationCode] = useState("");
  const [inputVerificationCode, setInputVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [alert, setAlert] = useState(null);

  const generateFourDigitCode = () => {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const sendVerificationEmail = async () => {
    const code = generateFourDigitCode().toString();
    setVerificationCode(code);

    try {
      const templateParams = {
        from_name: "Food Rescue Network",
        to_email: userEmail,
        verification_code: code,
      };

      await emailjs.send(
        `${import.meta.env.VITE_EMAILJS_SERVICE_ID}`,
        `${import.meta.env.VITE_EMAILJS_TEMPLATE_ID}`,
        templateParams,
        `${import.meta.env.VITE_EMAILJS_USER_ID}`
      );

      setAlert({ type: "success", message: "Verification email sent." });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to send verification email.",
      });
      console.error("Error sending verification email:", error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (verificationCode !== inputVerificationCode) {
      setAlert({ type: "error", message: "Wrong verification code" });
      return;
    }

    try {
      // Fetch the user data
      const userResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/users?email=${userEmail}`
      );
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data.");
      } else {
        setAlert({
          type: "success",
          message: "",
        });

        notifications.show({
          title: "Change your password",
          message:
            "Your Password changed successfully. You will be directing to Login page!",
        });
        setTimeout(() => navigate("/"), 2000);
      }

      const userDataArray = await userResponse.json();
      const userData = userDataArray[0];
      const userId = userData.id;

      const updateUserUrl = `${import.meta.env.VITE_API_URL}/users/${userId}`;

      const updateResponse = await fetch(updateUserUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...userData, password: newPassword }),
      });

      if (updateResponse.ok) {
        setAlert({
          type: "success",
          message: "Password changed successfully.",
        });
      } else {
        console.log("Password change response is not ok");
      }
    } catch (error) {
      setAlert({ type: "error", message: "Failed to change password." });
      console.error("Error changing password:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendVerificationEmail();
  };

  return (
    <Flex direction="column" justify="center" align="center">
      <Logo />
      <h3>Forgot Password</h3>
      <Text w={350} mb={32}>
        Enter the email address ascociated to your account and we will send you
        a code to reset your password.{" "}
      </Text>
      <form onSubmit={handleSubmit}>
        <Flex direction={"column"} gap={16} w={350}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <Button type="submit">Send Verification Email</Button>
        </Flex>
      </form>
      {alert && (
        <Alert my={16} type={alert.type}>
          {alert.message}
        </Alert>
      )}
      {verificationCode && (
        <form onSubmit={handleChangePassword}>
          <Flex direction={"column"} gap={16} w={350}>
            <TextInput
              label="Verification Code"
              placeholder="Enter verification code"
              onChange={(e) => setInputVerificationCode(e.target.value)}
              required
            />
            <TextInput
              label="New Password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Button type="submit">Change Password</Button>
          </Flex>
        </form>
      )}
    </Flex>
  );
};

export default ForgotPasswordPage;
