import { Helmet } from "react-helmet-async";
import Cover from "../../../Components/Cover/Cover";
import menuBg from "../../../assets/menu/banner3.jpg";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
import dessertBg from "../../../assets/menu/dessert-bg.jpeg";
import pizzaBg from "../../../assets/menu/pizza-bg.jpg";
import saladBg from "../../../assets/menu/salad-bg.jpg";
import soupBg from "../../../assets/menu/soup-bg.jpg";

const Menu = () => {
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const salad = menu.filter((item) => item.category === "salad");
  const soup = menu.filter((item) => item.category === "soup");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");

  return (
    <div>
      <Helmet>
        <title>Cloud Bistro | Our Menu</title>
      </Helmet>
      <Cover img={menuBg} title="Our Menu"></Cover>
      {/* main cover */}
      <SectionTitle
      subHeading="Don't Miss"
      heading="Today's Offer"
      ></SectionTitle>
      {/* offered menu items */}
      <MenuCategory items={offered}></MenuCategory>
      {/* dessert menu items */}
      <MenuCategory items={dessert} title="dessert" img={dessertBg}></MenuCategory>
      {/* pizza menu items */}
      <MenuCategory items={pizza} title="pizza" img={pizzaBg}></MenuCategory>
      {/* salad menu items */}
      <MenuCategory items={salad} title="salad" img={saladBg}></MenuCategory>
      {/* salad menu items */}
      <MenuCategory items={soup} title="soup" img={soupBg}></MenuCategory>
    </div>
  );
};

export default Menu;
