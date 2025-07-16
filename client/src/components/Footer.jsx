import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { MailIcon, PhoneIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="px-6 pt-8 md:px-16 lg:px-36 mt-40 w-full text-gray-300">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-14">
        <div className="md:max-w-96">
          <img
            alt=""
            class="h-11"
            src={assets.logo}
          />
          <p className="mt-6 text-sm">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <img
              src={assets.googlePlay}
              alt="google play"
              className="h-9 w-auto "
            />
            <img
              src={assets.appStore}
              alt="app store"
              className="h-9 w-auto "
            />
          </div>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5">myShowBuddy</h2>
            <ul className="text-sm space-y-2">
              {/* TODO: Change the links and the names as per requirement later */}
              <li><Link to="/">Home</Link></li>
              <li><Link to="#">About us</Link></li>
              <li><Link to="#">Contact us</Link></li>
              <li><Link to="#">Privacy policy</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p className="flex"><PhoneIcon className="h-auto w-[20px] mr-2" /> +91 7086362933</p>
              <p className="flex" > <MailIcon className="h-auto w-[20px] mr-2" /> souviksaha1305@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-sm pb-5">
        Copyright {new Date().getFullYear()} ©{" "}
        <a href="#">myShowBuddy</a>. All Right Reserved.  {/* TODO: Link to the business page can be added here */}
      </p>
    </footer>
  );
};

export default Footer;
