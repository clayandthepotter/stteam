import {
	Home,
	Settings,
	CreditCard,
	Clock,
	CalendarDays,
	CalendarX2,
	UserRound,
} from 'lucide-react';

export const mainNavItems = [
	{ name: 'Dashboard', href: '/dashboard', icon: Home },
	{
		name: 'Time Clock',
		href: 'dashboard/time-clock',
		icon: Clock,
	},
	{
		name: 'Calendar',
		href: 'dashboard/Calendar',
		icon: CalendarDays,
	},
	{
		name: 'Time Off Requests',
		href: 'dashboard/t-o-r',
		icon: CalendarX2,
	},
	{
		name: 'Settings',
		href: '/dashboard/settings',
		icon: Settings,
	},
	{
		name: 'Billing',
		href: 'dashboard/billing',
		icon: CreditCard,
	},
];

export const userNavItems = [
	{
		label: 'Profile',
		href: '/profile',
		icon: UserRound,
	},
	{
		label: 'User Settings',
		href: '/settings',
		icon: Settings,
	},
];
