import Link from 'next/link';
import { FiUsers } from 'react-icons/fi';
import { CgFileDocument } from 'react-icons/cg';
import { MdOutlineWork, MdSchool, MdComputer } from 'react-icons/md';
import { BsBook } from 'react-icons/bs';
import { BiWorld } from 'react-icons/bi';
import { TfiMedallAlt } from 'react-icons/tfi';

const Sections = () => {
  return (
    <div className="flex justify-start items-start h-full pt-8">
      <div className="w-[252px] h-[550px] bg-white p-4">
        <h2 className="text-center text-2xl font-bold mb-4">
          Fill the Section
        </h2>
        <p className="text-center text-lg mb-4">Select the Section</p>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/info">
            <div className="w-[82px] h-[78px] bg-white shadow-lg flex flex-col justify-center items-center">
              <div className="flex flex-col items-center">
                <FiUsers className="text-3xl mb-2 text-[#4F29CC]" />
                <p className="text-sm font-medium text-center">Personal Info</p>
              </div>
            </div>
          </Link>

          <Link href="/summary">
            <div className="w-[82px] h-[78px] bg-white shadow-lg flex flex-col justify-center items-center">
              <div className="flex flex-col items-center">
                <CgFileDocument className="text-3xl mb-2 text-[#4F29CC]" />
                <p className="text-sm font-medium text-center">Summary</p>
              </div>
            </div>
          </Link>

          <Link href="/experience">
            <div className="w-[82px] h-[78px] bg-white shadow-lg flex flex-col justify-center items-center">
              <div className="flex flex-col items-center">
                <MdOutlineWork className="text-3xl mb-2 text-[#4F29CC]" />
                <p className="text-sm font-medium text-center">
                  Work Experience
                </p>
              </div>
            </div>
          </Link>

          <Link href="/education">
            <div className="w-[82px] h-[78px] bg-white shadow-lg flex flex-col justify-center items-center">
              <div className="flex flex-col items-center">
                <BsBook className="text-3xl mb-2 text-[#4F29CC]" />
                <p className="text-sm font-medium text-center">Education</p>
              </div>
            </div>
          </Link>

          <Link href="/language">
            <div className="w-[82px] h-[78px] bg-white shadow-lg flex flex-col justify-center items-center">
              <div className="flex flex-col items-center">
                <BiWorld className="text-3xl mb-2 text-[#4F29CC]" />
                <p className="text-sm font-medium text-center">Language</p>
              </div>
            </div>
          </Link>

          <Link href="/projects">
            <div className="w-[82px] h-[78px] bg-white shadow-lg flex flex-col justify-center items-center">
              <div className="flex flex-col items-center">
                <TfiMedallAlt className="text-3xl mb-2 text-[#4F29CC]" />
                <p className="text-sm font-medium text-center">
                  Area of Expertise
                </p>
              </div>
            </div>
          </Link>

          <Link href="/course">
            <div className="w-[82px] h-[78px] bg-white shadow-lg flex flex-col justify-center items-center">
              <div className="flex flex-col items-center">
                <MdSchool className="text-3xl mb-2 text-[#4F29CC]" />
                <p className="text-sm font-medium text-center">Course</p>
              </div>
            </div>
          </Link>

          <Link href="/certification">
            <div className="w-[82px] h-[78px] bg-white shadow-lg flex flex-col justify-center items-center">
              <div className="flex flex-col items-center">
                <MdComputer className="text-3xl mb-2 text-[#4F29CC]" />
                <p className="text-sm font-medium text-center">
                  Computer Skills
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="w-[179px] h-[49px] bg-[#4F29CC] shadow-lg flex justify-center items-center mt-4 mx-auto">
          <p className="text-lg text-center text-white font-semibold">
            Text Section
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sections;
