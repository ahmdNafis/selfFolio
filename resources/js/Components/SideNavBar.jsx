import {useState} from 'react';
import {Link} from '@inertiajs/inertia-react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {useAsync} from 'react-async';

const navs = [
	{
		name: 'Home',
		link: '/',
	},
	{
		name: 'Dashboard',
		link: '/dashboard',
	},
	{
		name: 'Order',
		link: '/order/summary',
	},
	{
		name: 'Feedback',
		link: '/feedbacks',
	},
	{
		name: 'Project Type',
		link: '/projectCategories',
	},
	{
		name: 'Project',
		link: '/projects',
	},
	{
		name: 'Blog Category',
		link: '/blog_categories',
	},
	{
		name: 'Post',
		link: '/posts',
	},
	{
		name: 'Tag',
		link: '/tags',
	},
	{
		name: 'Comment',
		link: '/comments',
	},
	{
		name: 'Contact',
		link: '/contacts',
	},
	{
		name: 'Role',
		link: '/roles',
	},
	{
		name: 'User',
		link: '/users',
	},
]

const getUser = async ({id, signal}) => {
		const response = await fetch(`/user/role/${id}`, {signal})
		if(!response.ok) throw new Error(response.statusText)
		//console.log(response.json())
		return response.json()
	}


export default function SideNavbar({props, auth}) {
	const [visible, setVisibility] = useState(false);
	const {data, error, isPending} = useAsync({promiseFn: getUser, id: auth.user.id})
	function logOut() {
		post(route('logout'))
	}
	
	return (
		<div className="relative fixed items-stretch h-full bg-slate-700/80 drop-shadow-lg">
			<div className={`text-center ${!visible ? 'h-full' : 'h-auto'} z-10 py-2 bg-slate-800`}>
				<button onClick={() => setVisibility(!visible)} type="button" className="bg-slate-800 border-1 border-slate-1 rounded-md text-lg text-slate-50 p-4">
					{visible ?
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" class="w-9 h-9">
						  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
						:
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.0" stroke="currentColor" class="w-9 h-9">
						  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
						</svg>
					}
				</button>
			</div>
			{visible && 
				<div className="h-full z-40 bg-slate-800 text-slate-50">
					<div className="pt-4 pb-2 font-semibold text-lg text-center">
						<Link href={`/profile/show/${auth.user.id}`} className="transition delay-100 hover:text-slate-50 cursor-pointer font-extralight text-md mx-5 mt-5 px-2 pt-2 border-b border-slate-200/20 text-slate-300 text-center" as="button" type="button">{auth.user.first_name+' '+(auth.user.last_name ? auth.user.last_name : '')}</Link>
						{data && 
							<p className="font-normal text-sm mt-2 mb-4 px-2 text-yellow-500 text-center">{data.role.role_title}</p>
						}
					</div>
					<ul className="space-y-2.5 py-4">
					{
						navs.map((nav, i) => {
							return (
								<>{(data.role.role_title == 'Admin' || data.role.role_permissions.includes(nav.name.toLowerCase()+':read') || nav.name == 'Dashboard' || nav.name == 'Home') &&
									<li key={i} className={`${window.location.pathname == nav.link ? 'bg-slate-400 border-none rounded-r-sm text-slate-700 ' : ''}'transition delay-50 hover:text-slate-50 hover:bg-sky-500 px-2 leading-loose tracking-wider text-lg font-medium text-right'`}><div className="border-b border-slate-500/70 hover:border-slate-300/70"><Link href={nav.link} className="px-3" as="button" type="button">{nav.name}</Link></div></li>
								}
								</>
								);
						})
					}
					</ul>
					<div className="py-3 flex text-center m-2">
						<Link className="cursor-pointer transition delay-100 cursor-pointer flex-1 hover:bg-white rounded-sm py-2 text-center hover:text-slate-900 text-md font-bold bg-sky-500 text-white" method="post" href={route('logout')} as="button">
                             Log Out
                        </Link>
					</div>
				</div>
			}
		</div>
	);
}