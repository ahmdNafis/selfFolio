import {Head, Link, usePage} from '@inertiajs/inertia-react';
import VisitorLayout from '@/Layouts/VisitorLayout';
import {useState} from 'react';

export default function Home({props, auth}) {
	const {flash} = usePage().props
	const [flashVisible, setFlashVisibility] = useState(true)
	return <>
			<VisitorLayout auth={auth}>
				<Head>
					<title>{"Creating Unique and Exciting Websites - Ahmed's Folio"}</title>
					<meta name="author" content="Nafis Ahmed" />
					<meta name="robots" content="index, follow" />
					<meta name="description" content="Experienced React and Laravel developer with a passion for creating dynamic and responsive web applications. Check out my portfolio to see my latest projects and learn more about my skills in web development, UX design, and project management." />
				</Head>
					{(flashVisible && flash.deletion) &&
							<div className="relative mx-auto flex px-3 mx-3 mb-1 py-2 bg-red-600/90 text-slate-50 text-lg rounded-sm font-medium drop-shadow-md text-center">
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
					<div className="h-auto drop-shadow-xl mb-4 bg-slate-50 py-4 px-3 mx-3 sm:px-4 md:px-7 leading-10">
						<div className="grid grid-cols-2 px-4 py-5 my-2">
							<div className="relative max-w-5xl mx-auto pt-20 pb-20">
								<h1 className="text-slate-600 tracking text-center tracking-tight font-extrabold text-5xl">echo "Hi! Ahmed Here";<span className="text-5xl font-semibold animate-pulse">|</span></h1>
								<p className="mt-3 text-xl text-slate-500 text-left max-w-4xl mx-auto">
									<code className="font-mono font-bold text-blue-600">Making Laravel & React Applications with ease!</code>
									<p className="py-2 text-xl">
										{ 'Wanna work on a full-stack project? Why not '} 
										<Link href={route('contact.new')} className="transition ease-in-out delay-130 bg-sky-500 hover:bg-sky-700 font-extrabold text-white rounded-full py-2 px-3 mx-1 mt-2">Hire Me</Link>
									</p>
								</p>
								<div className="mt-10 flex justify-center leading-loose">
									<Link href={route('blog.display')} className="transition ease-in-out delay-130 rounded-xs shadow-mg bg-sky-500 hover:bg-sky-700 px-3 py-2 mx-2 text-lg text-white font-bold">Read My Blog</Link>
									<p className="italic py-1"> -or-</p>
									<Link href={route('project.display')} className="transition ease-in-out delay-130 rounded-xs shadow-mg bg-gray-500 hover:bg-gray-700 px-3 py-2 mx-2 text-lg text-white font-bold">View My Projects</Link>
								</div>
							</div>
							<div className="relative max-w-5xl mx-auto p-3">
								<div className="ring-2 ring-slate-300 relative overflow-hidden h-96 w-96 md:shrink-0 bg-gradient-to-b from-slate-200 to-slate-400/90 rounded-full">
									<img src={window.location.origin+"/nafis-ahmed.png"} className="overflow-y-hidden absolute top-5 hue-rotate-15 object-cover p-5 h-96 w-full rounded" />
								</div>
							</div>
						</div>
					</div>
			</VisitorLayout>
	</>
}