import {Head, Link, usePage} from '@inertiajs/inertia-react'
import {useState} from 'react';
import VisitorLayout from '@/Layouts/VisitorLayout';
import NewComment from '@/Pages/Comment/NewComment';
import {Inertia} from '@inertiajs/inertia';

export default function BlogShow({props, auth, post}) {
	let created = new Date(post.created_at)
	const {flash} = usePage().props
	const [flashVisible, setFlashVisibility] = useState(true)
	const [newComment, setNewComment] = useState(false)

	return (
		<VisitorLayout auth={auth}>
			<Head>
				<title>{post.heading}</title>
				<meta name="description" content={`${post.description}`} />
			</Head>

			{newComment &&
				<NewComment visibility={newComment} auth={auth} blog={post} />
			}

			<section className="z-10 h-auto drop-shadow-xl pb-4 px-3 mx-3 sm:px-4 md:px-7 leading-10 bg-slate-100">
				<div className="grid grid-cols-1 px-1 py-3 my-2">
						{(flashVisible && flash.message) &&
							<div className="relative mx-auto flex py-2 bg-green-600/90 text-slate-50 text-lg rounded-sm font-medium drop-shadow-md text-center">
								<div className="text-center flex-1"><p className="px-3 py-2 h-full">{flash.message}</p></div>
								<div className="py-1 flex-none text-right px-4">
									<button 
										onClick={() => setFlashVisibility(!flashVisible)}
										className="transition delay-50 hover:text-slate-300/60 h-full"
										type="button">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" class="w-6 h-6">
										  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
										</svg>
									</button>
								</div>
							</div>
						}
						{(flashVisible && flash.deletion) &&
							<div className="relative mx-auto flex py-2 bg-red-600/90 text-slate-50 text-lg rounded-sm font-medium drop-shadow-md text-center">
								<div className="text-center flex-1"><p className="px-3 py-2 h-full">{flash.deletion}</p></div>
								<div className="py-1 flex-none text-right px-4">
									<button 
										onClick={() => setFlashVisibility(!flashVisible)}
										className="transition delay-50 hover:text-slate-300/60 h-full"
										type="button">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" class="w-6 h-6">
										  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
										</svg>
									</button>
								</div>
							</div>
						}
					<div className="relative flex flex-wrap w-full mx-auto pt-2 pb-5 ">
						
						<div className="flex-1 px-2">
							<h1 className="flex border-b border-gray-300 capitalize py-4 my-2 text-slate-600 tracking-wide text-left tracking-tight font-extrabold text-3xl">
								<div className="flex-none pt-1">
									<Link preserveState href={route('blog.display')} className="transition delay-100 text-slate-500 hover:text-slate-900 flex-none text-md font-bold">
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.0} stroke="currentColor" className="w-7 h-7">
											<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
										</svg>
									</Link>	
								</div>
								<div className="flex-1 px-5">
									<p>{post.heading}</p>
									<div className="flex text-sm font-semibold space-x-2 font-gray-800">
									<p>Category: <span className="underline test-sky-500"><Link preserveState href={`/blog/post/category/${post.category.blog_category_title}/${'inertia'}`} className="text-sky-600">{post.category.blog_category_title}</Link></span></p>
									<p>Published: {created.getDate()+'-'+(created.getMonth()+1)+'-'+created.getFullYear()}</p>
									</div>
								</div>
							</h1>
							<div className="border-b border-gray-300">
								<img src={window.location.origin+'/'+post.image_url} className="drop-shadow-lg object-contain py-2 my-2 w-full h-96"/>
								{post.caption &&
									<p className="text-center text-sm italic text-gray-700 pb-2">{post.caption}</p>
								}								
							</div>
							<div className="grid grid-cols-1 gap-2">
								<p className="text-ellipsis overflow-x-scroll text-justify leading-7 text-lg mt-2" dangerouslySetInnerHTML={{ __html: post.body }}></p>	
							</div>
							
						</div>

						<div className="flex-none px-2 py-4 mx-2 border-l border-slate-300">
							<h3 className="text-lg text-slate-500 text-center mx-auto pb-4">Related Tags</h3>
							<div className="grid grid-cols-2">
							{
								post.tags.map((tag, i) => {
									return <>
										<div className="m-0.5"><Link key={i} as="button" className="w-full px-2 font-semibold capitalize rounded-sm bg-inherit text-slate-800 border border-gray-800 hover:bg-gray-600 hover:text-slate-50 text-md ">{tag.tag_name}</Link></div>
									</>
								})
							}
							</div>
						</div>

					</div>

					
					<div className="relative mx-2 space-y-3">
						<h3 className="text-xl text-slate-600 text-left font-semibold border-t border-b border-gray-300 py-2">Leave Your Thoughts <span className="font-normal text-sm">Total Replies ({post.comments.length})</span></h3>
						{
							post.comments.map((comment, i) => {
								let posted = new Date(comment.posted_date)
								return <>
									<div key={i} className="py-2 my-1 bg-slate-200 text-md text-gray-700">
										<span className="font-semibold text-slate-800 text-lg px-1 pb-2 mx-3 rounded-sm border-b border-gray-400">{comment.subject}</span>
										<p className="mx-3 px-1 py-1 font-light text-sm">Commented By: {comment.commentator.first_name+' '+ (comment.commentator.last_name != 'null' && comment.commentator.last_name)}&nbsp; <span className="italic font-semibold">Posted: {posted.getDate()+'-'+(posted.getMonth()+1)+'-'+posted.getFullYear()}</span></p>
										<p className="px-1 pt-4 font-medium mx-3 text-justify tracking-wide leading-tight">{comment.comment_body}</p>
									</div>
								</>
							})
						}
						<div className="flex">
							<button onClick={() => setNewComment(!newComment)} className="px-4 rounded-sm bg-sky-600 text-white">Post Comment</button>
						</div>
					</div>
					
				</div>
			</section>
		</VisitorLayout>
	);
}