import successIcon from "../assets/successIcon.png";

function BookingSuccess() {
  return (
    <div className="flex flex-col mt-10 w-full min-h-screen px-4 text-center bg-white">
      

      <div className="flex flex-col items-center justify-center mt-12">

        


        <h1 className="text-2xl font-bold mb-3">Booking was successful</h1>

     
        <p className="text-[#717171] max-w-sm text-sm leading-relaxed">
          Your trip is now officially confirmed! <br />
          We've sent the details and confirmation number to your email address.
          You're all set and ready to go!
        </p>

        <img src={successIcon} alt="Success" className="mt-7" />
      </div>
    </div>
  );
}

export default BookingSuccess;
