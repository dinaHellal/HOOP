export default function Thank(){
  const lastId = localStorage.getItem("lastOrderId");

  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4 text-amber-900">Thank you!</h1>
      <p className="text-gray-600">Your order has been sent successfully via WhatsApp.</p>
      {lastId && (
  <p className="mt-4 leading-13 text-amber-900  font-semibold">
    Your Order ID is: <span className="underline">{lastId}</span> <br />
    Please keep it to track your order.
  </p>
)}
    </div>
  );
}
