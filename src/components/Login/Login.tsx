import React from "react";
import Input from "components/Input/Input";
import { useLogin } from "hooks/useLogin";

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setIsLoggedIn }: LoginProps) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    handleLogin,
    clearErrorMessage,
  } = useLogin(setIsLoggedIn);

  return (
    <div className="w-80 bg-white rounded-md p-4 mx-4">
      <div className="flex flex-col">
        <img className="mb-4" src="/pokedexlogo.png" alt="pokedexlogo" />
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={setEmail}
            onFocus={clearErrorMessage}
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
            onFocus={clearErrorMessage}
          />
        </div>
        <button
          className="rounded py-2 px-1 bg-yellow-500 text-sky-900 font-bold"
          onClick={handleLogin}
        >
          Login
        </button>
        {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
