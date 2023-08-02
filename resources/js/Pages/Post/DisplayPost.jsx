import {Head, Link} from '@inertiajs/inertia-react';
import {useState} from 'react';
import VisitorLayout from '@/Layouts/VisitorLayout';
import axios from 'axios';

export default function DisplayPost({props, auth, latestPost, postsLatest, categories}) {
	const [category, setCategory] = useState('All')
	const [post, setPost] = useState('All')

	function getPosts(title) {
		if(title == 'All') setPost(title)
		setCategory(title)
		if(title != 'All') {
			axios.get(`/blog/post/category/${title}/${'json'}`).then((res) => {
				setPost(res.data.post)
				//setCategory(title)
			})	
		}
	}
	return (
		<VisitorLayout auth={auth}>
			<Head>
				<title>{'Displaying Blog Posts'}</title>
				<meta name="description" content="This page displays all the latest blog posts categorically that have been recently published" />
			</Head>
			<section className="z-10 h-auto drop-shadow-xl pb-4 px-3 mx-3 sm:px-4 md:px-7 leading-10">
				<div className="grid grid-cols-1 px-4 pb-3 mb-1 ">
					<div className="relative min-w-full mx-auto pb-5 mb-2">
						<div className="relative flex">
							
								<ul className="flex flex-wrap mx-auto justify-between items-stretch ">
									<li className="text-md text-slate-600 tracking-wider font-semibold"><button onClick={() => getPosts('All')} className={`${category == 'All' ? 'bg-sky-400 text-slate-50 ' : 'bg-sky-200 text-slate-600 '} shadow-md transition delay-100 px-4 my-2 rounded-xs hover:bg-sky-400 hover:text-slate-50 capitalize bg-sky-200`} type="button">{'All'}</button></li>
									{
										categories.map((cat, i) => {
											return <>
												{(cat.posts.length > 0) &&
													<li key={i} className="text-md text-slate-600 tracking-wider font-semibold"><button key={i} onClick={() => getPosts(cat.blog_category_title)} className={`shadow-md transition delay-100 px-4 my-2 rounded-xs hover:bg-sky-400 hover:text-slate-50 capitalize ${(cat.blog_category_title == category) ? 'bg-sky-400 text-slate-50 ' : 'bg-sky-200 text-slate-600 '}`} type="button">{cat.blog_category_title}</button></li>
												}
											</>
										})
									}
								</ul>
							
						</div>
					</div>

					{(typeof post == 'string' && category) ? <>
					<div className="relative flex flex-wrap p-4 mb-4 space-x-3 bg-white overflow-hidden">
						<div className="relative flex-1 text-slate-800 leading-loose tracking-wide" style={{ background: `url(${window.location.origin+'/'+latestPost.image_url})`, backgroundSize: 'cover', resize: 'both', backgroundRepeat: 'no-repeat'}}>
							<div className="transition delay-50 flex flex-col mt-auto h-full bg-slate-700/60 hover:bg-slate-800/60 px-2 py-5" >
								<div className="mt-auto">
									<Link href={route('blog.post.show', {postId: latestPost.id, postTitle: latestPost.heading.split(' ').join('_')})}>
										<p className="my-1 border-l-4 px-3 mx-3 capitalize border-sky-400 font-semibold text-teal-200">{latestPost.category.blog_category_title}</p>
										<h2 className="capitalize mx-3 text-left font-bold border-b border-slate-300 tracking-tight text-2xl text-slate-50 py-2"><Link className="">{latestPost.heading}</Link></h2>
										<p className="mx-3 text-justify leading-6 py-3 font-light text-white text-lg">{latestPost.description}</p>
									</Link>
								</div>
							</div>
						</div>

						<div className="flex-1">
							<div className="grid grid-cols-2">
							{
								postsLatest.map((post, i) => {
									
									return <>
										<div key={i} className="bg-gray-500 text-white p-2 m-2">
											<Link href={route('blog.post.show', {postId: post.id, postTitle: post.heading.split(' ').join('_')})}>
											<h4 className="capitalize leading-tight font-semibold font-md tracing-wide border-b border-gray-300 mb-2">{post.heading}</h4>
											<img src={window.location.origin+'/'+post.image_url} className="object-contain max-h-40 w-full" />
											<p className="leading-tight pt-2 font-normal text-sm text-justify mx-2 my-1">{post.description}</p>
											</Link>
										</div>
									</>
								})
							}
							</div>
						</div>
					</div>

					{
						categories.map((category, i) => {
							return (<>
								<h2 className="mt-2 drop-shadow-md text-xl border-l-4 border-sky-500 pl-4 text-white capitalize tracking-tight font-extralight">{category.blog_category_title}</h2>
								<div key={i} className="py-3 my-4 relative flex flex-wrap p-4 space-x-3 bg-white overflow-hidden">
									
										{
											category.posts.map((post, i) => {
												return <>
													<div key={i} className='flex flex-1 w-auto'>
														<div className="flex flex-col bg-gray-800/80 p-3 text-white mx-auto">
															<div className="mt-auto">
																<Link href={route('blog.post.show', {postId: post.id, postTitle: post.heading.split(' ').join('_')})}>
																<img src={window.location.origin+'/'+post.image_url} className="drop-shadow-lg object-contain h-96" />
																<h3 className="capitalize font-bold font-lg text-md tracking-wide">{post.heading}</h3>
																<p className="leading-tight">{post.description}</p>	
																</Link>
															</div>
														</div>
													</div>
												</>
											})
										}
									
								</div>
							</>);
						})
					}
					</>
					: <>
						<div className="relative flex flex-row flex-wrap p-4 mb-4 space-x-2 bg-white overflow-hidden">
							{
								post.map((p, i) => {
									return <>
										<div key={i} className="flex-1 bg-gray-500 text-slate-100 p-4 m-2">
											<Link href={route('blog.post.show', {postId: p.id, postTitle: p.heading.split(' ').join('_')})}>
											<h4 className="capitalize font-semibold text-2xl text-center py-2 tracing-wide mb-2">{p.heading}</h4>
											<img src={window.location.origin+'/'+p.image_url} className="drop-shadow-lg object-contain px-5 max-h-96 w-full my-4" />
											<p className="leading-normal pt-2 font-normal text-base tracking-normal text-justify mx-2 my-1">{p.description}</p>
											</Link>
										</div>
									</>
								})
							}
						</div>
					</>
					}
				</div>
			</section>
		</VisitorLayout>
	);
}