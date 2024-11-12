import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const handleReturn = () => {
    navigate("/login");
  };
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center bg-hoverbutton bg-no-repeat sm:bg-top md:bg-right lg:bg-left h-screen">
      <div className="bg-hoverbutton p-5 rounded-sm w-">
        <div className="flex flex-col justify-center items-start font-syke-medium text-textgreen text-4xl gap-2">
          <h1>Reset Password</h1>
        </div>
        <h5 className="font-skye-regular text-white mt-2">
          Please enter your email address to request a password reset.
        </h5>

        <form className="space-y-2" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-secondgrey mt-4 font-syke-regular w-11/12 px-3 py-2 focus:shadow-inner border-none focus:outline-none focus:ring-1 focus:ring-textgreen rounded-sm text-white placeholder-white"
              placeholder="Email"
              required
            />
          </div>
        </form>
        <h1
          className="mt-4 mb-2 text-buttongreen cursor-pointer font-syke-medium text-sm"
          onClick={handleReturn}
        >
          Remembered your password?
        </h1>
        <button
          type="submit"
          className="w-1/2 bg-buttongreen text-white py-2 hover:bg-[#33471a] font-syke-regular transition-colors rounded-sm"
        >
          Send Reset Email
        </button>
      </div>
    </div>
  );
};

export default Forgot;
