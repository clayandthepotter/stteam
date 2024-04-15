'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { mainNavItems } from '@/lib/navItems';

export const DashboardNav = () => {
	const pathname = usePathname();
	console.log(pathname);

	return (
		<nav className='grid items-start gap-2'>
			{mainNavItems.map((item, index) => (
				<Link href={item.href} key={index}>
					<span
						className={cn(
							'group flex w-full h-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
							pathname === item.href ? 'bg-accent' : ''
						)}
					>
						<item.icon className='mr-2 h-4 w-4 text-primary' />
						{item.name}
					</span>
				</Link>
			))}
		</nav>
	);
};
