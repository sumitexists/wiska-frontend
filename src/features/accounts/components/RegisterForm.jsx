import { useState, useRef } from "react";
import { NavLink, Link , useNavigate } from "react-router-dom";
import InputField from "../../../components/ui/InputField";
import Button from "../../../components/ui/Button";
import { registerService } from "../../../services/authServices";
function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const usernameErrorRef = useRef(null);
  const emailErrorRef = useRef(null);
  const passwordErrorRef = useRef(null);

  const hasBothPassword = confirmPassword && password;
  const isMatch = confirmPassword === password;

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (!isMatch) {
      return;
    }
    try {
      const response = await registerService({
        username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        re_password: confirmPassword,
      });
      if (response.status === 201) {
        navigate("/");
      } else if (response.status === 400) {
        if (response.data.username) {
          usernameErrorRef.current.textContent = response.data.username[0];
          usernameErrorRef.current.classList.remove("hidden");
        }
        if (response.data.email) {
          emailErrorRef.current.textContent = response.data.email[0];
          emailErrorRef.current.classList.remove("hidden");
        }
        if (response.data.password) {
          passwordErrorRef.current.textContent = response.data.password[0];
          passwordErrorRef.current.classList.remove("hidden");
        }
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <form
      className="flex flex-col justify-center items-center gap-y-6 w-full max-w-lg pt-10 pb-50 px-10 m-auto backdrop-blur-md bg-cyan-100/10 border border-white/30 shadow-xl rounded-2xl text-white h-screeen"
      onSubmit={handleRegisterUser}
    >
      <h2 className="self-start text-5xl tracking-tighter mb-6 text-white font-bold font-grotesk">
        Register ,here!
      </h2>
      <NavLink
        to="/"
        className="text-4xl mr-10 bg-gradient-to-r from-white to-cyan-500 bg-clip-text text-transparent font-semibold font-kranky"
      >
        WISKA
      </NavLink>
      <div className="flex flex-col w-full">
        <InputField
        placeholder="&#x1F464; Username"
        type="text"
        value={username}
        onChange={(e) => {
          if (usernameErrorRef.current) {
            usernameErrorRef.current.classList.add("hidden");
          }
          setUsername(e.target.value);
        }}
      />
      <p ref={usernameErrorRef} className="text-red-500 text-sm hidden pl-6"></p>
      </div>
      <div className="flex flex-col w-full">
        <InputField
        placeholder="📧 Email"
        type="email"
        value={email}
        onChange={(e) => {
          if (emailErrorRef.current) {
            emailErrorRef.current.classList.add("hidden");
          }
          setEmail(e.target.value);
        }}
      />
      <p ref={emailErrorRef} className="text-red-500 text-sm hidden pl-6"></p>
      </div>
      
      <div className="flex gap-x-4 w-sm">
        <InputField
          placeholder="First Name"
          type="text"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <InputField
          placeholder="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full">
        <InputField
        placeholder="&#x1F512;Password"
        type="password"
        value={password}
        onChange={(e) => {
          if (passwordErrorRef.current) {
            passwordErrorRef.current.classList.add("hidden");
          }
          setPassword(e.target.value);
        }}
      />
      <p ref={passwordErrorRef} className="text-red-500 text-sm hidden pl-6"></p>
      </div>
      
      <div className="flex flex-col w-sm gap-y-1">
        <p
          className={`text-sm mt-1 gap-1 font-medium ${hasBothPassword ? (isMatch ? "text-green-600 block" : "text-red-500 block") : "hidden"}`}
        >
          {hasBothPassword
            ? isMatch
              ? "✓ Passwords match"
              : "✕ Passwords do not match"
            : ""}
        </p>
        <InputField
          placeholder="&#x1F512;Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>
      <Link
        to="/login"
        className=" self-start text-blue-400 ml-6 mb-8 hover:text-blue-500 hover:underline tracking-tighter"
      >
        Already have an account?
      </Link>
      <Button text="Register" className="w-30% text-[18px]" />
    </form>
  );
}

export default RegisterForm;
