'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

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
import { Checkbox } from '@/components/ui/checkbox';

const Dashboard = () => {
	const {
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
			console.log(breakTimer);
			clearInterval(breakTimer);

			const breakDuration = now - timerStart;
			setTotalBreakTime(totalBreakTime + breakDuration);
			setIsOnBreak(false);
			setDailyTimeLog((logs: any) => [
				...logs,
				`Break ended: ${new Date(now).toLocaleString()}`,
				`You were inactive for: ${formatTime(breakDuration)}`,
			]);
			console.log(breakTimer);
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
			setDailyTimeLog((logs: any) => [
				...logs,
				`Break started: ${new Date(now).toLocaleString()}`,
			]);
			setTimerStart(now); // set start time for break
			const newBreakTimer = setInterval(() => {
				setTotalBreakTime((prev: any) => prev + 1000);
			}, 1000);
			setBreakTimer(newBreakTimer);
		}
	};

	const handleClockInOut = () => {
		// clock out logic
		setUserStatus('Idle');
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
			// clock in logic
			setUserStatus('Active');
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

	useEffect(() => {
		return () => {
			clearInterval(workTimer);
			clearInterval(breakTimer);
		};
	}, [workTimer, breakTimer]);

	const formatTime = (time: number) => {
		const hours = Math.floor(time / 3600000);
		const mins = Math.floor((time % 3600000) / 60000);
		const secs = Math.floor((time % 60000) / 1000);
		return `${hours.toString().padStart(2, '0')}:
			${mins.toString().padStart(2, '0')}:
			${secs.toString().padStart(2, '0')}`;
	};

	const userStatusOptions = [
		'Active',
		'On Break',
		'Lunch Break',
		'Meeting',
		'Training',
		'Focus',
	];

	return (
		<div className='space-y-5'>
			<section className='flex space-x-5'>
				<Card className='w-[70%] h-full'>
					<CardHeader>
						<CardTitle>Daily Time Log</CardTitle>
						<CardDescription>
							{isClockedIn && !isOnBreak
								? `Clocked In - ${userStatus}`
								: isClockedIn && isOnBreak
								? `On Break - ${userStatus}`
								: `Clocked Out - ${userStatus}`}
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
					<CardFooter>
						<Select>
							<SelectTrigger className='w-[180px]'>
								<SelectValue placeholder='Select a Status:' />
							</SelectTrigger>
							<SelectContent>
								{userStatusOptions.map((item, index) => (
									<SelectItem
										key={index}
										id={index.toString()}
										value={item}
										onClick={() => setUserStatus(item)}
									>
										{item}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</CardFooter>
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
