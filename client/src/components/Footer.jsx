import React from "react";
import { assets } from "../assets/assets";

function Footer() {
  return (
    <div className="container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20 mb-3">
      <img className="cursor-pointer" width={160} src={assets.logo} alt="" />
      <p className="text-gray-500 text-sm flex-1 pl-4 max-sm:hidden">
        | Copyright @Insider_Job.dev | All right reserved.
      </p>
      <div className="flex gap-3">
        <img
          className="cursor-pointer"
          width={38}
          src={assets.facebook_icon}
          alt=""
        />
        <img
          className="cursor-pointer"
          width={38}
          src={assets.twitter_icon}
          alt=""
        />
        <img
          className="cursor-pointer"
          width={38}
          src={assets.instagram_icon}
          alt=""
        />
      </div>
    </div>
  );
}

export default Footer;
