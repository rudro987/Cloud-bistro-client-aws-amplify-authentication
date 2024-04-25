import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateItem = () => {
  const { _id, name, category, receipe, price } = useLoaderData();
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const itemInfo = {
      name: data.name,
      category: data.category,
      price: data.price,
      receipe: data.receipe,
    };
    // Update item data and send to server
    const res = await axiosSecure.patch(`/menu/${_id}`, itemInfo);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${data.name} updated successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <SectionTitle
        heading="Update an Item"
        subHeading="Update Info"
      ></SectionTitle>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full mb-6">
            <label className="label">
              <span className="label-text">Reciepe Name *</span>
            </label>
            <input
              type="text"
              placeholder="Receipe Name"
              defaultValue={name}
              {...register("name", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex gap-6">
            {/* Category */}
            <div className="form-control w-full mb-6">
              <label className="label">
                <span className="label-text">Category *</span>
              </label>
              <select
                defaultValue={category}
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
            {/* Price */}

            <div className="form-control w-full mb-6">
              <label className="label">
                <span className="label-text">Price *</span>
              </label>
              <input
                type="numebr"
                placeholder="Price"
                defaultValue={price}
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="form-control w-full mb-6">
            <label className="label">
              <span className="label-text">Receipe Details</span>
            </label>
            <textarea
              {...register("receipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Receipe Details"
              defaultValue={receipe}
            ></textarea>
          </div>

          <button className="btn btn-accent">
            Update Item <FaUtensils className="text-xl"></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
