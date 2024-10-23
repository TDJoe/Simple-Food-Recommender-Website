
import NavbarNew from './NavbarNew';  // Assuming these components are already imported
import Sidebar from './Sidebar';
import FooterNew from "./FooterNew";
import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase'; // Adjust this path to your firebase config file
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-blue-50">
    {/* Navbar */}
    <NavbarNew/>

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar/>
        <div className="flex-grow flex justify-center items-center bg-blue-50">
      <div className="max-w-md w-full text-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* Profile Picture */}
          <img
            src="https://media.licdn.com/dms/image/D5603AQEaEKTDF7pcbA/profile-displayphoto-shrink_200_200/0/1679639719005?e=2147483647&v=beta&t=5agX2vG7shJupALTkDFhmFi3jppQ7td14rLojFK19cI" // Replace with your image URL
            alt="Your Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
          {/* About Us Description */}
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p className="text-gray-700 text-base">
            Hi!, I'm Tan Dekjoe Nice to meet you and Welcome to my Final Year Project! I'll give a breif description of this project! This project has multiple functions! The main ones are the BMI Calculator, the Calorie Calculator , the Meal Plan Recommender based on your specifications as well as the calander which will store the data of the recommended meals! I have developed this project on my own and have consumed much time. I know it dosent seem much but trust me I have put quite the amount of effort! I am open to feedback and if possible to improve whatever I have now. Thanks for reading this short description about this website and about myself! 
          </p>
        </div>
      </div>
    </div>
      </div> 

      

      

    {/* Footer */}
    <FooterNew/>
    
  </div>

  )
}

export default AboutUs