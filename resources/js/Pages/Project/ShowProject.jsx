import {useForm, Link} from '@inertiajs/inertia-react';
import {useState} from 'react';

export default function ShowProject({props, project, visibility}) {
	const [visible, setVisibility] = useState({visibility})
	let published = new Date(project.created_at)
	return <>
		{visible && 
		<section className="absolute inset-0 top-0 left-0 right-10 bottom-0 h-full overflow-hidden w-screen z-40 bg-gray-500/50">
			<div className="relative flex mx-auto py-10">
				<div className="flex w-auto h-auto mx-auto p-10">
					<div className="bg-slate-200 shadow-2xl w-auto text-center rounded-sm p-10">
						<h2 className="flex text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold">
							<p className="flex-1 capitalize">{project.project_title}
								<span className={`${project.project_published ? 'bg-green-600' : 'bg-red-700'} text-white text-sm mx-2 px-5 py-2`}>{project.project_published ? 'Published' : 'Unpublished'}</span>
							</p>

							<button onClick={() => setVisibility(!visible)} className="flex-none cursor-pointer transition delay-100 scale-75 hover:scale-100 text-slate-700 font-bold">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-9 h-9">
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</h2>
						<p className="text-sm capitalize font-semibold flex">
							
							<p className="flex-1 text-left">Category: {project.project_category.project_category_title}</p>
							<p className="text-right flex-1 italic">Published Date: {published.getDate()+'-'+(published.getMonth()+1)+'-'+published.getFullYear()}</p>
							
						</p>
						<img src={window.location.origin+'/'+project.image_url} className="object-contain my-3 w-full h-96 drop-shadow-md" />
						<Link href={project.project_link} className="transition delay-50 underline text-blue-700 hover:text-blue-400 text-lg ">Project Demo</Link>
						<p className="pt-2 font-bold">Price: ${project.price}</p>
						<p className="w-full text-lg text-justify tracking-wider leading-normal py-2" dangerouslySetInnerHtml={{ __html: project.project_description }}>{project.project_description}</p>
					</div>
				</div>
			</div>
		</section>
		}
	</>
}