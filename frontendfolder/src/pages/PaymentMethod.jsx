import Header from "../components/Header.jsx";
import Button from "../components/Button.jsx";

function PaymentMethod() {
  return (
    <div className="flex flex-col justify-center  bg-gray-50">
      <Header title="Profile/Payment Method" />

      <div className="flex flex-col items-center justify-center text-gray-500 text-center">
        <p className="text-xs p-4">
          Add and manage your payment methods conveniently and conveniently save
          your cards or banking info for easy payments.
        </p>
        <p className="bg-white p-6 border rounded">
          You have not saved any account
        </p>
      <div className="mt-5 mb-6">
        <button className="bg-blue-600 px-5 py-2 text-white rounded-xl">+ Add Payment</button>
      </div>
      </div>
    </div>
  );
}

export default PaymentMethod;
