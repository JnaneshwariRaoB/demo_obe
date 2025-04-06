// components/LogoHeader.tsx
import Image from 'next/image';
import Link from 'next/link';

const LogoHeader = () => {
  return (
    <div className="text-center">
      <img
        src="https://facultytick.com/wp-content/uploads/2023/02/Sahyadri-College-of-Engineering-Management.webp"
        alt="Site Logo"
        className="h-16 md:h-20 mx-auto drop-shadow-md"
      />
      {/* Optional Title below logo */}
      {/* <h1 className="text-white text-xl mt-2 font-semibold">My Admin Panel</h1> */}
    </div>
  );
};

export default LogoHeader;
