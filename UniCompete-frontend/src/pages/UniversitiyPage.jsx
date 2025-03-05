import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import axios from "axios";
import KelaniyaUniversity from "./images/Kelaniya.png";
import MoratuwaUniversity from "./images/Moratuwa.png";
import PeradeniyaUniversity from "./images/peradeniya.png";
import JayepuraUniversity from "./images/jayepura.png";
import JaffnaUniversity from "./images/jaffna.png";
import VavuniyaUniversity from "./images/vavuniya.png";
import SouthUniversity from "./images/south.png";
import ColomboUniversity from "./images/colombo.png";
import RuhunaUniversity from "./images/ruhuna.png";
import EasternUniversity from "./images/eastern.png";




const universityDetailsData = {
  "University of Colombo": {
    name: "University of Colombo",
    location: "Colombo, Sri Lanka",
    address: "94 Cumaratunga Munidasa Mawatha, Colombo 00300, Sri Lanka",
    email: "contact@colombo.edu.ac.lk",
    phone: "+94 112 588 000",
    rating: 4.5,
    
  },
  "University of Peradeniya": {
    name: "University of Peradeniya",
    location: "Peradeniya, Sri Lanka",
    address: "Peradeniya Rd, Peradeniya 20400, Sri Lanka",
    email: "contact@peradeniya.edu.ac.lk",
    phone: "+94 812 392 000",
    rating: 4.2,
    logo: PeradeniyaUniversity
  },
  "University of Moratuwa": {
    name: "University of Moratuwa",
    location: "Moratuwa, Sri Lanka",
    address: "Moratuwa Rd, Moratuwa 20400, Sri Lanka",
    email: "contact@peradeniya.edu.ac.lk",
    phone: "+94 812 392 000",
    rating: 4.2,
    logo: MoratuwaUniversity,

  },
};

function UniversityPage() {
  const { university } = useParams();
  const [competitions, setCompetitions] = useState([]);
  const navigate = useNavigate();

  const universityDetails = universityDetailsData[university] || {
    name: university,
    location: "Unknown",
    address: "Not Available",
    email: "N/A",
    phone: "N/A",
    rating: 3,
    logo: "",
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/competitions/user/university/${university}`, {
          headers: {
            "University-Name": university,
          },
        });
        setCompetitions(response.data);
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };

    fetchCompetitions();
  }, [university]);

//   const renderRatingStars = (rating) => {
//     const totalStars = 5;
//     const fullStars = Math.floor(rating);
//     const halfStar = rating % 1 >= 0.5;
//     const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

//     return (
//       <div className="flex items-center">
//         {[...Array(fullStars)].map((_, index) => (
//   <svg
//     key={`full-${index}`}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="currentColor"
//     className="w-5 h-5 text-yellow-500"
//   >
//             <path d="M10 15l-3.09 1.63.59-3.45L4 8.27l3.46-.28L10 5l1.54 2.99 3.46.28-2.5 4.91.59 3.45L10 15z" />
//           </svg>
//         ))}

//         {halfStar && (
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="currentColor"
//             className="w-5 h-5 text-yellow-500"
//             viewBox="0 0 20 20"
//           >
//             <defs>
//               <linearGradient id="half-star" x1="0" x2="1" y1="0" y2="0">
//                 <stop offset="50%" stopColor="currentColor" />
//                 <stop offset="50%" stopColor="transparent" />
//               </linearGradient>
//             </defs>
//             <path
//               d="M10 15l-3.09 1.63.59-3.45L4 8.27l3.46-.28L10 5l1.54 2.99 3.46.28-2.5 4.91.59 3.45L10 15z"
//               fill="url(#half-star)"
//             />
//           </svg>
//         )}

// {[...Array(fullStars)].map((_, index) => (
//   <svg
//     key={`full-${index}`}
//     xmlns="http://www.w3.org/2000/svg"
//     fill="currentColor"
//     className="w-5 h-5 text-yellow-500"
//   >
//             <path d="M10 15l-3.09 1.63.59-3.45L4 8.27l3.46-.28L10 5l1.54 2.99 3.46.28-2.5 4.91.59 3.45L10 15z" />
//           </svg>
//         ))}
//       </div>
//     );
//   };

const handleViewDetails = (id) => {
  navigate(`/competition/${id}`);
};


  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-900">
<header className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white p-8 shadow-lg rounded-b-3xl">
  <h1 className="text-3xl font-extrabold text-center tracking-wide drop-shadow-lg">
     Competitions at {universityDetails.name} 
  </h1>
</header>


      <div className="flex flex-col md:flex-row p-6 gap-6">
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6 flex flex-col items-center">



        <div className="w-32 h-32 rounded-full overflow-hidden ">     
  <img
    src={universityDetails.logo}
    alt={`${universityDetails.name} Logo`}
    className="w-full h-full object-cover"
  />
</div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {universityDetails.name}
          </h2>
          <p className="text-gray-600 text-center mb-2">
          Location: {universityDetails.location}
          </p>
          <p className="text-gray-600 text-center mb-4">
          {/* Rating: {renderRatingStars(universityDetails.rating)} */}
          </p>

          <div className="text-left text-gray-600 mb-4">
            <p>
            <strong>Address:</strong> {universityDetails.address}
            </p>
            <p>
            <strong>Email:</strong> {universityDetails.email}
            </p>
            <p>
            <strong>Phone:</strong> {universityDetails.phone}
            </p>
          </div>

          <div className="flex space-x-4 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-blue-600 text-2xl hover:text-blue-800" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-blue-400 text-2xl hover:text-blue-600" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-blue-700 text-2xl hover:text-blue-900" />
            </a>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>

        <div className="w-px bg-black hidden md:block"></div>

        <div className="w-full md:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {competitions.length > 0 ? (
              competitions.map((comp) => (
                <div
                  key={comp.id}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transform hover:scale-105 transition"
                >
                  <img
                  src={`http://localhost:8080/competitions/images/${comp.id}?token=${localStorage.getItem("token")}`}
                  alt={comp.name}
                  className="w-full h-50 object-cover rounded-lg mb-4"
                />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {comp.name}
                  </h2>
                  <p className="text-gray-600 mb-2 text-sm">
                    {comp.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">{comp.date}</span>
                    <span className="text-sm text-gray-500">
                      {comp.location}
                    </span>
                  </div>
                  {/* <div className="mb-4">{renderRatingStars(comp.rating)}</div> */}
                  <button
                    onClick={() => handleViewDetails(comp.id)} // Pass the competition ID
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-gray-700">
                No competitions found for this university.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default UniversityPage;