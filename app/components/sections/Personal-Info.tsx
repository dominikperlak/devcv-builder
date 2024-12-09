import { FaArrowRight } from 'react-icons/fa';

const PersonalInfo = () => {
  return (
    <div className="bg-white w-[679px] h-[567px] relative p-4 shadow-lg">
      <h2 className="absolute top-4 left-4 font-bold text-3xl">
        Personal Info
      </h2>

      <div className="mt-16 flex space-x-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-lg">First Name</label>
          <input
            type="text"
            className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
          />
          <label className="mt-4 mb-1 font-medium text-lg">Phone Number</label>
          <input
            type="text"
            className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
          />
          <p className="mt-4 font-bold text-2xl">Other Info</p>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium text-lg">Last Name</label>
          <input
            type="text"
            className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
          />
          <label className="mt-4 mb-1 font-medium text-lg">Email ID</label>
          <input
            type="email"
            className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">Hacker Rank</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">Github</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">LinkedIn</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">Code - Chef</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">LeetCode</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">Geek for Geek</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <div className="flex items-center justify-center w-[179px] h-[49px] bg-[#4F29CC] text-white font-bold">
            <span>Next</span>
            <FaArrowRight className="ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
