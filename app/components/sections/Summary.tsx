import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const Summary = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-[679px] h-[500px] border border-gray-700 relative">
        {/* Napis w lewym górnym rogu */}
        <h1 className="absolute top-4 left-4 text-2xl font-bold">Summary</h1>

        {/* Input na środku */}
        <div className="flex flex-col items-center justify-center h-full px-4">
          {/* Napis Summary po lewej stronie */}
          <p className="text-sm text-left w-full">Summary</p>
          <input
            type="text"
            className="w-[591px] h-[265px] bg-white text-black border-2 border-black mt-2"
          />
          <div className="flex justify-between mt-8 w-full">
            <button className="w-[179px] h-[49px] bg-[#4F29CC] text-white font-bold flex items-center justify-center">
              <FaArrowLeft className="mr-2" /> Previous
            </button>
            <button className="w-[179px] h-[49px] bg-[#4F29CC] text-white font-bold flex items-center justify-center">
              Next <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
