import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ConfirmSignUp = () => {
  const { handleConfirmSignUp, handleAutoSignIn } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = async (data) => {
    console.log(data);
    try {
      const { nextStep } = await handleConfirmSignUp(
        data.email,
        data.validationCode
      );
      console.log(nextStep);
      if (nextStep.signUpStep === "COMPLETE_AUTO_SIGN_IN") {
        const { nextStep } = await handleAutoSignIn();
        if (nextStep.signInStep === "DONE") navigate("/");
      }
    } catch (error) {
      console.error("Confirm sign up error: ", error);
    }
    reset();
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col md:flex-row">
        <div className="text-center md:w-1/2 lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
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
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Validation Code</span>
              </label>
              <input
                {...register("validationCode", { required: true })}
                type="text"
                placeholder="Validation Code"
                className="input input-bordered"
              />
              {errors.validationCode && (
                <span className="text-red-600">
                  Validation Code is required
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value="Confirm Sign Up"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSignUp;
