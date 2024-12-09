import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Education = () => {
  return (
    <div className="bg-white w-[679px] h-[696px] shadow-lg p-4">
      <h2 className="font-bold text-3xl">Secondary Education</h2>

      <div className="mt-4 space-y-4">
        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">School Name</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">
              Board of Examination
            </label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">Stream</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">
              Marks Obtained (%)
            </label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
        </div>
      </div>

      <h2 className="font-bold text-3xl mt-6">Higher Secondary Education</h2>

      <div className="mt-4 space-y-4">
        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">Collage Name</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">
              Board of Examination
            </label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">Stream</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">
              Marks obtained (%)
            </label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
        </div>
      </div>

      <h2 className="font-bold text-3xl mt-6">Degree</h2>

      <div className="mt-4 space-y-4">
        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">Collage Name</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">University</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">Stream</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-lg">CGPA</label>
            <input
              type="text"
              className="w-[239px] h-[23px] border border-gray-300 rounded px-2"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button className="w-[179px] h-[49px] bg-[#4F29CC] text-white rounded flex items-center justify-center">
          <FaArrowLeft className="mr-2" />
          Previous
        </button>
        <button className="w-[179px] h-[49px] bg-[#4F29CC] text-white rounded flex items-center justify-center">
          Next
          <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Education;
