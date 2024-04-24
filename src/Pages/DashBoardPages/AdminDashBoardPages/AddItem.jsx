import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";

const AddItem = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <SectionTitle
        heading="add an item"
        subHeading="what's new"
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
              {...register("name", {required: true})}
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
                {...register("category", {required: true})}
                className="select select-bordered w-full"
              >
                <option disabled selected>
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
                {...register("price", {required: true})}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="form-control w-full mb-6">
            <label className="label">
              <span className="label-text">Receipe Details</span>
            </label>
            <textarea {...register("receipe", {required: true})} className="textarea textarea-bordered h-24" placeholder="Receipe Details"></textarea>
          </div>

          <div>
          <input {...register("image", {required: true})} type="file" className="file-input w-full mb-6" />
          </div>

          <button className="btn btn-accent">
            Add Item <FaUtensils className="text-xl"></FaUtensils>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
