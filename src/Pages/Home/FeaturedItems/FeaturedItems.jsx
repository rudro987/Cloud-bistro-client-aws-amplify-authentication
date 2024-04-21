import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

import featuredImg from "../../../assets/home/featured.jpg";

import "./featuredItem.css";

const FeaturedItems = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            <SectionTitle
            subHeading="Check it out"
            heading="Featured Items"
            ></SectionTitle>
            <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-40 pb-20 pt-12 px-36 gap-10">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="">
                    <p>Aug 20, 2029</p>
                    <p className="uppercase">Where can I get some</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur voluptatum debitis quos laboriosam deleniti corrupti odio architecto voluptate nisi, expedita error aliquid, magnam culpa? Nobis aspernatur ipsam quidem nisi voluptate maiores sequi aliquam deleniti, ipsum nulla modi qui perferendis dolore ullam quos quis quisquam alias maxime dolor amet ut dolorum?</p>
                    <button className="btn btn-outline border-0 border-b-4 text-white mt-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedItems;