import {useForm, Link} from '@inertiajs/inertia-react';
import {useState} from 'react';

export default function Checkout({props, auth, visibility, projects}) {
	const [visible, setVisibility] = useState({visibility})
	const [projectVisible, setProjectVisible] = useState(true)
	const [infoVisible, setInfoVisible] = useState(false)
	const [confirmVisible, setConfirmVisible] = useState(false)
	const [totalPrice, setTotalPrice] = useState(0)
	const [totalQuantity, setTotalQuantity] = useState(0)
	const {data, setData, post, processing, errors} = useForm({
		first_name: null,
		last_name: null,
		email: null,
		address: null,
		cellphone: null,
		city: null,
		country: null,
		notes: '',
		total_price: null,
		total_quantity: null,
		projects: []
	})

	function changeProject() {
		let totalQ = 0
		let totalP = 0
		for(let i in projects) {
			totalQ += +projects[i].quantity
			totalP += +projects[i].price
		}
		setTotalPrice(totalP)
		setTotalQuantity(totalQ)
		if(auth.user == null) {
			setProjectVisible(false)
			setInfoVisible(true)	
		} else {
			let user = auth.user
			setConfirmVisible(true)
			setProjectVisible(false)
			data.first_name = user.first_name
			data.last_name = user.last_name
			data.email = user.email
			data.address = user.address
			data.cellphone = user.cellphone
			data.city = user.city
			data.country = user.country
		}
		
	}

	function toProject() {
		setInfoVisible(false)
		setProjectVisible(true)
	}

	function toInfo() {
		if(auth.user == null) {
			setConfirmVisible(false)
			setInfoVisible(true)		
		} else {
			setConfirmVisible(false)
			setInfoVisible(false)
			setProjectVisible(true)
		}
	}

	function changeInfo() {
		setInfoVisible(false)
		setConfirmVisible(true)
	}
	
	function submit(e) {
		e.preventDefault()
		data.total_price = totalPrice.toFixed(2)
		data.total_quantity = totalQuantity
		data.projects.push(projects)
		post(route('order.store'))
		setVisibility(!visible)
	}
	console.log(auth)
	return <>
		{(visible) && 
		<section className="absolute inset-0 -top-10 -left-10 right-10 bottom-0 h-auto overflow-y-scroll overflow-x-hidden w-screen z-40 bg-gray-500/50">
			<div className="relative flex mx-auto py-20">
				<div className="flex w-auto mx-auto p-10">
					<div className="bg-slate-200 h-auto shadow-2xl w-full rounded-sm p-10">
						<h2 className="text-center text-xl text-slate-700 font-medium">Cart ({projects.length})</h2>
						<ul className="text-center flex py-2 justify-between text-lg border-t border-b border-slate-300 my-3 font-bold">
							<li className={`w-full ${projectVisible ? 'bg-sky-500 text-slate-50 ' : 'bg-sky-300/50 text-slate-500 ' } px-3 py-1 border-r-2`}>Projects</li>
							<li className={`w-full ${infoVisible ? 'bg-sky-500 text-slate-50 ' : 'bg-sky-300/50 text-slate-500 ' } px-3 py-1 border-r-2`}>Information</li>
							<li className={`w-full ${confirmVisible ? 'bg-sky-500 text-slate-50 ' : 'bg-sky-300/50 text-slate-500 ' } px-3 py-1`}>Confirm</li>
						</ul>
						<div className="py-3">
							{projectVisible && <>
								<h2 className="text-gray-700 text-xl text-center font-semibold pb-2">Selected Items</h2>
								<ul className="flex justify-center flex-wrap space-x-1 text-md text-slate-700 capitalize tracking-wide leading-loose">
									{projects.map((proj, i) => {
										return <>
											<li key={i} className="bg-slate-300 px-4 my-1">
												<h3 className="font-semibold border-b border-gray-500/50">{proj.project_title}</h3>
												<div className="flex text-center justify-center">
													<img src={window.location.origin+'/'+proj.image_url} className="py-1 border border-gray-300 my-1 object-contain w-20 h-20" />
												</div>
												<p className="text-center text-sm py-2 font-semibold"><span className="underline pr-1">Quantity:</span> {proj.quantity}</p>
												<p className="text-center text-sm pb-2 font-semibold"><span className="underline pr-1">Price:</span> ${proj.price}</p>
											</li>
										</>
									})}
								</ul>
								<div className="relative flex mx-auto text-center pt-10">
									<Link preserveState onClick={() => setVisibility(!visible)} className="w-full transition delay-50 px-4 py-2 text-md- font-medium bg-slate-600 hover:bg-slate-400 text-slate-50 rounded-l-sm">Back</Link>
									<button onClick={() => changeProject()} className="w-full transition delay-50 px-4 py-2 text-md- font-medium bg-sky-500 hover:bg-sky-600 text-slate-50 rounded-r-sm">Next</button>
								</div>
							</>
							}

							{infoVisible && <>
								<h2 className="text-gray-700 text-xl text-center font-semibold">Customer Details</h2>
								<form onSubmit={submit} className="w-full space-y-4">
									<div className="mb-3">
										<label htmlFor="email" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Email <span className="text-red-500">*</span></label>
											<input 
												id="email" 
												type="text" 
												value={data.email} 
												onChange={e => setData('email', e.target.value)} 
												className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-300/90" 
												placeholder="Enter Email" />
											{errors.email && 
												<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.email}</span>
											}
									</div>
									<div className="mb-3">
											<label htmlFor="cellphone" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Cellphone</label>
											<input 
												id="cellphone" 
												type="text" 
												value={data.cellphone} 
												onChange={e => setData('cellphone', e.target.value)} 
												className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-300/90" 
												placeholder="Enter Cellphone" />
											{errors.cellphone && 
												<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.cellphone}</span>
											}
									</div>
									<div className="mb-3 flex flex-wrap space-x-2">
										<div className="flex-1">
											<label htmlFor="first_name" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">First Name <span className="text-red-500">*</span></label>
											<input 
												id="first_name" 
												type="text" 
												value={data.first_name} 
												onChange={e => setData('first_name', e.target.value)} 
												className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-300/90" 
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
												className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-300/90" 
												placeholder="Enter Last Name" />
											{errors.last_name && 
												<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.last_name}</span>
											}	
										</div>
									</div>
									<div className="mb-3">
											<label htmlFor="address" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Full Address <span className="text-red-500">*</span></label>
											<input 
												id="address" 
												type="text" 
												value={data.address} 
												onChange={e => setData('address', e.target.value)} 
												className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-300/90" 
												placeholder="Enter Detailed Address" />
											{errors.address && 
												<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.address}</span>
											}
									</div>
									<div className="mb-3 flex flex-wrap space-x-2">
										<div className="flex-1">
											<label htmlFor="city" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">City <span className="text-red-500">*</span></label>
											<input 
												id="city" 
												type="text" 
												value={data.city} 
												onChange={e => setData('city', e.target.value)} 
												className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-300/90" 
												placeholder="Enter City" />
											{errors.city && 
												<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.city}</span>
											}	
										</div>
										<div className="flex-1">
											<label htmlFor="country" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Country <span className="text-red-500">*</span></label>
											<input 
												id="country" 
												type="text" 
												value={data.country} 
												onChange={e => setData('country', e.target.value)} 
												className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-300/90" 
												placeholder="Enter Last Name" />
											{errors.country && 
												<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.country}</span>
											}	
										</div>
									</div>
									<div className="mb-3">
										<label htmlFor="notes" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Notes</label>
										<textarea 
											id="notes" 
											type="text" 
											value={data.notes} 
											onChange={e => setData('notes', e.target.value)} 
											className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-300/90" 
											placeholder="Mention Anything Important"
											rows="7">
										</textarea>
										{errors.notes && 
											<span className="inline-block rounded-sm shadow-md p-1 my-1 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.notes}</span>
										}
									</div>
								</form>
								<div className="relative flex mx-auto text-center pt-10">
									<button preserveState onClick={() => toProject()} className="w-full transition delay-50 px-4 py-2 text-md- font-medium bg-slate-600 hover:bg-slate-400 text-slate-50 rounded-l-sm">Back</button>
									{(data.first_name != null && data.email != null && data.city != null && data.country != null && data.address != null) &&
										<button onClick={() => changeInfo()} className="w-full transition delay-50 px-4 py-2 text-md- font-medium bg-sky-500 hover:bg-sky-600 text-slate-50 rounded-r-sm">Next</button>
									}
								</div>
							</>
							}

							{confirmVisible && <>
								<h2 className="text-gray-700 text-xl text-center font-semibold pb-2">Confirmation</h2>
								<div className="w-full flex justify-center flex-wrap space-y-1 text-md text-slate-700 capitalize tracking-wide leading-loose">
									<div className="flex-none mx-2 px-2">
										<ul className="">
										{projects.map((proj, i) => {
											return <>
												<li key={i} className="px-4 my-1 bg-slate-300">
													<h3 className="text-center font-semibold border-b border-gray-500/50">{proj.project_title}</h3>
													<div className="flex text-center justify-center">
														<img src={window.location.origin+'/'+proj.image_url} className="py-1 border border-gray-300 my-1 object-contain w-20 h-20" />
													</div>
													<p className="text-center text-sm py-2 font-semibold">Quantity: {proj.quantity}</p>
													<p className="text-center text-sm pb-2 font-semibold"><span className="underline pr-1">Price:</span> ${proj.price}</p>
												</li>
											</>
										})}
										<li className="px-2 font-light text-center">
											<div>Total Quantity: <span className="font-bold">{totalQuantity}</span></div>
											<div>Total Price: <span className="font-bold">${totalPrice.toFixed(2)}</span></div>
										</li>
										</ul>
									</div>
									<div className="flex-1 text-slate-700 ">
										<p className="text-md tracking-wide"><span className="font-bold underline pr-3">Name:</span> {data.first_name+' '+(data.last_name!=null && data.last_name)}</p>
										 {(data.cellphone != null) &&
										 	<p className="flex flex-wrap text-md tracking-wide"><span className="font-bold underline pr-3">Cellphone:</span> {data.cellphone}</p>
										  }
										<p className="text-md tracking-wide normal-case"><span className="font-bold underline pr-3">Email:</span> {data.email}</p>
										<p className="text-md tracking-wide normal-case"><span className="font-bold underline pr-3">Address:</span> {data.address}</p>
										<p className="text-md tracking-wide normal-case"><span className="font-bold underline pr-3">City:</span> {data.city}</p>
										<p className="text-md tracking-wide normal-case"><span className="font-bold underline pr-3">Country:</span> {data.country}</p>
										{(data.notes != null) &&
										 	<p className="pt-1 flex flex-wrap text-md tracking-wide text-justify leading-tight"><span className="font-bold underline pr-3">Notes:</span> {data.notes}</p>
										  }
									</div>
								</div>
								<div className="relative flex mx-auto text-center pt-10">
									<button preserveState onClick={() => toInfo()} className="w-full transition delay-50 px-4 py-2 text-md- font-medium bg-slate-600 hover:bg-slate-400 text-slate-50 rounded-l-sm">Back</button>
									<button onClick={submit} className="w-full transition delay-50 px-4 py-2 text-md- font-medium bg-sky-500 hover:bg-sky-600 text-slate-50 rounded-r-sm">Confirm Order</button>
								</div>
								</>
							}
						</div>
					</div>
				</div>
			</div>
		</section>
		}
	</>
}