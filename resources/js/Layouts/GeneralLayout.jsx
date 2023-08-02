import SideNavBar from '@/Components/SideNavBar';

export default function GeneralLayout({auth, children}) {
	return (
		<section className="relative overflow-x-hidden bg-gradient-to-b from-slate-400 to-slate-200 sm:h-full md:h-full lg:h-screen w-screen">
			<div className="relative flex h-auto">
				<div className="flex-none">
					<SideNavBar auth={auth} />	
				</div>
				
				<div className="h-full px-5 py-8 mx-auto">
					{children}
				</div>	
			</div>
			
		</section>
		);
}