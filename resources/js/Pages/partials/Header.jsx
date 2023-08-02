import {Link, useForm} from '@inertiajs/inertia-react';
import {useState, useEffect} from 'react';
import {Inertia} from '@inertiajs/inertia';
import {usePage} from '@inertiajs/react';
import Checkbox from '@/Components/Checkbox';

export default function Header({auth, cart, status, canResetPassword}) {
	const [loginVisible, setLogin] = useState(false)
	
	const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

	useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    function checkCart(e, routing) {
    	if(cart > 0) {
    		e.preventDefault()
    		if(confirm('You have items in your Cart. Do you want to Remove and Redirect?')) Inertia.get(route(routing))	
    	} else {
    		Inertia.get(route(routing))	
    	}
    	
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };
  	
	const heading = [
		{
			title: 'Home',
			routing: 'home.index', 
			link: '/',
		},
		{
			title: 'Projects',
			routing: 'project.display', 
			link: '/projects/display',
		},
		{
			title: 'Blogs',
			routing: 'blog.display', 
			link: '/blog/posts',
		},
		{
			title: 'Contact Me',
			routing: 'contact.new', 
			link: '/contact/new',
		},
	]
	return <>
		<div className="relative flex font-bold text-md px-5 z-10">
			<div className="flex-1 py-2">
				<div className="items-left w-auto">
				<h3 className="italic text-sky-300 md:text-2xl lg:text-2xl sm:text-sm font-bold">
					<Link href={route('home.index')} className="cursor-pointer"><span className="drop-shadow-md border-b-2 border-slate-400"><span className="font-serif text-3xl font-bold text-gray-50">A</span>hmed'S <span className="font-serif text-3xl font-bold text-gray-50">F</span>olio</span></Link>
				</h3>
				</div>
			</div>
			<ul className="flex py-2">
				{
					heading.map((nav, i) => {
						let location = window.location.pathname
						let link = nav.link
						if(link == '/') {
							location += 'home'
							link += 'home'
						} 
						return <>
							<li key={i} className="py-1 px-4"><button onClick={e => checkCart(e, nav.routing)} className={`${location.includes(link) ? 'text-sky-400/90 border-b border-sky-400/90' : 'text-slate-50'} transition delay-50 hover:border-b hover:border-sky-400/90 hover:text-sky-400/90`} type="button"><h2 className="drop-shadow-md">{nav.title}</h2></button></li>
						</>
					})
				}
				<li className="relative py-1 pl-1 pr-5 text-slate-100">
					<button className="relative drop-shadow-md">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
						  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
						</svg>
						<div className={`absolute p-1 inset-x-0 text-slate-50 text-xs font-bold ${cart > 0 ? 'bg-teal-500/60' : 'bg-red-500/60' } rounded-full`}><p>{(cart == 0 || cart == null) ? '0' : cart}</p></div>
					</button>
				</li>
				{auth.user == null ?
				<> 
					<li className="relative">
						<button onClick={() => setLogin(!loginVisible)} className="transition delay-100 bg-gray-700 hover:bg-gray-400 rounded-l-xs font-bold px-5 py-1 text-slate-50" type="button">Login</button>
						{loginVisible &&
							<div className="z-40 absolute p-2 w-48 shadow-md bg-gray-700 my-3">
								{status && <div className="my-2 font-medium text-sm text-green-200/70">{status}</div>}
								<form onSubmit={submit} className="w-auto mx-1 my-4">
									<div className="mb-1">
										<label htmlFor="email" className="text-sm text-slate-50 px-1 font-bold block my-2">Email</label>
										<input 
											id="email" 
											type="text" 
											value={data.email} 
											onChange={e => setData('email', e.target.value)} 
											className="transition delay-10 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-sm placeholder-slate-300/80" 
											placeholder="Enter Email" />
										{errors.email &&
											<span className="inline-block p-1 text-red-200/70 text-sm font-medium text-center">{errors.email}</span>
										}
									</div>
									<div className="mb-1 mt-2">
										<label htmlFor="password" className="text-sm text-slate-50 px-1 font-bold block my-1">Password</label>
										<input 
											id="password" 
											type="password" 
											value={data.password} 
											onChange={e => setData('password', e.target.value)} 
											className="transition delay-10 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-sm placeholder-slate-300/80" 
											placeholder="Enter Password" />
										{errors.password && 
											<span className="inline-block p-1 text-red-200/70 text-sm font-medium text-center">{errors.password}</span>
										}
									</div>
									<div className="block mt-4">
					                    <label className="flex items-center">
					                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />
					                        <span className="ml-2 text-sm text-slate-50">Remember me</span>
					                    </label>
					                </div>
									{canResetPassword && (
				                        <Link
				                            href={route('password.request')}
				                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				                        >
				                            Forgot your password?
				                        </Link>
				                    )}
									<div className="mb-1 pt-2 flex">
										<button type="submit" className="transition delay-50 hover:bg-sky-400 flex-1 text-sm px-5 py-1 bg-sky-300 text-slate-700">Login</button>
										<button onClick={() => setLogin(false)} type="button" className="transition delay-50 hover:bg-slate-300 flex-1 text-sm px-5 py-1 bg-slate-200 text-slate-700">Cancel</button>
									</div>
								</form>
							</div>
						}
						
					</li>
					<li><button onClick={() => Inertia.get(route('register'))} className="transition delay-100 bg-sky-400 hover:bg-sky-500 rounded-r-xs font-bold px-5 py-1 text-slate-50" type="button">Register</button></li>
				</> : 
				<>
					<li className="relative">
						<Link href={route('dashboard')} className="transition delay-100 bg-gray-700 hover:bg-gray-400 rounded-l-xs font-bold px-5 py-1 text-slate-50" type="button">{auth.user.first_name+'\'s '}Dashboard</Link>
						<Link className="cursor-pointer transition delay-100 hover:bg-white rounded-sm py-1 px-5 text-center hover:text-slate-900 text-md font-bold bg-sky-500 text-white" method="post" href={route('logout')} as="button">
                             Log Out
                        </Link>
					</li>
				</>
				}
			</ul>
		</div>
	</>
}