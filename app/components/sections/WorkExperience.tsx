import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const WorkExperience = () => {
  return (
    <div className="bg-white w-[679px] h-[519px] shadow-lg p-4">
      <h2 className="font-bold text-3xl">Internship Details</h2>

      <div className="mt-4 space-y-4">
        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">Company Name</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">Post Name</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">Location</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">Duration</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold">Information</h3>
        <p className="text-sm text-gray-500">information</p>
        <input
          type="text"
          className="w-[583px] h-[104px] border border-gray-300 rounded px-2 mt-2"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button className="w-[179px] h-[49px] bg-[#4F29CC] text-white font-bold rounded flex items-center justify-center">
          <FaArrowLeft className="mr-2" />
          Previous
        </button>
        <button className="w-[179px] h-[49px] bg-[#4F29CC] text-white font-bold rounded flex items-center justify-center">
          Next
          <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default WorkExperience;
