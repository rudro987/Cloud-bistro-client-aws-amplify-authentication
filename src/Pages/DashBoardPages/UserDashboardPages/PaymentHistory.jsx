import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  console.log(user);

  const { data: paymentsHistory = [] } = useQuery({
    queryKey: ["paymentHistory", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user}`);
      return res.data;
    },
  });

  console.log(paymentsHistory);

  return (
    <div>
      <h2 className="text-3xl">Total payments: {paymentsHistory.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Paid amount</th>
              <th>Transaction Id</th>
              <th>User Email</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {
                paymentsHistory.map((payment, index) => <tr key={payment._id}>
                    <th>{index + 1}</th>
                    <td>{payment.price}</td>
                    <td>{payment.transactionId}</td>
                    <td>{payment.email}</td>
                    <td>{payment.status}</td>
                </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
