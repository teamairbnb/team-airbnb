
import hamburgerIcon from "../assets/hamburgerIcon.svg"; 
import notifications from "../assets/notifications.svg"; 
import chatIcon from "../assets/chatIcon.svg"; 
import profileIcon from "../assets/profileIcon.svg"; 


function NavBar() {
  return (
    <div className="flex items-center justify-between w-full max-w-[400px] px-4 py-3">
      
      <div className="flex items-center">
        <img
          src={hamburgerIcon}
          alt="Menu"
          className="h-6 w-6 cursor-pointer"
        />
      </div>

      
      <div className="flex items-center gap-4">
        <img src={chatIcon} alt="Chat" className="h-6 w-6 cursor-pointer" />
        <img src={profileIcon} alt="Profile" className="h-6 w-6 cursor-pointer" />
        <img src={notifications} alt="Notifications" className="h-6 w-6 cursor-pointer" />
      </div>
    </div>
  );
}

export default NavBar;
