import React from "react";
import careerImage1 from "images/homelanding/annie-spratt-0cgpyigyIkM-unsplash.jpg";
import careerImage2 from "images/homelanding/annie-spratt-GaLzDCnA5EI-unsplash.jpg";
import careerImage3 from "images/homelanding/kevin-bhagat-zNRITe8NPqY-unsplash.jpg";
import LoginHeader from "common/LoginHeader";

const CareerCard = ({ title, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 transition duration-300 ease-in-out transform hover:scale-105">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-4 text-gray-700">{description}</p>
      <a
        href="#"
        className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Apply Now
      </a>
    </div>
  );
};

const CareersPage = () => {
  const careers = [
    {
      title: "Software Engineer",
      description:
        "Join our team of talented software engineers and work on cutting-edge projects.",
      image: careerImage1,
    },
    {
      title: "UX Designer",
      description:
        "Create stunning user experiences and shape the future of our digital products.",
      image: careerImage2,
    },
    {
      title: "Marketing Specialist",
      description:
        "Help us promote our brand and reach new audiences through innovative marketing campaigns.",
      image: careerImage3,
    },
    // Add more career objects as needed
  ];

  return (
    <div className="text-black text-base">
      <LoginHeader color={false} />
      {/* bg-gradient-to-b from-indigo-500 to-purple-500 */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl text-center font-semibold text-black mb-8">
          Join Our Team
        </h1>
        <div className="mb-8">
          <h2 className="text-2xl text-center font-semibold text-black mb-4">
            Why Work With Us?
          </h2>
          <p className="text-center text-black">
            We tackle some of the world's toughest problems. Our employees are
            an incredible group of compassionate, committed individuals, drawn
            by the opportunity to make a difference. They come from academic,
            scientific, private, government and nonprofit backgrounds and you’ll
            work alongside top thinkers, problem solvers and doers. Put your
            talents to use in a fast-paced, stimulating organization where you
            can make an outsized impact. Year over year, our employees report
            they are proud to work here and are willing to go above and beyond
            in service of our mission to reduce inequities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careers.map((career, index) => (
            <div key={index} className="relative">
              <img
                src={career.image}
                alt={career.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-lg">
                <p className="text-black text-lg font-semibold">
                  {career.title}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-2xl text-black font-semibold mb-4">
            Join Our Talent Community
          </h2>
          <p className="text-black">
            To stay updated on new job opportunities and company news, join our
            talent community today.
          </p>
          <a
            href="#"
            className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Join Now
          </a>
        </div>
        <div className="mt-12 text-center">
          <h2 className="text-2xl text-black font-semibold mb-4">
            Diversity, Equity, and Inclusion
          </h2>
          <p className="text-black">
            To have the greatest possible impact, we must make diversity,
            equity, and inclusion (DEI) a priority, starting with the people we
            hire and how we work to retain them. As our workforce grows, so does
            our opportunity to evolve into an organization that is more
            reflective of our partners and the communities we serve.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
