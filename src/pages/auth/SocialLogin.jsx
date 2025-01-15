/* eslint-disable react/prop-types */
import { FcGoogle } from "react-icons/fc";
import FilledBtn from "../../components/buttons/FilledBtn";

function SocialLogin({ label }) {
  const handleSocialLogin = () => {
    console.log("login is proccesing..");
  };
  return (
    <div className="flex justify-center">
      <FilledBtn
        onClick={handleSocialLogin}
        className="border-2 border-myGreen  sm:w-8/12 w-10/12 mx-auto"
      >
        <p className="flex items-center gap-3 sm:text-lg text-base">
          <span className="p-0.5 bg-white rounded-md">
            {" "}
            <FcGoogle className="text-2xl" />
          </span>{" "}
          Sign {label} with Google
        </p>
      </FilledBtn>
    </div>
  );
}

export default SocialLogin;
