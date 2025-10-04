import logo from "../assets/logo.png";
import bg from "../assets/bg.png";
function Onboarding() {
  return (
    <div
      className="flex flex-col bg-cover bg-repeat  items-center h-screen w-screen"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex flex-col items-center w-full h-full">
        <img src={logo} alt="App logo" className="w-[123px] h-[118px] mt-[79px]" />
      </div>
      <div className="mt-5 mb-16">
        <button className="flex items-center justify-center gap-[10px] bg-blue-600 text-white w-[350px] h-[48px] p-2.5 rounded-[10px]">
            Get Started
        </button>
      </div>
    </div>
  );
}
export default Onboarding;
