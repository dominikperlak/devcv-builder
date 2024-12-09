'use client';
import { FaUserCircle } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { signIn } from 'next-auth/react';

const AuthLayout = () => {
  const handleGitHubLogin = async () => {
    await signIn('github', {
      callbackUrl: window.location.origin,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[532px] h-[708px] bg-white border border-black rounded-[50%] p-6">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <FaUserCircle className="text-gray-400 w-32 h-32" />
        </div>

        <h2 className="font-bold text-2xl text-black text-center mb-2">User</h2>
        <h3 className="font-medium text-lg text-black text-center mb-2">
          Sign-in
        </h3>
        <p className="text-center mb-4">Use your Mail Account</p>

        <div className="flex flex-col items-center space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-[349px] h-[43px] border border-gray-300 rounded px-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-[349px] h-[43px] border border-gray-300 rounded px-2"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button className="w-[163px] h-[46px] bg-[#1A73E8] text-white rounded flex items-center justify-center">
            Sign-in
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleGitHubLogin}
            className="flex items-center justify-center w-[163px] h-[46px] bg-black text-white rounded"
          >
            <FaGithub className="mr-2" /> Log in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
