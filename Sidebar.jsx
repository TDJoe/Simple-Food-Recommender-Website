import React from 'react'

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-200 p-4 flex flex-col ">
    <a href="/profile" className="mb-2 p-2 bg-blue-300 rounded hover:bg-blue-400">
      Profile
    </a>
    <a href="/bmicalc" className="mb-2 p-2 bg-blue-300 rounded hover:bg-blue-400">
      BMI Calculator
    </a>
    <a href="/CaloriesC" className="mb-2 p-2 bg-blue-300 rounded hover:bg-blue-400">
      Daily Calorie Intake Calculator
    </a>
    <a href="/MealPlan2" className="mb-2 p-2 bg-blue-300 rounded hover:bg-blue-400">
      Meal Planner
    </a>
    <a href="/Calendar" className="mb-2 p-2 bg-blue-300 rounded hover:bg-blue-400">
      Calendar
    </a>
    <a href="/AboutUs" className="mb-2 p-2 bg-blue-300 rounded hover:bg-blue-400">
      About Me
    </a>
  </aside>
  )
}

export default Sidebar