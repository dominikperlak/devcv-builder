import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';
import { FaFill, FaEye, FaDownload, FaArrowCircleUp } from 'react-icons/fa';
import { GrTemplate } from 'react-icons/gr';

const Settings = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-[319px] h-[702px] bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">Resume Settings</h2>
          <p className="text-sm mb-4">
            There are many variations of passage of lorem ipsum dummy text
            available online
          </p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Templates</h3>
            <div className="flex flex-col items-center">
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="w-full h-full"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-sm mt-2">Classic</p>

              <button className="mt-4 w-[179px] h-[49px] bg-[#4F29CC] text-white text-lg font-bold flex items-center justify-center rounded">
                Change Template
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Template Options</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-[127px] h-[60px] bg-white border border-gray-200 shadow-lg flex flex-col items-center justify-center rounded">
                <FaFill className="text-[#4F29CC] text-2xl mb-2" />
                <p className="text-sm">Fill Selection</p>
              </div>
              <div className="w-[127px] h-[60px] bg-white border border-gray-200 shadow-lg flex flex-col items-center justify-center rounded">
                <GrTemplate className="text-[#4F29CC] text-2xl mb-2" />
                <p className="text-sm">Change Template</p>
              </div>
              <div className="w-[127px] h-[60px] bg-white border border-gray-200 shadow-lg flex flex-col items-center justify-center rounded">
                <FaEye className="text-[#4F29CC] text-2xl mb-2" />
                <p className="text-sm">Preview Resume</p>
              </div>
              <div className="w-[127px] h-[60px] bg-white border border-gray-200 shadow-lg flex flex-col items-center justify-center rounded">
                <FaDownload className="text-[#4F29CC] text-2xl mb-2" />
                <p className="text-sm">Download PDF</p>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <div className="w-[127px] h-[60px] bg-white border border-gray-200 shadow-lg flex flex-col items-center justify-center rounded">
                <FaArrowCircleUp className="text-[#4F29CC] text-2xl mb-2" />
                <p className="text-sm">Upgrade</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Color Settings</h3>
            <div className="flex space-x-2">
              <div className="w-[26px] h-[25px] bg-[#4F29CC] rounded-full"></div>
              <div className="w-[26px] h-[25px] bg-red-500 rounded-full"></div>
              <div className="w-[26px] h-[25px] bg-green-300 rounded-full"></div>
              <div className="w-[26px] h-[25px] bg-orange-400 rounded-full"></div>
              <div className="w-[26px] h-[25px] bg-blue-300 rounded-full"></div>
              <div className="w-[26px] h-[25px] bg-pink-300 rounded-full"></div>
              <div className="w-[26px] h-[25px] bg-purple-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
