import {useForm, Link} from '@inertiajs/inertia-react';
import {useState} from 'react';

export default function EditUser({props, auth, visibility}) {
	const [visible, setVisibility] = useState({visibility})
	const {data, setData, post, processing, progress, errors} = useForm({
		first_name: '',
		last_name: '',
		city: '',
		country: '',
		address: '',
		cellphone: '',
		password: '',
	})
	
	function submit(e) {
		e.preventDefault()
		post(route('user.exist.update'))
		setVisibility(!visible)
	}
	return <>
		{(visible || (errors.first_name != null || errors.last_name != null || errors.city != null || errors.country != null || errors.address != null || errors.cellphone != null)) && 
		<section className="absolute inset-0 top-0 left-0 right-10 bottom-0 h-full overflow-hidden w-screen z-40 bg-gray-500/50">
			<div className="relative flex mx-auto py-10">
				<div className="flex w-auto h-auto mx-auto p-10">
					<form onSubmit={submit} className="bg-slate-200 shadow-2xl w-96 rounded-sm p-10">
					<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold">Editing {auth.user.first_name}'s Details</h2>
					<div className="py-3">
						<div className="mb-3 flex space-x-3">
							<div className="flex-1">
								<label htmlFor="first_name" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">First Name</label>
								<input 
									id="first_name" 
									type="text" 
									value={data.first_name} 
									onChange={e => setData('first_name', e.target.value)} 
									className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-sm placeholder-slate-300" 
									placeholder="Enter First Name" />
								{errors.first_name && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.first_name}</span>
								}
							</div>
							<div className="flex-1">
								<label htmlFor="last_name" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Last Name</label>
								<input 
									id="last_name" 
									type="text" 
									value={data.last_name} 
									onChange={e => setData('last_name', e.target.value)} 
									className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-sm placeholder-slate-300" 
									placeholder="Enter First Name" />
								{errors.last_name && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.last_name}</span>
								}
							</div>
						</div>
						<div className="mb-3">
							<label htmlFor="address" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Address</label>
							<input 
								id="address" 
								type="text" 
								value={data.address} 
								onChange={e => setData('address', e.target.value)} 
								className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-sm placeholder-slate-300" 
								placeholder="Enter First Name" />
							{errors.address && 
								<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.address}</span>
							}
						</div>
						<div className="mb-3 flex space-x-3">
							<div className="flex-1">
								<label htmlFor="city" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">City</label>
								<input 
									id="city" 
									type="text" 
									value={data.city} 
									onChange={e => setData('city', e.target.value)} 
									className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-sm placeholder-slate-300" 
									placeholder="Enter City" />
								{errors.city && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.city}</span>
								}
							</div>
							<div className="flex-1">
								<label htmlFor="country" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Country</label>
								<input 
									id="country" 
									type="text" 
									value={data.country} 
									onChange={e => setData('country', e.target.value)} 
									className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-sm placeholder-slate-300" 
									placeholder="Enter Country" />
								{errors.country && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.last_name}</span>
								}
							</div>
						</div>
						<div className="mb-3 flex space-x-3">
							<div className="flex-1">
								<label htmlFor="cellphone" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Cellphone</label>
								<input 
									id="cellphone" 
									type="text" 
									value={data.cellphone} 
									onChange={e => setData('cellphone', e.target.value)} 
									className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-sm placeholder-slate-300" 
									placeholder="Enter Cellphone" />
								{errors.cellphone && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.cellphone}</span>
								}
							</div>
							<div className="flex-1">
								<label htmlFor="password" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Password</label>
								<input 
									id="password" 
									type="password" 
									value={data.password} 
									onChange={e => setData('password', e.target.value)} 
									className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-sm placeholder-slate-300" 
									placeholder="" />
								{errors.password && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.password}</span>
								}
							</div>
						</div>
						<div className="relative flex mx-auto text-center pb-4">
							<Link onClick={() => setVisibility(!visible)} className="flex-1 transition delay-50 px-4 py-2 text-md- font-medium bg-slate-600 hover:bg-slate-400 text-slate-50 rounded-l-sm" as="button" type="submit">Back</Link>
							<button disabled={processing} className="flex-1 transition delay-50 px-4 py-2 text-md- font-medium bg-sky-500 hover:bg-sky-600 text-slate-50 rounded-r-sm" type="submit">Update</button>
						</div>
					</div>
				</form>
				</div>
			</div>
		</section>
		}
	</>
}