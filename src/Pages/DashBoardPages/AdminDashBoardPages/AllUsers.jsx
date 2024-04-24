import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All users</h2>
        <h2 className="text-3xl">Total users: {users.length}</h2>
      </div>
    </div>
  );
};

export default AllUsers;
