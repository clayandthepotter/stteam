'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/index';
import { useEffect, useState } from 'react';
import Clock from 'react-live-clock';

const Dashboard = () => {
	const {
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
	} = useAppContext();

	// State to control the rendering of the Clock component
	const [showClock, setShowClock] = useState(false);

	// Effect to enable the Clock after mounting
	useEffect(() => {
		setShowClock(true);
	}, [showClock]);

	// State to control the rendering of the Work Timer component
	const [showWorkTimer, setShowWorkTimer] = useState(false);

	// Effect to enable the Work Timer after mounting
	useEffect(() => {
		setShowWorkTimer(true);
	}, [showWorkTimer]);

	// State to control the rendering of the Break Timer component
	const [showBreakTimer, setShowBreakTimer] = useState(false);

	// Effect to enable the Break Timer after mounting
	useEffect(() => {
		setShowBreakTimer(true);
	}, [showBreakTimer]);

	let breakButtonText = isOnBreak ? 'End Break' : 'Start Break';

	const handleBreak = () => {
		// If on break, end break and resume work timer
		const now = new Date().getTime();
		if (isOnBreak) {
			console.log();
			clearInterval(breakTimer);
			const breakDuration = now - timerStart;
			setTotalBreakTime(breakDuration + totalBreakTime);
			setIsOnBreak(false);
			setDailyTimeLog((logs: any) => [
				...logs,
				`Break ended: ${new Date(now).toLocaleString()}`,
				`You were inactive for: ${formatTime(breakDuration)}`,
			]);
			// Resume work timer
			setTimerStart(now); // reset start time for work
			const newWorkTimer = setInterval(() => {
				setTotalWorkTime((prev: any) => prev + 1000);
			}, 1000);
			setWorkTimer(newWorkTimer);
		} else {
			// Start Break, stop work timer, log break start time
			clearInterval(workTimer);
			setIsOnBreak(true);
			setTimerStart(now);
			setDailyTimeLog((logs: any) => [
				...logs,
				`Break started: ${new Date(now).toLocaleString()}`,
			]);
			const newBreakTimer = setInterval(() => {
				setTotalBreakTime((prev: any) => prev + 1000);
			}, 1000);
			setBreakTimer(newBreakTimer);
		}
	};

	// const handleBreak = () => {
	// 	const now = new Date();
	// 	if (isOnBreak) {
	// 		// Ending break: calculate duration, log end, and stop the timer
	// 		const duration = now.getTime() - breakStartTime.getTime();
	// 		const minutes = Math.floor(duration / 60000);
	// 		const seconds = Math.floor((duration % 60000) / 1000);

	// 		setIsOnBreak(false);
	// 		setIsClockedIn(true);
	// 		setBreakEndTime(now);
	// 		setDailyTimeLog((logs: any) => [
	// 			...logs,
	// 			`Break ended: ${now.toLocaleString()}`,
	// 			`Break duration: ${minutes} minutes and ${seconds} seconds`,
	// 		]);
	// 		setTimerStart(new Date().getTime());
	// 		const newWorkTimer = setInterval(() => {
	// 			const updatedTime = new Date().getTime() - now.getTime();
	// 			setTotalWorkTime(updatedTime);
	// 		}, 1000);
	// 		setWorkTimer(newWorkTimer);
	// 	} else {
	// 		// Starting break: log start and initiate timer
	// 		setIsOnBreak(true);
	// 		setIsClockedIn(false);
	// 		clearInterval(workTimer);
	// 		setBreakStartTime(now);
	// 		setDailyTimeLog((logs: any) => [
	// 			...logs,
	// 			`Break started: ${now.toLocaleString()}`,
	// 		]);
	// 		const newBreakTimer = setInterval(() => {
	// 			const updatedTime = new Date().getTime() - now.getTime();
	// 			setTotalBreakTime(updatedTime);
	// 		}, 1000);
	// 		setBreakTimer(newBreakTimer);
	// 	}
	// };

	const handleClockInOut = () => {
		const now = new Date().getTime();
		if (isClockedIn) {
			clearInterval(workTimer);
			const workedTime = now - timerStart;
			setTotalWorkTime((prev: any) => prev + workedTime);
			setIsClockedIn(false);
			setDailyTimeLog((logs: any) => [
				...logs,
				`Clocked out: ${new Date(now).toLocaleString()}`,
			]);
		} else {
			setIsClockedIn(true);
			setTimerStart(now);
			const newWorkTimer = setInterval(() => {
				setTotalWorkTime((prev: any) => prev + 1000);
			}, 1000);
			setWorkTimer(newWorkTimer);
			setDailyTimeLog((logs: any) => [
				...logs,
				`Clocked in: ${new Date(now).toLocaleString()}`,
			]);
		}
	};

	// const handleClockInOut = () => {
	// 	const now = new Date();
	// 	if (isClockedIn) {
	// 		clearInterval(workTimer);
	// 		const updatedWorkTime =
	// 			Number(now) - Number(timerStart) + accumulatedTime;
	// 		setAccumulatedTime((prev: any) => prev + updatedWorkTime);
	// 		setIsClockedIn(false);
	// 		setTimerStart(null);
	// 		setTotalWorkTime((prev: any) => prev + updatedWorkTime);
	// 		setDailyTimeLog((dailyTimeLog: any) => [
	// 			...dailyTimeLog,
	// 			`Clocked out:  ${new Date().toLocaleString()}`,
	// 		]);
	// 	} else {
	// 		setIsClockedIn(true);
	// 		clearInterval(breakTimer);
	// 		setBreakEndTime(now);
	// 		setDailyTimeLog((dailyTimeLog: any) => [
	// 			...dailyTimeLog,
	// 			`Clocked in:  ${new Date().toLocaleString()}`,
	// 		]);
	// 		setTimerStart(new Date().getTime());
	// 		const newWorkTimer = setInterval(() => {
	// 			const updatedTime = new Date().getTime() - now.getTime();
	// 			setTotalWorkTime(updatedTime);
	// 		}, 1000);
	// 		setWorkTimer(newWorkTimer);
	// 	}
	// };

	useEffect(() => {
		return () => {
			clearInterval(workTimer);
			clearInterval(breakTimer);
		};
	}, [workTimer, breakTimer]);

	// const formatTime = (time: any) => {
	// 	const hours = Math.floor(time / 3600000);
	// 	const mins = Math.floor((time % 3600000) / 60000);
	// 	const secs = Math.floor(((time % 3600000) % 60000) / 1000);
	// 	return `${hours.toString().padStart(2, '0')}:${mins
	// 		.toString()
	// 		.padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	// };

	const formatTime = (time: number) => {
		const hours = Math.floor(time / 3600000);
		const mins = Math.floor((time % 3600000) / 60000);
		const secs = Math.floor((time % 60000) / 1000);
		return `${hours.toString().padStart(2, '0')}:
			${mins.toString().padStart(2, '0')}:
			${secs.toString().padStart(2, '0')}`;
	};

	return (
		<div className='space-y-5'>
			<section className='flex space-x-5'>
				<Card className='w-[70%] h-full'>
					<CardHeader>
						<CardTitle>Daily Time Log</CardTitle>
						<CardDescription>
							{isClockedIn && !isOnBreak
								? 'Clocked In - Active'
								: isClockedIn && isOnBreak
								? 'On Break - Inactive'
								: 'Clocked Out - Inactive'}
						</CardDescription>
					</CardHeader>
					<CardContent className='space-x-2'>
						<ul>
							{dailyTimeLog.map((log, index) => (
								<li key={index}>{log}</li>
							))}
						</ul>
					</CardContent>
					<CardFooter></CardFooter>
				</Card>
				<Card className='w-[30%] h-[100%]'>
					<CardHeader>
						<CardTitle>Time Clock</CardTitle>
						<CardDescription>
							Current Time:{' '}
							{showClock ? (
								<Clock format={'h:mm A'} ticking={true} />
							) : (
								'Loading time...'
							)}{' '}
							<br />
							<br />
							Work Timer:{' '}
							{showWorkTimer
								? `${formatTime(totalWorkTime)}`
								: 'Loading work timer...'}
							<br />
							Break Timer:{' '}
							{showWorkTimer
								? `${formatTime(totalBreakTime)}`
								: 'Loading break timer...'}
						</CardDescription>
					</CardHeader>
					<CardContent className='space-x-2'>
						<Button
							id='clock-in-out'
							onClick={() => handleClockInOut()}
						>
							<p>{isClockedIn ? 'End Shift' : 'Start Shift'}</p>
						</Button>
						<Button id='break' onClick={() => handleBreak()}>
							{breakButtonText}
						</Button>
					</CardContent>
					<CardFooter></CardFooter>
				</Card>
			</section>
			<section>
				<h2></h2>
				<Card>
					<CardHeader>
						<CardTitle>Weekly Attendance Report</CardTitle>
						<CardDescription>Card Description</CardDescription>
					</CardHeader>
					<CardContent>
						<p>Card Content</p>
					</CardContent>
					<CardFooter>
						<p>Card Footer</p>
					</CardFooter>
				</Card>
			</section>
			<section>
				<h2></h2>
				<Card>
					<CardHeader>
						<CardTitle>Card Title</CardTitle>
						<CardDescription>Card Description</CardDescription>
					</CardHeader>
					<CardContent>
						<p>Card Content</p>
					</CardContent>
					<CardFooter>
						<p>Card Footer</p>
					</CardFooter>
				</Card>
			</section>
		</div>
	);
};
export default Dashboard;
