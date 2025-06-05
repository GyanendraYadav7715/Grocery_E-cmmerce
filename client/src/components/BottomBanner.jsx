import { assets } from "../assets/assets";

const BottomBanner = () => {
    return (
      <div className="relative mt-24">
        <img
          className="w-full hidden md:block"
          src={assets.bottom_banner_image}
          alt="Banner"
        />
        <img
          className="w-full  md:hidden"
          src={assets.bottom_banner_image_sm}
          alt="Banner"
        />
      </div>
    );
};

export default BottomBanner;
