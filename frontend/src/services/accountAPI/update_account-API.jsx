import React, { useState, useEffect, useContext, useRef } from "react";



const updateAccountInformation = async (id,values) => {
    
    try {
      console.log("Updating user...");
      
      const res = await fetch(`/api/v1/user/update/:${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log("Update failed:", data.error);
        return;
      }
      console.log("User updated successfully:", data.user);
    
    } catch (error) {
      console.error("An error occurred while updating user:", error);
    }
  };
  export default updateAccountInformation;