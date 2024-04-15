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
	} = useAppContext();

	// State to control the rendering of the Clock component
	const [showClock, setShowClock] = useState(false);

	// Effect to enable the Clock after mounting
	useEffect(() => {
		setShowClock(true);
	}, []);

	return (
		<div className='space-y-5'>
			<section>
				<Card>
					<CardHeader>
						<CardTitle>Time Clock</CardTitle>
						<CardDescription>
							Current Time:{' '}
							{showClock ? (
								<Clock format={'h:mm:ss A'} ticking={true} />
							) : (
								'Loading time...'
							)}
						</CardDescription>
					</CardHeader>
					<CardContent className='space-x-2'>
						<Button
							onClick={() => {
								setIsClockedIn(!isClockedIn);
								setDailyTimeLog((dailyTimeLog: any) => [
									...dailyTimeLog,
									`${
										isClockedIn ? 'Clocked out: ' : 'Clocked in: '
									} ${new Date().toLocaleString()}`,
								]);
								setIsOnBreak(false);
							}}
						>
							<p>{isClockedIn ? 'Clock Out' : 'Clock In'}</p>
						</Button>
						<Button
							onClick={() => {
								setIsOnBreak(!isOnBreak);
								setDailyTimeLog((dailyTimeLog: any) => [
									...dailyTimeLog,
									`${
										isOnBreak ? 'Returned: ' : 'On Break: '
									} ${new Date().toLocaleString()}`,
									,
								]);
								if (isOnBreak) {
									setIsClockedIn(false);
								}
							}}
						>
							{isOnBreak ? 'End Break' : 'Take Break'}
						</Button>
					</CardContent>
					<CardFooter>
						<ul>
							{dailyTimeLog.map((log, index) => (
								<li key={index}>{log}</li>
							))}
						</ul>
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
