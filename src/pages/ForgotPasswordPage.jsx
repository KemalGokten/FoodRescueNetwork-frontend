import React, { useState } from "react";
import emailjs from "emailjs-com";
import { TextInput, Button, Alert } from "@mantine/core";
import { useLocation } from "react-router-dom";

const ForgotPasswordPage = () => {
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
      //Ask from @kemal for service and user id to test forgotPassword, never push with the code.
      await emailjs.send(
        "Requires service id",
        "template_njtbsno",
        templateParams,
        "Requires user id"
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
        `http://localhost:4000/users?email=${userEmail}`
      );
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data.");
      }

      const userDataArray = await userResponse.json();
      const userData = userDataArray[0];
      const userId = userData.id; 

      const updateUserUrl = `http://localhost:4000/users/${userId}`;

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
    <>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Email"
          placeholder="Enter your email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <Button type="submit">Send Verification Email</Button>
      </form>
      {alert && <Alert type={alert.type}>{alert.message}</Alert>}
      {verificationCode && (
        <form onSubmit={handleChangePassword}>
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
        </form>
      )}
    </>
  );
};

export default ForgotPasswordPage;
