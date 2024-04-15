'use client';

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuGroup,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { UserRound } from 'lucide-react';
import { userNavItems } from '@/lib/navItems';
import Link from 'next/link';

export function UserNav({
	fullName,
	email,
	picture,
}: {
	fullName: string;
	email: string;
	picture: string;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='relative h-10 w-10 rounded-full'
				>
					<Avatar className='h-10 w-10 rounded-full'>
						<AvatarImage src={picture} alt='User Photo' />
						<AvatarFallback>
							<UserRound />
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				<DropdownMenuLabel>
					<div className='flex flex-col space-y-1'>
						<span className='text-sm font-medium leading-none'>
							{fullName}
						</span>
						<span className='text-xs leading-none text-muted-foreground'>
							{email}
						</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{userNavItems.map((item, index) => (
						<DropdownMenuItem asChild key={index}>
							<Link
								href={item.href}
								className='w-full flex justify-between items-center'
							>
								<span className='text-sm font-medium leading-none'>
									{item.label}
								</span>
								<span>
									<item.icon className='w-4 h-4' />
								</span>
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>
					<LogoutLink>Logout</LogoutLink>
				</DropdownMenuLabel>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
