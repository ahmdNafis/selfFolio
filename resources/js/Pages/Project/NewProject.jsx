import {useForm, Link} from '@inertiajs/inertia-react';
import {useState} from 'react';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';


export default function NewProject({props, categories, visibility}) {
	const [visible, setVisibility] = useState({visibility})
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
	const {data, setData, post, progress, processing, errors} = useForm({
		project_title: null,
		project_description: null,
		project_link: null,
		image_url: null,
		project_published: true,
		price: null,
		project_category_id: null,
	})
	function submit(e) {
		data.project_description = draftToHtml(convertToRaw(editorState.getCurrentContent()))
		e.preventDefault()
		post(route('project.store'))
		setVisibility(!visible)
	}
	return <>
		{(visible || (errors.price != null || errors.project_title != null || errors.project_description != null || errors.project_link != null)) && 
			<section className="absolute inset-0 top-0 left-0 right-10 bottom-0 h-full overflow-x-hidden overflow-y-scroll w-full bg-gray-500/50 z-40">
				<div className="relative flex py-10">
				<form onSubmit={submit} className="mx-auto bg-white drop-shadow-xl w-full h-full rounded-sm px-10 py-5">
					<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold">New Project</h2>
					<div className="py-3">
						<div className="flex mb-3 space-x-3">
							<div className="flex-1">
								<label htmlFor="project_title" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Project Title <span className="text-red-500">*</span></label>
								<input 
									id="project_title" 
									type="text" 
									value={data.project_title} 
									onChange={e => setData('project_title', e.target.value)} 
									className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-900 text-md placeholder-slate-300" 
									placeholder="Enter Project Title" />
								{errors.project_title && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.project_title}</span>
								}
							</div>
							<div className="flex-1">
								<label htmlFor="project_link" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Project Link <span className="text-red-500">*</span></label>
								<input 
									id="project_link" 
									type="text" 
									value={data.project_link} 
									onChange={e => setData('project_link', e.target.value)} 
									className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-300" 
									placeholder="Enter Link" />
								{errors.project_link && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.project_link}</span>
								}
							</div>
						</div>
						<div className="mb-3">
							<label htmlFor="project_description" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Project Description</label>
							<Editor 
								wrapperClassName={'h-96 overflow-y-scroll'}
								editorClassName={`transition delay-50 w-auto px-3 appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-100 focus:border-gray-700 ring-none bg-slate-200 text-slate-800 text-md placeholder-slate-500`}
								editorState={editorState} 
								spellcheck={true}
								onEditorStateChange={setEditorState}
								placeholder={'Write something'}
								 />
							{errors.project_description && 
								<span className="inline-block rounded-sm shadow-md p-1 my-1 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.project_description}</span>
							}
						</div>
						
						<div className="flex mb-3 space-x-3">
							<div className="flex-1">
								<label htmlFor="price" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Price <span className="text-red-500">*</span></label>
								<input 
									id="price" 
									type="number" 
									value={data.price} 
									onChange={e => setData('price', e.target.value)} 
									className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md placeholder-slate-300" 
									placeholder="Enter Price" />
								{errors.price && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.price}</span>
								}
							</div>
							<div className="flex-1">
								<label htmlFor="project_category_id" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Project Category <span className="text-red-500">*</span></label>
								<select
									id="project_category_id"
									onChange={e => setData('project_category_id', e.target.value)} 
									className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md text-center placeholder-slate-300">
									<option value="">-----Select Category-----</option>
									{
										categories.map(category => {
											return <>
												<option value={category.id}>{category.project_category_title}</option>
											</>
										})
									}
								</select>
								{errors.project_category_id && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.project_category_id}</span>
								}
							</div>
							<div className="flex-1">
								<label htmlFor="image_url" className="block border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Upload Image</label>
								<input 
									id="image_url" 
									type="file"
									name="image_url" 
									onChange={e => setData('image_url', e.target.files[0])} 
									className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md py-1 placeholder-slate-300 block" 
									placeholder="Upload Image" />
								{progress && (
							      <progress value={progress.percentage} max="100">
							        {progress.percentage}%
							      </progress>
							    )}
								{errors.image_url && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.image_url}</span>
								}
							</div>
						</div>
						<div className="relative flex mx-auto text-center pb-4">
							<Link href="/projects" className="flex-1 cursor-pointer transition delay-50 px-4 py-2 text-md- font-medium bg-slate-600 hover:bg-slate-400 text-slate-50 rounded-l-sm" as="button" type="submit">Back</Link>
							<button disabled={processing} className="flex-1 cursor-pointer transition delay-50 px-4 py-2 text-md- font-medium bg-sky-500 hover:bg-sky-600 text-slate-50 rounded-r-sm" type="submit">Create</button>
						</div>
					</div>
				</form>
				</div>
			</section>
			}
		</>
}