import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshDashboard = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <DashboardContext.Provider value={{ refreshKey, refreshDashboard }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => useContext(DashboardContext);
