import { Button } from '@/components/ui/button';
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';

export default function Home() {
	return (
		<section className='flex items-center justify-center bg-background h-[90vh]'>
			<div className='relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12'>
				<div className='max-w-3xl mx-auto text-center'>
					<div>
						<span className='w-auto px-6 py-3 rounded-full bg-secondary'>
							<span className='text-sm font-medium text-primary'>
								Sort your notes easily
							</span>
						</span>
						<h1 className='mt-8 text-sxl font-extrabold tracking-tight lg:text-6xl md:text-4xl'>
							Create Notes with Ease!
						</h1>
						<p className='max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Adipisci repudiandae laboriosam totam iure amet.
						</p>
						<div>
							<RegisterLink>
								<Button className='mt-8 text-lg font-semibold'>
									Get Started
								</Button>
							</RegisterLink>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
