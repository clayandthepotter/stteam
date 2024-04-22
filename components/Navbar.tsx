import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import {
	RegisterLink,
	LoginLink,
	LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { UserNav } from './UserNav';

export async function Navbar() {
	const { isAuthenticated, getUser } = getKindeServerSession();

	const user = await getUser();

	return (
		<nav className='border-b bg-background h-[10vh] min-h-20 flex items-center'>
			<div className='container flex items-center justify-between'>
				<Link href='/'>
					<h1 className='font-bold text-3xl tracking-tighter'>
						STTEAM
					</h1>
				</Link>
				<div className='flex items center gap-x-3'>
					<ThemeToggle />
					<div className='flex items-center gap-x-3'>
						{(await isAuthenticated()) ? (
							<div className='flex items-center gap-x-3'>
								<UserNav
									fullName={
										(user?.given_name +
											' ' +
											user?.family_name) as string
									}
									email={user?.email as string}
									picture={user?.picture as string}
								/>
							</div>
						) : (
							<div className='flex items-center gap-x-3'>
								<LoginLink>
									<Button>Sign In</Button>
								</LoginLink>
								<RegisterLink>
									<Button variant='secondary'>Sign Up</Button>
								</RegisterLink>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
