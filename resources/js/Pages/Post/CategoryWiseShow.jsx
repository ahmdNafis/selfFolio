import VisitorLayout from '@/Layouts/VisitorLayout';
import {Head, Link, usePage} from '@inertiajs/inertia-react'

export default function CategoryWiseShow({props, auth, posts, categoryTitle}) {
	return (
	<VisitorLayout auth={auth}>
		<Head>
			<title>{`Blog Posts for ${categoryTitle}`}</title>
			<meta name="description" content={`Showing all published blog posts for ${categoryTitle}`} />
		</Head>
		<section className="z-10 h-auto drop-shadow-xl py-4 px-3 mx-3 sm:px-4 md:px-7 leading-10 bg-slate-100">
			<div className="grid grid-cols-1 p-2 my-2">
				<div className="relative flex flex-col flex-wrap min-w-full mx-auto p-2 space-y-5">
					<h1 className="flex font-bold text-2xl space-x-3">
						<p className="flex-none">
							<Link preserveState href={route('blog.display')} className="transition delay-100 text-slate-500 hover:text-slate-900 flex-none text-md font-bold">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.0} stroke="currentColor" className="w-7 h-7">
									<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
								</svg>
							</Link>
						</p>
						<p className="flex-1 text-center">{`Showing Posts for "${categoryTitle}"`}</p>
					</h1>
					{
						posts.map((post, i) => {
							return <>
								<div key={i} className="relative flex-1 flex bg-slate-300/80 font-medium drop-shadow-md">
									<div className="flex-none">
										 <img src={window.location.origin+'/'+post.image_url} className="object-cover p-2 h-32 w-48" />
									</div>
									<div className="flex-1 px-5 mx-3">
										 <h2 className="text-gray-700 font-semibold text-left text-xl pt-4 border-b border-slate-400">{post.heading}</h2>
										 <p>{post.description}</p>
										 <p className="text-right"><Link preserveState href={route('blog.post.show', {postId: post.id})} className="transition delay-50 bg-sky-500 text-md font-medium hover:bg-sky-600 rounded-sm px-4 py-1 text-white">Read More</Link></p>
									</div>
								</div>
							</>
						})
					}
				</div>
			</div>
		</section>
	</VisitorLayout>
	);
}