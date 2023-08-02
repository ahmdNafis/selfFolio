import {Head, Link, Image} from '@inertiajs/inertia-react';
import GeneralLayout from '@/Layouts/GeneralLayout';

export default function ShowPost({post, auth, comments}) {
	return (
		<GeneralLayout auth={auth}>
			<Head title={post.heading} />
			<section className="relative grid items-stretch justify-center h-full p-3">
				<div className="bg-white drop-shadow-xl w-full h-auto rounded-sm px-10 py-5 space-y-5">
					<h1 className="capitalize flex text-3xl font-bold pb-4 border-b border-slate-300 space-x-5">
						<div className="flex-none text-left">
							<Link 
								href={route('post.index')}
								className="transition delay-50 hover:text-slate-400/60"
								as="button"
								type="button">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-9 h-9">
							  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
							</svg>
							</Link>
						</div>
						<div className="flex-1 text-center">{post.heading}</div>
					</h1>
					
					<p className="text-lg font-normal leading-8 tracking-normal p-2 text-slate-900/90 text-justify" dangerouslySetInnerHTML={{ __html: post.body }}></p>
					<div className="p-2 leading-8 tracking-normal">
						{(comments.length > 0) 
							? comments.map(comment => {
							let postDate = new Date(comment.posted_date)
							return <>
								<div className="relative my-5 leading-normal rounded-sm p-4 bg-sky-600 text-slate-50 w-full">
									<h2 className="capitalize text-xl font-semibold"><span className="border-b-2 border-slate-300">{comment.subject}</span></h2>
									<p className="text-sm py-2"><span className="border-b border-slate-200">{postDate.getDate()+'/'+(postDate.getMonth()+1)+'/'+postDate.getFullYear() + ' | ' + comment.commentator.first_name+' '+comment.commentator.last_name}</span></p>
									<p className="tracking-wide font-light text-md pt-3 text-justify tracking-wide">{comment.comment_body}</p>
								</div>
							</>
						}) 
							: <div className="relative mx-auto my-5 leading-loose rounded-sm p-4 bg-slate-300 text-center text-slate-900 w-3/6">No Comments Available</div>
						}

					</div>
				</div>
			</section>
		</GeneralLayout>
	);
}