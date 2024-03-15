import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {

    const Year = new Date().getFullYear();

    return (
        <footer className="relative  text-white ">
            <div className="absolute top-0 bg-black left-0 w-[100%] overflow-hidden">
                <svg data-name="Layer 1"
                 xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 1200 120" 
                preserveAspectRatio="none">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,
                        250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,
                        3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="relative block h-[600px] fill-white"></path>
                </svg>
                <div className="flex flex-column lg:grid-cols-3 gap-20 sm:grid-cols-1 p-20 items-center justify-end">
                    <div className="flex flex-col gap-5 w-[50%]">
                        <h2 className="text-3xl text-pink-500">About Us</h2>
                        <p>
                        Rentiva is a revolutionary platform that leverages 
                        blockchain technology to streamline and secure the process of renting 
                        housing properties. Built on the principles of transparency, efficiency, 
                        and trust, our platform offers a seamless experience for both landlords 
                        and tenants.
                        </p>
                    </div>
                    
                    <div className="mb-4 md:mb-0 text-right col-span-2 w-[50%]">
                        <h2 className="text-[22px] font-semibold text-pink-500 py-2 uppercase">Contact</h2>
                        <p className="text-[16px] my-4">Email: contact.rentiva@gmail.com</p>
                        <p className="text-[16px] my-4">Phone: +91 9244895120 </p>
                        <div className="flex justify-end gap-3">
                            <div><a
                                className="text-white hover:text-pink-500 transform hover:scale-150 
                            transition-all duration-150 ease-in-out" href="">
                                <FaGithub />
                            </a></div>
                            <div><a
                                className="text-white hover:text-pink-500 transform hover:scale-150
                             transition-all duration-150 ease-in-out" href="">
                                <FaLinkedinIn />
                            </a></div>
                            <div><a
                                className="text-white hover:text-pink-500 transform hover:scale-150
                             transition-all duration-150 ease-in-out" href="">
                                <FaTwitter />
                            </a></div>
                            <div><a
                                className="text-white hover:text-pink-500 transform hover:scale-150
                             transition-all duration-150 ease-in-out" href="">
                                <FaInstagram />
                            </a></div>
                        </div>
                    </div>
                </div>
                <h6 className="text-center items-end justify-end pb-10">&copy; rentiva {Year}</h6>
            </div>
        </footer>
    );
};

export default Footer;