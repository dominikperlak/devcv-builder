import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

const TechnicalSkills = () => {
  return (
    <div className="bg-white w-[679px] h-[234px] shadow-lg p-4 -mt-15">
      <h2 className="font-bold text-3xl text-black">Technical Skills</h2>
      <div className="mt-4 space-y-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">Skills</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">Level</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button className="flex items-center justify-center w-[179px] h-[49px] bg-[#4F29CC] text-white rounded">
          <FaArrowLeft className="mr-2" /> Previous
        </button>
        <button className="flex items-center justify-center w-[179px] h-[49px] bg-[#4F29CC] text-white rounded">
          <FaArrowRight className="ml-2" /> Next
        </button>
      </div>
    </div>
  );
};

export default TechnicalSkills;
