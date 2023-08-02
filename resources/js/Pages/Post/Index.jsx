import {Head, Link, usePage} from '@inertiajs/inertia-react';
import GeneralLayout from '@/Layouts/GeneralLayout';
import Button from '@/Components/Button';
import {Inertia} from '@inertiajs/inertia';
import {useState} from 'react';
import AttachTag from '@/Pages/Tag/AttachTag';
import DetachTag from '@/Pages/Tag/DetachTag';

const buttons = [
	{
		name: 'Show',
		link: '/post/show/'
	},
	{
		name: 'Edit',
		link: '/post/edit/'
	},
	{
		name: 'Remove',
		link: '/post/delete/',
	}
]

export default function Index({props, auth, posts, columns, postCount, tags}) {
	const {flash} = usePage().props
	const [flashVisible, setFlashVisibility] = useState(true)
	const [postTagVisible, setPostToTagVisibility] = useState(false)
	const [detach, setDetach] = useState({})
	function changePost(id, type) {
		Inertia.get('/post/change/'+id+'/'+type)
	}
	return (
		<GeneralLayout auth={auth}>
			<Head title="Posts" />
			{postTagVisible &&
				<AttachTag key={postTagVisible} postId={postTagVisible} tagList={tags} />
			}
			
			{detach.length > 0 &&
				<DetachTag key={detach[0]['pivot'].post_id} postId={detach[0]['pivot'].post_id} tags={detach} />	
			}
			<section className="bg-white drop-shadow-xl p-10 rounded-sm relative max-h-full min-h-screen overflow-y-scroll overflow-x-hidden mx-auto space-y-4 justify-between">
				<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold">Posts</h2>
				
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

						<div className="py-2">
							{(posts.length < postCount) &&
								<Link href="/posts" as="button" type="button" className="transition delay-50 rounded-l-sm bg-teal-700 hover:bg-teal-500 text-slate-100  hover:text-slate-200 text-xl font-medium px-4 py-2">Show All</Link>
							}
							<Link href="/post/new" as="button" type="button" className="transition delay-50 rounded-r-sm bg-slate-700 hover:bg-slate-500 text-slate-100  hover:text-slate-200 text-xl font-medium px-4 py-2">New Post</Link>

	 					</div>
						<div>
							<table className="table-auto text-center">
							<thead>
								<tr className="text-lg capitalize">
								{
									columns.map(column => {
										return (
											<>
												<th className="px-2">{column.split('_').join(' ')}</th>	
											</>
											);
									})
								}
									<th className="px-2">Comments</th>
									<th className="px-2">Tag Count</th>
									<th className="px-2">Tags</th>
									<th className="px-2">Action</th>
								</tr>
								
							</thead>
							<tbody>
								{posts.length > 0 ?
									posts.map((post, i) => {
										let date = new Date(post.published_date)
										return (
											<>
												<tr key={i} className="relative text-md font-medium odd:bg-slate-200">
													<td>{post.id}</td>
													<td>{date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear()}</td>
													<td>{post.heading}</td>
													<td><span className={`${!post.published ? 'bg-red-600/70 rounded-xs text-slate-50 px-2 py-1' : 'bg-green-600 rounded-xs text-slate-50 px-2 py-1'}`}>{post.published ? 'Published' : 'Unpublished'}</span></td>
													<td><span className={`${post.comments.length == 0 ? 'bg-yellow-400 p-2' : 'bg-green-600 text-slate-50 p-2'}`}>{post.comments.length}</span></td>
													<td><span className={`${post.tags.length == 0 ? 'bg-yellow-400 p-2' : 'bg-green-600 text-slate-50 p-2'}`}>{post.tags.length}</span></td>
													<td >
														<button className="transition delay-50 bg-cyan-600 hover:bg-cyan-700
																					px-3 py-1 font-medium text-lg text-slate-50 hover:text-slate-100"
																					onClick={() => setPostToTagVisibility(post.id)}
																					type="button">Attach</button>
														{post.tags.length > 0 && 
															<button className="transition delay-50 bg-stone-500 hover:bg-stone-600
																				px-3 py-1 font-medium text-lg text-slate-50 hover:text-slate-100"
																				onClick={() => setDetach(post.tags)}
																				type="button">Detach</button>
														}
													</td>
													<td className="flex justify-between">
														
														<Link className={`relative w-full transition delay-50 
																${post.published ? 
																	'bg-red-500/80 hover:bg-red-600' : 
																	'odd:bg-green-600 bg-green-600 hover:bg-green-700 odd:hover:bg-sky-600'} 
																	text-slate-50 px-3 py-1 font-medium text-lg hover:text-slate-100`} 
																onClick={() => changePost(post.id, post.published)}
														 		as="button" 
														 		type="button">{post.published ? 'Unpublish' : 'Publish'}</Link>
														<Button model={post.comments} attributes={buttons} id={post.id} /></td>
												</tr>
											</>
											);
									})
								:
								<p className="p-3 text-lg text-red-600 font-semibold text-center">{'Posts not present'}</p>	
								}
							</tbody>
						</table>
						</div>
			</section>
		</GeneralLayout>
	);
}