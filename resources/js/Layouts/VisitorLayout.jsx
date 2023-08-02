import Header from '@/Pages/partials/Header';
import {useState} from 'react';

export default function VisitorLayout({props, auth, children, cart}) {
	return (
		<section className="relative sm:h-full md:h-full lg:h-screen w-screen overflow-x-hidden bg-slate-500">
			<div className="flex-1 drop-shadow-xl p-5 m-10 rounded-sm">
				<Header auth={auth} cart={cart} />
				<div className="h-full w-full p-2 m-3">
					{children}
				</div>
				<div className="text-center">
					<p className="text-sm font-bold text-slate-300">Copyright © 2023. Nafis Ahmed. All Rights Reserved</p>
				</div>
			</div>
		</section>
		);
}