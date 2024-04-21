import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch("reviews.json")
        .then((res) => res.json())
        .then((data) => setReviews(data));
    }, []);
  return (
    <section className="my-20">
      <SectionTitle
        subHeading="What Our Client Say"
        heading="Testimonials"
      ></SectionTitle>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        
        {
            reviews.map(review => 
                <SwiperSlide key={review._id}>
                    <div className="flex justify-center">
                    <div className="m-24 flex flex-col items-center gap-10">
                    <Rating 
                        style={{ maxWidth: 180 }}
                        value={review.rating}
                    />
                        <p>{review.details}</p>
                        <h3 className="text-2 text-orange-300">{review.name}</h3>
                    </div>
                    </div>
                </SwiperSlide>
                )
        }
      </Swiper>
    </section>
  );
};

export default Testimonials;
