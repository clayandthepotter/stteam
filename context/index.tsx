'use client';

import { createContext, useContext, useState } from 'react';

type Context = {
	user: any;
	setUser: any;
	isClockedIn: boolean;
	setIsClockedIn: any;
	isOnBreak: boolean;
	setIsOnBreak: any;
	dailyTimeLog: any[];
	setDailyTimeLog: any;
};

const AppContext = createContext(Object.create(null) as Context);

export function AppProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isClockedIn, setIsClockedIn] = useState(false);
	const [isOnBreak, setIsOnBreak] = useState(false);
	const [dailyTimeLog, setDailyTimeLog] = useState([]);

	return (
		<AppContext.Provider
			value={{
				user,
				setUser,
				isClockedIn,
				setIsClockedIn,
				isOnBreak,
				setIsOnBreak,
				dailyTimeLog,
				setDailyTimeLog,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}
