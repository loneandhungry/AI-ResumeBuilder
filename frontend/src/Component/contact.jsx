import React from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
    const navigate = useNavigate();
  const contactLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/tejaswani-ece/",
      external: true,
    },
    {
      label: "Email",
      href: "mailto:mstejaswani@gmail.com",
      external: false,
    },
    {
      label: "Project GitHub",
      href: "https://github.com/loneandhungry/AI-Resume-Builder",
      external: true,
    },
];

const Account = async() => {
  try{
   const response = await axios.get( `${import.meta.env.VITE_BACKEND_URL}/isauth`,
     { withCredentials: true }
);
   navigate("/landing")
}catch(err){
  localStorage.setItem("where", 1 );
  navigate("/login");
  
}
    
}

const About = ()=> {
  navigate("/about");
}

const Contact = ()=> {
  navigate("/contact");
}

  return (
    <>
     <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm border-b border-[#018790]/10 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-8">
          
           <div  onClick = {()=>{
            navigate("/");
          }}
          className="cursor-pointer text-3xl font-bold text-[#018790] tracking-tight">
            Builder.IO
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={Account}
              className="px-5 py-2.5 text-sm font-semibold text-[#018790] border-2 border-[#018790] rounded-lg hover:bg-[#018790] hover:text-white transition-all duration-300"
            >
              My Account
            </button>

           <a
              onClick={About}
              className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-[#018790] transition-colors"
            >
              About Us
            </a>

            <a
              onClick={Contact}
              className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-[#018790] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

   <section className="bg-gradient-to-br from-[#F4F4F4] via-white to-[#F4F4F4] py-10 px-8 min-h-screen">
  <div className="max-w-3xl mx-auto">
    <div className= "  p-16">
      <div className="text-center mb-14">
        <h2 className="text-6xl sm:text-7xl font-extrabold text-[#018790] mb-4 tracking-tight">
          Get in Touch
        </h2>
        <div className="h-2 w-32 bg-[#00B7B5] rounded-full mx-auto mb-8" />
      </div>

      <p className="text-gray-700 text-center text-xl sm:text-2xl leading-relaxed mb-16">
        Hello there!  I'm{" "}
        <span className="font-semibold text-[#018790]">Tejaswani</span>, a second-year 
        student at{" "}
        <span className="font-semibold text-[#018790]">BIT Mesra (ECE)</span>. 
        I'm always up for constructive criticism, feedback, or even a friendly challenge 
        to see if you can spot any loopholes in this AI Resume Builder. No pressure 😎.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-2xl sm:text-3xl">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="group text-[#018790] font-semibold transition-colors duration-200 hover:text-[#00B7B5]"
          >
            <span className="relative">
              {link.label}
              <span className="absolute left-0 -bottom-1 h-1 w-0 bg-[#00B7B5] transition-all duration-200 group-hover:w-full" />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-12 text-center text-gray-500 text-lg sm:text-xl">
        Or just send a pigeon. But email works too. 🕊️
      </div>
    </div>
  </div>
</section>

</>
  );
};

export default Contact;
