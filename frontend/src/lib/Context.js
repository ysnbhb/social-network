"use client"
import { createContext, useEffect, useState } from 'react';
// import Profile_Info from './ProfileInfo';
 
export const Context = createContext({
  dataProfile: null,
  setDataProfile: () => {}
});

export   function ContextProvider({children}) {
  const [dataProfile, setDataProfile] = useState(null);
  useEffect(() => {
      const fetchData = async () => {
          try {
            // const profileData = await Profile_Info();
            // setDataProfile(profileData);
            
        } catch (error) {
            console.error("Failed to load stored profile data:", error);
        }
    };
    fetchData();
}, []);
   
   return (
    <Context.Provider value={{dataProfile, setDataProfile}}>
      {children}
    </Context.Provider>
  );
}