import { Head, Link, usePage } from '@inertiajs/inertia-react';
import GeneralLayout from '@/Layouts/GeneralLayout';
import Button from '@/Components/Button';

const buttons = [
	{
		name: 'Posts',
		link: '/posts/',
	},
	{
		name: 'Edit',
		link: '/blog_category/edit/'
	},
	{
		name: 'Remove',
		link: '/blog_category/delete/'
	}
]

export default function Index({props, auth, categories, columns}) {
	const {flash} = usePage().props

	return (
		<GeneralLayout auth={auth}>
			<Head title="Blog Categories" />
				<section className="bg-white drop-shadow-xl p-10 rounded-sm h-full relative items-center grid space-y-4 justify-center">
						<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold">Blog Categories</h2>
						{flash.message &&
							<div className="py-2 bg-green-600/90 text-slate-50 text-lg rounded-sm font-medium drop-shadow-md text-center">
								<p className="px-3 py-1">{flash.message}</p>
							</div>
						}
						{flash.deletion &&
							<div className="py-2 bg-red-600/90 text-slate-50 text-lg rounded-sm font-medium drop-shadow-md text-center">
								<p className="px-3 py-1">{flash.deletion}</p>
							</div>
						}
						<div className="py-2">
							<Link href="/blog_category/new" as="button" type="button" className="transition delay-50 rounded-sm bg-slate-700 hover:bg-slate-500 text-slate-100  hover:text-slate-200 text-xl font-medium px-4 py-2">New Category</Link>
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
								<th className="px-2">Posts</th>
								<th className="px-2">Action</th>
								</tr>
								
							</thead>
							<tbody>
								{categories.length > 0 ? 
									categories.map(category => {
										return (
											<>
												<tr className="text-md font-medium odd:bg-slate-200">
													<td>{category.id}</td>
													<td>{category.blog_category_title}</td>
													<td><span className={`${!category.blog_category_activity ? 'bg-red-600/70 rounded-xs text-slate-50 px-2 py-1' : 'bg-green-600 rounded-xs text-slate-50 px-2 py-1'}`}>{category.blog_category_activity ? 'Active' : 'Inactive'}</span></td>
													<td><span className={`${category.posts != null && category.posts.length == 0 ? 'bg-yellow-400 p-2' : 'bg-green-600 text-slate-50 p-2'}`}>{category.posts != null ? category.posts.length : '0'}</span></td>
													<td className="flex justify-between"><Button model={category.posts} attributes={buttons} id={category.id} /></td>
												</tr>
											</>
											);
									})
								:
								<>
									<p className="p-3 text-lg text-red-600 font-semibold text-center">{'Blog Categories not present'}</p>	
								</>
								}
							</tbody>
						</table>
						</div>
				</section>
		</GeneralLayout>
		);
}