import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import Swal from 'sweetalert2'

const FoodCard = ({ item }) => {

  const {user} = useAuth();
  const { _id, image, price, recipe, name } = item;
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const handleAddToCart = food => {
    if(user){
     //asdasd 
     const cartItem = {
      menuId: _id,
      email:user,
      name,
      image,
      price
     }

    }
    else{
      Swal.fire({
        title: "You are not logged in",
        text: "Please login to add to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go to Login"
      }).then((result) => {
        if (result.isConfirmed) {
          //send the user to login page
          navigate('/login', {state: {from: location}});
        }
      });
    }
  }


  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={name} />
      </figure>
      <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">
        ${price}
      </p>
      <div className="card-body">
        <h2 className="card-title justify-center">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-center">
          <button
            onClick={() => handleAddToCart(item)}
            className="btn btn-outline bg-slate-200 border-0 border-b-4 border-orange-400 mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
