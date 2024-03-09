import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p className="py-2 text-sm sm:text-sm md:text-md lg:text-lg">
        Created by Sam Jasinski, {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
