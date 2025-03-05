import React, { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FaListAlt,
  FaHeart,
  FaRegHeart,
  FaEdit,
  FaTrashAlt,
  FaAd,
  FaImage,
} from "react-icons/fa"; // Importing necessary icons


import axios from "axios";

// Function to get initials from the user's name
const getInitials = (fullName) => {
  const nameParts = fullName.split(" ");
  return nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
};

function AdminPage() {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortCriterion, setSortCriterion] = useState("All");
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [favorites, setFavorites] = useState([]); // Initialize favorites state
  const [showFavorites, setShowFavorites] = useState(false);
  const [competitions, setCompetitions] = useState([]);
  const [showAddCompetitionModal, setShowAddCompetitionModal] = useState(false);
  const [showModal, setShowModal] = useState(false); // To control the modal visibility
  const [showEditModal, setShowEditModal] = useState(false); // Separate state for Edit Modal
  const [showAddModal, setShowAddModal] = useState(false); // Separate state for Add Modal
  const [editingCompetition, setEditingCompetition] = useState(null);
  const [createdCompetitionId, setCreatedCompetitionId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUploadCompetitionId, setImageUploadCompetitionId] = useState(null);
  const [universityName, setUniversityName] = useState("");

 const [newCompetition, setNewCompetition] = useState({
  name: "",
  description_A: "",
  prizes: "",
  registrationDeadline: "",
  rules: 0,
  category: "",
  university: "",
  date: "",
  imageUrl: "",
  });


  const user = {
    fullName: "Nilojitha Mariyathas",
  };

  const dropdownRef = useRef(null);
  const handleUniversityClick = (university) =>
    navigate(`/university/${university}`);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  useEffect(() => {
    // Fetch competitions from the backend
    const fetchCompetitions = async () => {
      try {
        // Retrieve the JWT token (assuming it's stored in localStorage)
        const token = localStorage.getItem("token");
        // Decode the token to extract the university
        const decodedToken = jwtDecode(token);
        const universityName = decodedToken.universityName; // Ensure the token contains 'university'
        setUniversityName(decodedToken.universityName);
  
        // Fetch competitions from the backend
        const response = await fetch(`http://localhost:8080/competitions/user/university/${universityName}`);
        if (response.ok) {
          const data = await response.json();
          setCompetitions(data);
  
          // Extract unique university locations and sort them alphabetically
          const universitiesList = [...new Set(data.map((comp) => comp.location))].sort((a, b) =>
            a.localeCompare(b)
          );
          setUniversity(universitiesList);
        } else {
          console.error("Failed to fetch competitions:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };
  
    fetchCompetitions();
  }, []);


  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setDropdownVisible(false);
  };

  const handleSortChange = (e) => {
    setSortCriterion(e.target.value);
    setDropdownVisible(false);
  };

  const handleViewDetails = (id) => {
    navigate(`/admincompetition/${id}`);
  };

  const handleFavoriteToggle = (competitionId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(competitionId)) {
        return prevFavorites.filter((id) => id !== competitionId);
      } else {
        return [...prevFavorites, competitionId];
      }
    });
  };

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };



  const handleAddCompetition = async () => {
    try {
      const competitionData = {
        name: newCompetition.name,
        date: newCompetition.date,
        university: universityName,
        description: newCompetition.description,
        prizes: newCompetition.prizes,
        registrationDeadline: newCompetition.registrationDeadline,
        rules: newCompetition.rules,
        category: newCompetition.category,
        // You can also handle file upload (image) here if needed
      };
  
      // Make a POST request to the backend
      const response = await axios.post(
        "http://localhost:8080/competitions/admin/add", 
        competitionData,
        {
          headers: {
            "Content-Type": "application/json", // Ensures JSON is sent
          },
        }
      );
  
      // Update competitions list with the new competition
      setCompetitions([...competitions, response.data]);
  
      // Reset form and close modal after adding
      setShowAddCompetitionModal(false);
      setNewCompetition({
        name: "",
        description: "",
        prizes: "",
        registrationDeadline: "",
        rules: 0,
        category: "",
        university: universityName,
        date: "",
        imageUrl: "",
      });
      setShowAddCompetitionModal(true);
    } catch (error) {
      console.error("Error adding competition:", error);
    }
  };
  

    // Handle when you click on Edit Competition button
    const handleEditCompetition = (id) => {
      const competitionToEdit = competitions.find((competition) => competition.id === id);
      setEditingCompetition(competitionToEdit);
      setNewCompetition({ ...competitionToEdit });
      setShowEditModal(true); // Show Edit Competition modal
    };

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewCompetition((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    // Handle file input change
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setNewCompetition((prevState) => ({
          ...prevState,
          picture: file,
        }));
      }
    };
  
  

    const handleSaveCompetition = async () => {
      if (!editingCompetition || !editingCompetition.id) {
        alert("Error: No competition selected for editing.");
        return;
      }
    
      try {
        const token = localStorage.getItem("token"); // Get JWT token
        if (!token) {
          alert("Authorization token missing. Please log in again.");
          return;
        }
    
        const response = await axios.put(
          `http://localhost:8080/competitions/admin/update/${editingCompetition.id}`,
          newCompetition,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // ✅ Include JWT token
            },
          }
        );
    
        // Update the competition in state
        setCompetitions((prevCompetitions) =>
          prevCompetitions.map((comp) =>
            comp.id === editingCompetition.id ? response.data : comp
          )
        );
    
        // Close modal and reset state
        setShowEditModal(false);
        setEditingCompetition(null);
        setNewCompetition({
          name: "",
          description: "",
          prizes: "",
          registrationDeadline: "",
          rules: "",
          category: "",
          university: universityName,
          date: "",
          imageUrl: "",
        });
    
        Swal.fire({
                  icon: "success",
                  title: "Updated Successful!",
                  text: `Competition id: ${editingCompetition.id}`,
                  confirmButtonColor: "#4CAF50",
                });
      } catch (error) {
        console.error("Error updating competition:", error.response || error);
        alert(
          `Failed to update competition: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    };
    
    
    
  

    const handleDeleteCompetition = async (id) => {
      // Show SweetAlert confirmation dialog
      Swal.fire({
        title: "Are you sure?",
        text: "Are you going to delete this competition?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const token = localStorage.getItem("token"); // Get JWT token
    
            const response = await axios.delete(
              `http://localhost:8080/competitions/admin/delete/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Send JWT token for authentication
                },
              }
            );
    
            if (response.status === 200) {
              // Remove the deleted competition from state
              setCompetitions((prevCompetitions) =>
                prevCompetitions.filter((comp) => comp.id !== id)
              );
    
              Swal.fire("Deleted!", "The competition has been deleted.", "success");
            }
          } catch (error) {
            console.error("Error deleting competition:", error);
            Swal.fire("Error!", "Failed to delete the competition.", "error");
          }
        }
      });
    };
    


  const renderStars = (rating) => {
    if (!Number.isFinite(rating) || rating < 0) {
      console.error("Invalid rating value:", rating);
      rating = 0; // Default to 0 stars if invalid
    }
  
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <svg
            key={`full-${index}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-5 h-5 text-yellow-500"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-3.09 1.63.59-3.45L4 8.27l3.46-.28L10 5l1.54 2.99 3.46.28-2.5 4.91.59 3.45L10 15z" />
          </svg>
        ))}
        {halfStar && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-5 h-5 text-yellow-500"
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id="half-star" x1="0" x2="1" y1="0" y2="0">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M10 15l-3.09 1.63.59-3.45L4 8.27l3.46-.28L10 5l1.54 2.99 3.46.28-2.5 4.91.59 3.45L10 15z"
              fill="url(#half-star)"
            />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <svg
            key={`empty-${index}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-3.09 1.63.59-3.45L4 8.27l3.46-.28L10 5l1.54 2.99 3.46.28-2.5 4.91.59 3.45L10 15z" />
          </svg>
        ))}
      </div>
    );
  };
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0]; // Get the first selected file
  //   if (file) {
  //     // You can store the file in state or handle it accordingly
  //     setNewCompetition((prevState) => ({
  //       ...prevState,
  //       picture: file,
  //     }));
  //   }
  // };

    // Handle image upload button click
    const handleImageUpload = async () => {
      if (!selectedImage || !imageUploadCompetitionId) return;
  
      const formData = new FormData();
      formData.append("image", selectedImage);
  
      await uploadCompetitionImage(imageUploadCompetitionId, formData);
  
      // Reset image upload state
      setSelectedImage(null);
      setImageUploadCompetitionId(null);
    };

    const uploadCompetitionImage = async (competitionId, formData) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `http://localhost:8080/competitions/admin/upload-image/${competitionId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Image uploaded successfully:", response.data);
        // Optionally, update the competition's image on the page after upload
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    const handleImageChange = (event, competitionId) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedImage(file);
        setImageUploadCompetitionId(competitionId);
      }
    };

  const filterCompetitions = () => {
    let filteredCompetitions = competitions;

    // Filter by category
    if (selectedCategory !== "All") {
      filteredCompetitions = filteredCompetitions.filter(
        (comp) => comp.name === selectedCategory
      );
    }

    // Sort by criterion
    if (sortCriterion !== "All") {
      filteredCompetitions = filteredCompetitions.sort((a, b) => {
        if (sortCriterion === "Name") {
          return a.name.localeCompare(b.name);
        } else if (sortCriterion === "Date") {
          return new Date(a.date) - new Date(b.date);
        } else if (sortCriterion === "Location") {
          return a.location.localeCompare(b.location);
        } else if (sortCriterion === "Rating") {
          return b.rating - a.rating;
        }
        return 0;
      });
    }

    // Show only favorites if showFavorites is true
    if (showFavorites) {
      filteredCompetitions = filteredCompetitions.filter((comp) =>
        favorites.includes(comp.id)
      );
    }

    return filteredCompetitions;
  };
  const universities = [
    ...new Set(competitions.map((comp) => comp.location)),
  ].sort((a, b) => a.localeCompare(b));

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 text-gray-900">
 

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-6">
        <form className="max-w-md mx-auto mt-10px">
          {" "}
          {/* Increased bottom margin */}
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Universities, Competitons..."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center flex-grow">
            Explore Competitions
          </h1>

          <button
            onClick={() => setShowAddCompetitionModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 mr-4 mt-5"
          >
            Add Competition
          </button>

          {/* Button to show only favorites */}
          <button
            onClick={handleShowFavorites}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 mr-4 mt-5"
          >
            {showFavorites ? "Show All" : "Show Favorites"}
          </button>

          {/* Sort/Filter Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={handleDropdownToggle}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 mt-5"
            >
              Filter Competitions
            </button>

            {dropdownVisible && (
              <div className="absolute top-12 right-0 w-56 bg-white shadow-lg rounded-lg p-4 z-10">
                <div className="space-y-4">
                  {/* Category Dropdown */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Select Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => handleSelectCategory(e.target.value)}
                      className="bg-blue-100 text-gray-800 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[
                        "All",
                        ...Array.from(
                          new Set(competitions.map((comp) => comp.name))
                        ),
                      ].map((competitionName) => (
                        <option key={competitionName} value={competitionName}>
                          {competitionName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort By Dropdown */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Sort By
                    </label>
                    <select
                      value={sortCriterion}
                      onChange={handleSortChange}
                      className="bg-blue-100 text-gray-800 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="All">All</option>
                      <option value="Name">Name</option>
                      <option value="Date">Date</option>
                      <option value="Location">Location</option>
                      <option value="Rating">Rating</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

{/* Competitions List */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
  {filterCompetitions().map((competition) => (
    <div key={competition.id} className="bg-white rounded-lg shadow-lg p-6">
      <img
        src={`http://localhost:8080/competitions/images/${competition.id}?token=${localStorage.getItem("token")}`}
        alt={competition.name}
        className="w-full h-50 object-cover rounded-lg mb-4"
      />
      <h6><strong>id : </strong>{competition.id}</h6>
      <h2 className="text-xl font-semibold mb-2">{competition.name}</h2>
      <p className="text-sm text-gray-600 mb-4">
        <strong>Date:</strong> {competition.date}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        <strong>Location:</strong> {competition.university}
      </p>

      <div className="flex justify-between items-center">
        <button
          onClick={() => handleViewDetails(competition.id)}
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          View Details
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleFavoriteToggle(competition.id)}
            className="text-red-600 hover:text-red-800 transition duration-300"
          >
            {favorites.includes(competition.id) ? (
              <FaHeart className="w-5 h-5" />
            ) : (
              <FaRegHeart className="w-5 h-5" />
            )}
          </button>

          {/* Edit Button */}
          <button
            onClick={() => handleEditCompetition(competition.id)}
            className="text-yellow-600 hover:text-yellow-800 transition duration-300"
          >
            <FaEdit />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleDeleteCompetition(competition.id)}
            className="text-red-600 hover:text-red-800 transition duration-300"
          >
            <FaTrashAlt />
          </button>

          {/* Upload Image Icon */}
          {!competition.imageUrl && (
            <button
              onClick={() => setImageUploadCompetitionId(competition.id)}
              className="text-blue-600 hover:text-blue-800 transition duration-300"
            >
              <FaImage/>
            </button>
          )}
        </div>
      </div>

      {/* Stars for Rating */}
      <div className="mt-2">{renderStars(competition.rating)}</div>

      {/* Image Upload Section for Specific Competition */}
      {imageUploadCompetitionId === competition.id && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Upload Image for {competition.name}</h2>
          <div className="mt-2">
            <input
              type="file"
              onChange={(e) => handleImageChange(e, competition.id)}
              className="p-2 border border-gray-300 rounded-lg w-full"
            />
            {selectedImage && <span>{selectedImage.name}</span>}
          </div>
          <button
            onClick={handleImageUpload}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300 mt-2 w-full"
          >
            Upload
          </button>
        </div>
      )}
    </div>
  ))}
</div>


              {/* Edit Competition  */}
              {showEditModal && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
                <div className="bg-white p-6 rounded-2xl w-[600px] sm:w-[700px] max-h-[90vh] overflow-y-auto shadow-lg border">


              <h2 className="text-2xl font-semibold mb-4">Edit Competition</h2>
              <form>
              <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newCompetition.name}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newCompetition.description}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2">
                    Prizes
                  </label>
                  <textarea
                    name="prizes"
                    value={newCompetition.prizes}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2">
                  Registration Deadline
                  </label>
                  <input
                    type="date"
                    name="registrationDeadline"
                    value={newCompetition.registrationDeadline}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2">
                    Rules
                  </label>
                  <textarea
                    name="rules"
                    value={newCompetition.rules}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={newCompetition.category}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full"
                  />
                </div>

                <div className="mb-4">
      <label className="block text-sm text-gray-700 mb-2">
        University
      </label>
      <input
        type="text"
        name="university"
        value={universityName} // Use the state variable
        readOnly // Makes the field non-editable
        className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full"
      />
    </div>


                <div className="mb-4">
                  <label className="block text-sm text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newCompetition.date}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg w-full"
                  />
                </div>
                

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)} // Close edit modal
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCompetition} // Save competition (Add or Edit)
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


        {/* Add Competition Modal */}
        {showAddCompetitionModal && (
<div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50 backdrop-blur-lg">
  <div className="bg-white bg-opacity-80 backdrop-blur-md p-8 w-[600px] sm:w-[800px] max-h-[95vh] overflow-y-auto shadow-lg border border-gray-300 rounded-xl scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-200 scrollbar-rounded-full">


      
      {/* Title */}
      <h2 className="text-4xl font-bold text-black text-center mb-6 border-b-4 border-blue-400 pb-3 uppercase tracking-wider">
        Add Competition
      </h2>

      <form>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={newCompetition.name}
            onChange={handleInputChange}
            required
            className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">Description</label>
          <textarea
            name="description"
            value={newCompetition.description}
            onChange={handleInputChange}
            required
            className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg w-full h-40 sm:h-52 resize-none border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Prizes */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">Prizes</label>
          <textarea
            name="prizes"
            value={newCompetition.prizes}
            onChange={handleInputChange}
            required
            className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg w-full h-40 sm:h-52 resize-none border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Side-by-side: Registration Deadline & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Registration Deadline</label>
            <input
              type="date"
              name="registrationDeadline"
              value={newCompetition.registrationDeadline}
              onChange={handleInputChange}
              required
              className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={newCompetition.date}
              onChange={handleInputChange}
              required
              className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Rules */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-800 mb-2">Rules</label>
          <textarea
            name="rules"
            value={newCompetition.rules}
            onChange={handleInputChange}
            required
            className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg w-full h-40 sm:h-52 resize-none border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Side-by-side: Category & University */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={newCompetition.category}
              onChange={handleInputChange}
              required
              className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">University</label>
            <input
              type="text"
              name="university"
              value={universityName}
              readOnly
              className="bg-gray-200 text-gray-800 px-4 py-3 rounded-lg w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setShowAddCompetitionModal(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAddCompetition}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
          >
            Add Competition
          </button>
        </div>

      </form>
    </div>
  </div>
)}

      </div>
    </div>
  );
}

export default AdminPage;
