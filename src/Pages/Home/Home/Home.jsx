import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import FeaturedItems from "../FeaturedItems/FeaturedItems";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
        <Helmet>
            <title>Home</title>
        </Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <FeaturedItems></FeaturedItems>\
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;