import pricing from "../../../assets/pricing.png";
import CreatableSelect from "react-select/creatable";
import FilledBtn from "../../../components/buttons/FilledBtn";
import { Link } from "react-router";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

export const colourOptions = [
  { value: 60000, label: "For 1 Minute", amount: 1 },
  { value: 432000000, label: "For 5 Days", amount: 3 },
  { value: 864000000, label: "For 10 Days", amount: 5 },
  { value: 2628000000, label: "For 1 Month", amount: 12 },
];

function Subscriptions() {
  const [amount, setAmount] = useState();

  const handleSlectPlan = (e) => {
    setAmount(e);
  };

  return (
    <section className="mt-10 grid md:grid-cols-2 place-items-center gap-6 pb-24">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Nexus | Subscriptions</title>
      </Helmet>
      {/* Left Content */}
      <div>
        <h2 className="text-4xl font-semibold mb-2">
          Choose Your{" "}
          <span className="font-extrabold text-myGreen">Premium</span> Plan
        </h2>
        <p className="text-xl mt-3">
          Unlock exclusive access to premium articles, personalized features,
          and an ad-free experience.
        </p>
        <div className="mt-8 p-5 border-myGreen border-4 max-w-md rounded-md">
          <p className="mb-2">How long do you need access?</p>
          <CreatableSelect
            onChange={handleSlectPlan}
            options={colourOptions}
            placeholder="Select or create your plan duration"
          />
          <Link to="/payment" state={{ amount }}>
            <FilledBtn className="bg-black1 text-white mt-4 w-full hover:bg-black1/75 active:bg-black1 py-2">
              Pay
            </FilledBtn>
          </Link>
        </div>
      </div>

      {/* Right Content */}
      <div>
        <img
          src={pricing}
          className="lg:h-60 md:h-56 h-52 object-contain"
          alt="Pricing illustration"
        />
      </div>
    </section>
  );
}

export default Subscriptions;
