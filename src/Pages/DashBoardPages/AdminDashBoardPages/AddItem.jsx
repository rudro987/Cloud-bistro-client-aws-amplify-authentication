import { getUrl, uploadData } from "aws-amplify/storage";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddItem = () => {
  const {
    register,
    handleSubmit,
    reset
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const random = Math.floor(Math.random() * 10000);
    const fileName = `${random}-${data.image[0].name}`;
    const result = await uploadData({
      key: fileName,
      data: data.image[0],
    }).result;

    if (result.key) {
      const getUrlResult = await getUrl({
        key: result.key,
        options: {
          accessLevel: "guest",
        },
      });
      const imageFile = getUrlResult.url.origin + getUrlResult.url.pathname;
      const itemInfo = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        receipe: data.receipe,    
        image: imageFile,
      };
      if (getUrlResult.url) {
        // Post item data to server
        const res = await axiosSecure.post('/menu', itemInfo);
        if(res.data.insertedId){
          reset();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${data.name} added successfully`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    }

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
                defaultValue="default"
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
            ></textarea>
          </div>

          <div>
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full mb-6"
            />
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
