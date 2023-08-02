import {useForm, Link} from '@inertiajs/inertia-react';
import {useState} from 'react';

export default function ChangeRole({roles, existingRole, auth, userId, visibility}) {
	const [visible, setVisibility] = useState({visibility})
	const {data, setData, post, processing, errors} = useForm({
		role_id: '',
		user_id: userId,
	})

	function submit(e) {
		e.preventDefault()
		post(route('user.role.change'));
		setVisibility(!visible)
	}
	return <>
		{(visible || errors.role_id != null) && 
		<section className="absolute inset-0 top-0 left-0 right-10 bottom-0 h-screen overflow-x-hidden w-screen z-40 bg-gray-500/50">
			<div className="relative flex mx-auto py-10">
				<div className="flex w-auto h-auto mx-auto p-10">
					<form onSubmit={submit} className="bg-slate-200 shadow-2xl w-96 rounded-sm p-10">
					<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold">New Role</h2>
					
					<div className="py-3">
						<div className="mb-3">
							<label htmlFor="role_id" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Role <span className="text-red-500">*</span></label>
								<select
									id="role_id"
									onChange={e => setData('role_id', e.target.value)} 
									className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md text-center placeholder-slate-300">
									<option value="">-----Select Role-----</option>
									{
										roles.map(role => {
											return <>
												{(role.role_title != existingRole && role.role_title != 'Admin')&&
													<option key={role.id} value={role.id} className="capitalize text-md font-medium">{role.role_title}</option>
												}
											</>
										})
									}
								</select>
								{errors.role_id && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.role_id}</span>
								}
						</div>
						<div className="flex relative mx-auto text-center pb-1 pt-2">
							<Link onClick={() => setVisibility(!visible)} className="flex-1 transition delay-50 px-4 py-2 text-md- font-medium bg-slate-600 hover:bg-slate-400 text-slate-50 rounded-l-sm" as="button" type="submit">Back</Link>
							<button disabled={processing} className="flex-1 transition delay-50 px-4 py-2 text-md- font-medium bg-sky-500 hover:bg-sky-600 text-slate-50 rounded-r-sm" type="submit">Change</button>
						</div>
					</div>
				</form>
				</div>
			</div>
		</section>
		}
		</>
}