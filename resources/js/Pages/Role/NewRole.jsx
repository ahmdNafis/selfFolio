import {useForm, Link} from '@inertiajs/inertia-react';
import {useState} from 'react';

export default function NewRole({props, visibility, permissions}) {
	const [visible, setVisibility] = useState({visibility})
	const [permission, setPermission] = useState([])
	const {data, setData, post, processing, errors} = useForm({
		role_title: '',
		role_permissions: [],
	})

	function pushVals(val) {
		if(!permission.includes(val)) setPermission([...permission, val])
		
	}

	function deleteVal(val) {
		setPermission(permission.filter(perm => perm != val))
	}
	
	function submit(e) {
		e.preventDefault()
		data.role_permissions = permission
		post('/role/new/store', {
			onSuccess: () => setVisibility(!visible), 
		})
	}

	return <>
		{(visible || errors.role_title != null) && 
		<section className="absolute inset-0 top-0 left-0 right-10 bottom-0 h-screen overflow-x-hidden w-screen z-40 bg-gray-500/50">
			<div className="relative flex mx-auto py-10">
				<div className="flex w-auto h-auto mx-auto p-10">
					<form onSubmit={submit} className="bg-slate-200 shadow-2xl w-96 rounded-sm p-10">
					<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold">New Role</h2>
					{(permission.length < 1 || permission.length == 1) && 
						<p className="text-md text-slate-600 font-semibold">{'Permissions Chosen: '+permission+' '}</p>
					}
					{(permission.length > 1) &&<>
						<p className="pb-2 text-md text-slate-600 font-medium">Permissions Chosen</p>
						<ul className="text-sm space-y-1 tracking-wider font-semibold text-slate-800">
							{
								permission.map(perm => {
									return <>
										<li className="flex">
											<p className="flex-1">{perm}</p>
											<span onClick={() => deleteVal(perm)} className="cursor-pointer flex-none font-extrabold text-slate-900 hover:text-slate-400 text-md text-right">X</span>
										</li>
									</>
								})
							}
						</ul>
						</>
					}
					
					<div className="py-3">
						<div className="mb-3">
							<label htmlFor="role_title" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Title <span className="text-red-500">*</span></label>
							<input 
								id="role_title" 
								type="text" 
								value={data.role_title} 
								onChange={e => setData('role_title', e.target.value)} 
								className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-50" 
								placeholder="Enter Title" />
							{errors.role_title && 
								<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.role_title}</span>
							}
						</div>
						<div className="mb-3">
							<label htmlFor="permission" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2">Permissions<span className="text-red-500">*</span></label>
								<select
									multiple
									id="permission"
									onChange={e => pushVals(e.target.value)} 
									name="role_permissions[]"
									className="space-y-1 h-48 py-2 my-5 transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-lg font-semibold text-left placeholder-slate-50">
									
									{
										permissions.map(perm => {

											return <>
												<option value={perm}>{perm.split(':').join(' | 	')}</option>
											</>
										})
									}
								</select>
								{errors.role_permissions && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.role_permissions}</span>
								}
						</div>
						<div className="relative mx-auto text-center pb-4">
							<Link onClick={() => setVisibility(!visible)} className="transition delay-50 px-4 py-2 text-md- font-medium bg-slate-600 hover:bg-slate-400 text-slate-50 rounded-l-sm" as="button" type="submit">Back</Link>
							<button disabled={processing} className="transition delay-50 px-4 py-2 text-md- font-medium bg-sky-500 hover:bg-sky-600 text-slate-50 rounded-r-sm" type="submit">Create</button>
						</div>
					</div>
				</form>
				</div>
			</div>
		</section>
		}
	</>
}