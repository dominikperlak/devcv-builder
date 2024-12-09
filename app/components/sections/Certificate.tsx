import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

const Certificate = () => {
  return (
    <div className="bg-white w-[699px] h-[294px] shadow-lg p-4 -mt-15">
      <h2 className="font-bold text-3xl text-black">Certification</h2>
      <div className="mt-4 space-y-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">Certificate Name</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">Certificate By</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <button className="flex items-center justify-center w-[179px] h-[49px] bg-[#4F29CC] text-white rounded">
          <FaArrowLeft className="mr-2" /> Previous
        </button>
        <div className="flex flex-col items-center space-y-4">
          <button className="flex items-center justify-center w-[179px] h-[49px] bg-[#4F29CC] text-white rounded">
            <span className="mr-2">Add +</span>
          </button>
          <button className="flex items-center justify-center w-[179px] h-[49px] bg-[#4F29CC] text-white rounded">
            <FaArrowRight className="ml-2" /> Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
