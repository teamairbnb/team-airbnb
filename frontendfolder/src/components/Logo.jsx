import mainlogo from "../assets/images/mainlogo.png";
import logo from "../assets/images/logo.png";
function Logo() {
  return (
    <div className="flex flex-col p-[25px] -translate-y-10 w-full rounded-[50px] h-[290px] bg-cover bg-center relative" style={{backgroundImage: `url(${mainlogo})`}}>

        <div className="relative flex flex-col items-center justify-end h-full mb-4">
            <img src={logo} className="w-[65px]" alt="App logo" />
            <div className="text-white tracking-wide">
<p className="font-semibold text-[33px] mt-[8px]">RENCAR</p>
<p className="text-[14px] text-center">BUSINESS</p>
            </div>
        </div>
      
    </div>
  );
}
export default Logo;
