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
	breakStartTime: any;
	setBreakStartTime: any;
	breakEndTime: any;
	setBreakEndTime: any;
	timerActive: any;
	setTimerActive: any;
	timerStart: any;
	setTimerStart: any;
	accumulatedTime: any;
	setAccumulatedTime: any;
	timerDisplay: any;
	setTimerDisplay: any;
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
	const [user, setUser] = useState(null);
	const [isClockedIn, setIsClockedIn] = useState(false);
	const [isOnBreak, setIsOnBreak] = useState(false);
	const [dailyTimeLog, setDailyTimeLog] = useState([]);
	const [breakStartTime, setBreakStartTime] = useState('');
	const [breakEndTime, setBreakEndTime] = useState('');
	const [timerActive, setTimerActive] = useState(false);
	const [timerStart, setTimerStart] = useState(0);
	const [accumulatedTime, setAccumulatedTime] = useState(0);
	const [timerDisplay, setTimerDisplay] = useState('00:00:00');
	const [totalWorkTime, setTotalWorkTime] = useState(0); // in milliseconds
	const [workTimer, setWorkTimer] = useState(null);
	const [totalBreakTime, setTotalBreakTime] = useState(0); // in milliseconds
	const [breakTimer, setBreakTimer] = useState(null);

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
				breakStartTime,
				setBreakStartTime,
				breakEndTime,
				setBreakEndTime,
				timerActive,
				setTimerActive,
				timerStart,
				setTimerStart,
				accumulatedTime,
				setAccumulatedTime,
				timerDisplay,
				setTimerDisplay,
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
