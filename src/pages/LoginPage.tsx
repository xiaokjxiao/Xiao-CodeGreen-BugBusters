import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check the username and password
    if (username === "admin" || username === "nonoygwapo@hotmail.com" && password === "cpus") {
      navigate(`/homepage`);
    } else {
      alert("Invalid username or password");
    }
  };

  const handleSignUpButton = () => {
    navigate("/signup");
  };

  return (
    <div className="flex justify-center items-center bg-login-bg bg-cover bg-no-repeat sm:bg-top md:bg-right lg:bg-left h-screen">
      {/* <div className="w-full max-w-3xl mb-8 mt-5">
        <LogInSignUpHeader />
      </div> */}

      <div className="flex bg-transparent p-8 rounded-lg w-full max-w-3xl mt-16">
        <div className="w-1/2 pr-8">
          <h2 className="text-3xl text-textgreen font-semibold">Access</h2>
          <h2 className="text-3xl mb-2 text-textgreen font-semibold">your account</h2>
          <h1 className="text-sm mb-1 text-white">
            Don't have an account?{" "}
            <button
              className="text-buttongreen font-bold"
              type="button"
              onClick={handleSignUpButton}
            >
              Sign Up
            </button>
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-inputfield w-full mt-1 px-4 py-2 border border-none focus:outline-none focus:ring-2 focus:ring-textgreen text-white placeholder-white rounded-sm"
                placeholder="email or phone number"
                pattern="([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(\d{10})"
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-inputfield w-full mt-1 px-4 py-2 border border-none rounded-md focus:outline-none focus:ring-2 focus:ring-textgreen rounded-sm text-white placeholder-white"
                placeholder="Enter your password"
                required
              />
              <h1 className="mt-2 text-buttongreen cursor-pointer font-bold">Forgot Password?</h1>
            </div>
            <button
              type="submit"
              className="w-1/2 bg-buttongreen text-white py-2 hover:bg-hoverbutton transition-colors rounded-sm"
            >
              Log In
            </button>
          </form>
        </div>

        <div className="w-1/2 pl-8 flex flex-col justify-center items-start text-textgreen text-4xl font-bold gap-2">
          <h1>Welcome</h1>
          <h1>Log in to monitor</h1>
          <h1>your vehicle's</h1>
          <h1>violation records.</h1>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;