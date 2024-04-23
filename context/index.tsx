'use client';

import { createContext, useContext, useState } from 'react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
type Context = {
	user: any;
	userStatus: string;
	setUserStatus: any;
	isClockedIn: boolean;
	setIsClockedIn: any;
	isOnBreak: boolean;
	setIsOnBreak: any;
	dailyTimeLog: any[];
	setDailyTimeLog: any;
	timerStart: any;
	setTimerStart: any;
	totalWorkTime: any;
	setTotalWorkTime: any;
	workTimer: any;
	setWorkTimer: any;
	totalBreakTime: any;
	setTotalBreakTime: any;
	breakTimer: any;
	setBreakTimer: any;
};

const AppContext = createContext(Object.create(null) as Context);

export function AppProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user } = useKindeBrowserClient();
	const [userStatus, setUserStatus] = useState('Idle');
	const [isClockedIn, setIsClockedIn] = useState(false);
	const [isOnBreak, setIsOnBreak] = useState(false);
	const [dailyTimeLog, setDailyTimeLog] = useState([]);
	const [timerStart, setTimerStart] = useState(0);
	const [totalWorkTime, setTotalWorkTime] = useState(0); // in milliseconds
	const [workTimer, setWorkTimer] = useState(null);
	const [totalBreakTime, setTotalBreakTime] = useState(0); // in milliseconds
	const [breakTimer, setBreakTimer] = useState(null);

	return (
		<AppContext.Provider
			value={{
				user,
				userStatus,
				setUserStatus,
				isClockedIn,
				setIsClockedIn,
				isOnBreak,
				setIsOnBreak,
				dailyTimeLog,
				setDailyTimeLog,
				timerStart,
				setTimerStart,
				totalWorkTime,
				setTotalWorkTime,
				workTimer,
				setWorkTimer,
				totalBreakTime,
				setTotalBreakTime,
				breakTimer,
				setBreakTimer,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContext);
}
