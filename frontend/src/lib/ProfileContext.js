// ProfileContext.js
import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
    const [dataProfile, setDataProfile] = useState(null);

    return (
        <ProfileContext.Provider value={{ dataProfile, setDataProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    return useContext(ProfileContext);
}