
import NavbarNew from './NavbarNew';  // Assuming these components are already imported
import Sidebar from './Sidebar';
import FooterNew from "./FooterNew";
import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase'; // Adjust this path to your firebase config file
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const CaloriesC = () => {
   // State to store form data
   const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    activityLevel: '1.2', // Default activity level is sedentary
  });

  // State to store the calculated calories
  const [calories, setCalories] = useState(null);
  const [caloriesToLose, setCaloriesToLose] = useState(null);
  const [caloriesToGain, setCaloriesToGain] = useState(null);
  useEffect(() => {
    const fetchData = async (user) => {
      const userRef = doc(db, "Users", user.uid); 
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userDetails = docSnap.data();
        setFormData({
          weight: userDetails.weight || '',
          height: userDetails.height || '',
          age: userDetails.age || '',
          gender: userDetails.gender || '',
          activityLevel: formData.activityLevel,
          
        });
      }
      
    };

    // Listen for user authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData(user); // Pass the user ID to fetch data
      } 
    });
  }, []);


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Calculation function
  const calculateCalories = (e) => {
    e.preventDefault();

    let BMR = 0;

    // Calculate BMR based on gender
    if (formData.gender === 'male') {
      BMR = 10 * formData.weight + 6.25 * formData.height - 5 * formData.age + 5;
    } else if (formData.gender === 'female') {
      BMR = 10 * formData.weight + 6.25 * formData.height - 5 * formData.age - 161;
    }

    // Multiply BMR by activity level
    const activityMultiplier = parseFloat(formData.activityLevel);
    const totalCalories = BMR * activityMultiplier;

    // Update state with calculated calories
    setCalories(totalCalories.toFixed(2));
    setCaloriesToLose((totalCalories - 500).toFixed(2)); // Lose weight (500 cal deficit)
    setCaloriesToGain((totalCalories + 500).toFixed(2)); // Gain weight (500 cal surplus)
  };


  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <NavbarNew />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-grow flex justify-center items-center bg-blue-50">
          <div className="w-full max-w-md p-6">
            <div className="bg-white p-10 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-center mb-6">Daily Calorie Intake Calculator</h2>
              <form onSubmit={calculateCalories}>
                <div className="mb-4">
                  <label className="block text-gray-700">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Enter your weight in kg"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Enter your height in cm"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter your age in years"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Activity Level</label>
                  <select
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1.2">Sedentary (little or no exercise)</option>
                    <option value="1.375">Lightly active (light exercise/sports 1-3 days/week)</option>
                    <option value="1.55">Moderately active (moderate exercise/sports 3-5 days/week)</option>
                    <option value="1.725">Active (hard exercise/sports 6-7 days/week)</option>
                    <option value="1.9">Very active (very hard exercise/physical job)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Calculate
                </button>
              </form>

              {calories && (
                <div className="mt-6">
                  <div className="text-center">
                  <h3 className="text-lg font-semibold">Lose Weight</h3>
                  <p className="text-xl">{caloriesToLose} cal/day</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Maintain Weight</h3>
                  <p className="text-xl">{calories} cal/day</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">Gain Weight</h3>
                  <p className="text-xl">{caloriesToGain} cal/day</p>
                </div>
                  
                </div>
              )}

              
            </div>
          </div>
        </div>
        
      </div>
      <FooterNew />
    </div>
  );
};

export default CaloriesC;
