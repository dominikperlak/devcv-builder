import { AiFillDashboard } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';

const Navbar = () => {
  return (
    <div className="h-16 bg-[#4F29CC] flex items-center justify-between px-4">
      <div className="flex items-center flex-grow justify-end">
        {' '}
        {/* Przyciski po prawej stronie */}
        <div className="flex items-center mx-2">
          <AiFillDashboard className="text-white text-3xl mr-2" />
          <p className="text-white text-sm font-semibold">Dashboard</p>
        </div>
        <div className="flex items-center mx-2">
          <BsFillPeopleFill className="text-white text-3xl mr-2" />
          <p className="text-white text-sm font-semibold">About Us</p>
        </div>
      </div>

      <div className="flex items-center ml-4">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src="https://github.com/shadcn.png"
            className="w-full h-full"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="text-white text-sm font-semibold">John Doe</p>
          <p className="text-white text-xs">Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
