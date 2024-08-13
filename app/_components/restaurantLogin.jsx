import React from 'react'

const RestaurantLogin = () => {
  return (
    <>
    <h3>Login Component</h3>
    <div className="input-wrapper">
      <input type="text" name="" placeholder="Enter email id" className="input-field"/>
    </div>
    <div className="input-wrapper">
      <input type="password" name="" placeholder="Enter password" className="input-field"/>
    </div>
    <div className="input-wrapper">
      <button className="button">Login</button>
    </div>
    </>
  )
}

export default RestaurantLogin