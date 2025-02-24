import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner1 from "../../../components/spinners/Spinner1";
import MainArticleCard from "../allArticle/MainArticleCard";
import Heading from "../../../components/Heading";
import { Divider } from "@mui/material";
import useUserInfo from "../../../hooks/useUserInfo";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

function PremiumeArtilces() {
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useUserInfo();
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["premiumeArtilces"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/articles/premiume`);

      return data;
    },
  });
  const navigate = useNavigate();

  if (!userInfo?.premiumeToken || userInfo.role === "admin") navigate("/");
  if (isLoading) return <Spinner1 />;
  return (
    <div className="my-10 max-w-7xl mx-auto lg:px-20 md:px-10 px-3 mt-24">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Nexus | Premiume Articles</title>
      </Helmet>
      <div className=" mt-6 ">
        <Heading title="Premium Article" />
      </div>
      <Divider />
      {articles.length ? (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-3 mb-10 mt-8">
          {articles.map((article) => (
            <MainArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <div className="h-[300px] flex justify-center items-center text-3xl font-semibold w-full">
          No Article Found!
        </div>
      )}
    </div>
  );
}

export default PremiumeArtilces;
