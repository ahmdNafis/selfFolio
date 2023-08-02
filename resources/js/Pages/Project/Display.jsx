import {Head, Link, useForm} from '@inertiajs/inertia-react';
import VisitorLayout from '@/Layouts/VisitorLayout';
import { router, useRemember } from '@inertiajs/react'
import {Inertia} from '@inertiajs/inertia';
import axios from 'axios';
import {useState, useEffect, Image} from 'react';
import Checkout from '@/Pages/Commerce/Checkout';
import Rating from '@/Components/Ratings';

export default function Display({props, auth, categories}) {
	const initial = categories[0].id
	const [cart, setCart] = useState([])
	const [cartVisible, setCartVisible] = useState(true)
	const [projects, setProjects] = useState(null)
	const [categoryId, setCategory] = useState(initial)
	const [checkout, setCheckout] = useState(false)
	//const [price, setPrice] = useState(0)

	useEffect(() => {
		axios.get(`/project/details/${initial}`).then((res) => {
			setProjects(res.data.projects)
		})
	}, [initial])
	
	function pushQuantity(projectId, quantity) {
		
		axios.get(`/project/price/${projectId}`).then((res) => {
			let price = res.data.price
			for(let i in cart) {
				if(cart[i].id == projectId) {
					cart[i].quantity = quantity
					cart[i].price = (price * quantity).toFixed(2)
				}
			}
		})
		
		
	}

	function pushProject(project, defaultQuantity) {
		if(!cart.includes(project)) {
			project['quantity'] = defaultQuantity
			setCart([...cart, project])
			setCartVisible(true)
		}
	}
	
	function removeProject(project) {
		setCart(cart.filter(proj => proj != project))
	}

	function getProjects(catId) {
		setCategory(catId)
		axios.get(`/project/details/${catId}`).then((res) => {
			setProjects(res.data.projects)
		})
	}

	return <>
	<VisitorLayout auth={auth} cart={cart.length}>
		<Head>
			<title>{'Displaying Projects'}</title>
			<meta name="description" content="This page displays or shows purchasable projects according to their specified categories" />
		</Head>

		{(cartVisible && cart.length > 0) &&
			<div className="absolute items-stretch justify-center z-30 min-h-auto -right-10 shadow-2xl -top-10 bg-slate-200 p-5 text-center">
				<button onClick={() => setCartVisible(!cartVisible)} className="cursor-pointer transition delay-100 scale-75 hover:scale-100 text-slate-700 font-bold">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-9 h-9">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
				<div className="my-1 py-1">
					<ul className="space-y-4 py-2 mx-2 w-full">
						{
							cart.map((project, i) => {
								return <>
									<li key={i} className="flex text-slate-700 justify-between">
										<div>
											<img src={window.location.origin+'/'+project.image_url} className="object-contain w-32 h-32 mx-2 border border-gray-300" />
										</div>
										<div className="px-1">
											<h2 className="border-b border-stone-300 capitalize text-lg font-semibold">{project.project_title}</h2>
											<div className="inline-block text-left space-x-2">
												<label htmlFor="quantity" className="text-sm font-semibold text-slate-700">Quantity: </label>
												<input onChange={(e) => pushQuantity(project.id, e.target.value)} defaultValue={cart[i].quantity} id="quantity" min="1" name="quantity" type="number" className=" border-none h-8 rounded-sm focus:outline-none active:outline-none bg-slate-50 my-3 w-16 p-2 text-center" />
											</div>
											<p className="tracking-wide pt-1 font-bold text-sm"><span className="underline">Price:</span> ${cart[i].price}</p>
										</div>
										<div className="cursor-pointer transition delay-100 flex-none m-1 px-2 text-red-700 font-bold hover:text-red-500 hover:-translate-y-1">
											<button onClick={() => removeProject(project)} type="button">
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
												<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
											</svg>
											</button>
										</div>
									</li>
								</>
							})
						}
					</ul>
					<div className="flex mt-auto">
					<button disabled={cart.length > 0 ? false : true} onClick={() => setCheckout(!checkout)} className="transition delay-100 text-gray-50 bg-gray-700 hover:bg-slate-500 font-bold text-xl w-full py-1 mt-4 rounded-xs mx-2">Checkout</button>
					</div>
				</div>
			</div>
		}

		{checkout &&
			<Checkout visibility={checkout} projects={cart} auth={auth}/>
		}
		<section>
			<div className="z-10 h-auto drop-shadow-xl bg-slate-50 py-4 px-3 mx-3 sm:px-4 md:px-7 leading-10">
				<div className="grid grid-cols-1 px-4 py-3 my-2">
					<div className="relative min-w-full mx-auto pt-2 pb-20 ">
						<h1 className="pb-2 text-slate-600 tracking-wide text-center tracking-tight font-extrabold text-3xl">Projects</h1>
						<div className="relative flex">
							
								<ul className="flex flex-wrap mx-auto justify-between">
									{
										categories.map((category, i) => {
											return <>
												{(category.projects.length > 0) &&
													<li key={i} className="text-md text-slate-600 font-semibold"><button key={i} onClick={() => getProjects(category.id)} className={`transition delay-100 px-3 my-2 rounded-xs border border-white hover:bg-sky-400 hover:text-slate-50 capitalize ${category.id == categoryId ? 'bg-sky-400 text-slate-50 ' : 'bg-sky-200 text-slate-600 '}`} type="button">{category.project_category_title}</button></li>
												}
											</>
										})
									}
								</ul>
							
						</div>

						{projects &&
							<div className="w-full flex flex-wrap justify-center py-1">
								{
									projects.map((projectP, i) => {
										const created = new Date(projectP.created_at)
										const updated = new Date(projectP.updated_at)
										let ratingSum = 5
										if(projectP.feedbacks.length > 0) {
											ratingSum = 0
											projectP.feedbacks.map(feedback => {
												ratingSum += +feedback.rating
											})
											ratingSum /= projectP.feedbacks.length
										}
										return <>
											<div className="flex text-center m-2 p-2 bg-slate-200"> 
												<div className="flex-1">
													<div className="flex max-h-full h-96 justify-center items-center">
														<img src={window.location.origin+'/'+projectP.image_url} className=" transition delay-150 scale-75 hover:scale-100 p-1 outline outline-1 outline-offset-2 outline-gray-400 object-scale-down" />	
													</div>
													
													<div className="flex my-2 py-2">
														<div className="w-full bg-sky-100">{'Last Updated: '+updated.getDate()+'-'+(updated.getMonth()+1)+'-'+updated.getFullYear()}</div>
														<div className="w-full bg-white">{'Created: '+created.getDate()+'-'+(created.getMonth()+1)+'-'+created.getFullYear()}</div>
													</div>
												</div>
												
												<div className="flex-1 inline-block items-center justify-center py-4">
													<h2 className="text-slate-600 text-2xl py-3 font-semibold px-2 text-gray-800 capitalize border-b border-slate-300 mx-3 py-3">{projectP.project_title}</h2>
													<p className="leading-6 pt-4 px-2 mx-2 text-justify font-normal text-md" dangerouslySetInnerHTML={{ __html: projectP.project_description }}></p>
													<p className="tracking-wide pt-2 font-bold text-lg italic text-orange-600">Quoted Price: ${projectP.price} <span className="text-xs text-slate-600">(negotiable)</span></p>
													<div className="px-4 mb-2 mt-4 flex flex-row flex-wrap space-x-1">
														<p className="text-lg">Customer Rating: </p>
														<p className="flex "><Rating limit={ratingSum} auth={null} project={null} orderId={null} /></p>
													</div>
													<div className="flex px-2 m-2 py-2">
														<a target="_blank" href={projectP.project_link} className="cursor-pointer transition delay-100 bg-sky-500 w-full py-2 text-slate-50 font-bold text-lg hover:bg-sky-700">Live Demo</a>
														<button preserveState onClick={() => pushProject(projectP, 1)} className="transition delay-100 bg-stone-600 w-full py-2 text-slate-50 font-bold text-lg hover:bg-stone-800" type="button">Add To Cart</button>
													</div>
												</div>
											</div>
										</>
									})
								}
							</div>
						}
					</div>
				</div>
			</div>
		</section>
	</VisitorLayout>
	</>
}