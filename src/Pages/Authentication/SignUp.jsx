import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { uploadData, getUrl } from "aws-amplify/storage";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SignUp = () => {
  const { handleSignUp } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
    try {
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
        const userInfo = {
          name: data.name,
          email: data.email,
          profilePic: imageFile,
        };
        if (getUrlResult.url) {
          const { nextStep } = await handleSignUp(
            data.name,
            data.email,
            imageFile,
            data.password
          );
          switch (nextStep.signUpStep) {
            case "CONFIRM_SIGN_UP":
              axiosPublic.post("users", userInfo).then((res) => {
                if (res.data.insertedId) {
                  reset();
                  Swal.fire({
                    title: "Check your email for validation code",
                    confirmButtonText: "Validate",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate("/confirm-sign-up");
                    }
                  });
                }
              });
              break;
            default:
              break;
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col md:flex-row">
        <div className="text-center md:w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card md:w-1/2 shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(formSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Full Name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="text-red-600">User name is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email Address"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                {...register("image")}
                type="file"
                placeholder="Upload your image"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])./,
                })}
                type="password"
                placeholder="Password"
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-600">Password is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-600">
                  Password must be 6 characters
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-600">
                  Password must be less then 20 characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-600">
                  Password must have one uppercase, one lowercase, one number
                  and one special character
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value="Register"
              />
            </div>
          </form>
          <p className="text-center mb-10">
            <small>
              Already hve an account? <Link to="/login">Please sign in</Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
