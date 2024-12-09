import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

const Projects = () => {
  return (
    <div className="bg-white w-[689px] h-[472px] shadow-lg p-4">
      <h2 className="font-bold text-3xl">Projects</h2>

      <div className="mt-4 space-y-4">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">Project Name</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">
              Select Project Type
            </label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col w-[582px]">
          <label className="block mb-1 font-medium text-lg">
            Project Information
          </label>
          <input
            type="text"
            className="h-[195px] border border-gray-300 rounded px-2"
          />
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

export default Projects;
