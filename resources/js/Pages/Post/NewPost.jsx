import {Head, useForm, Link} from '@inertiajs/inertia-react';
import GeneralLayout from '@/Layouts/GeneralLayout';
import {useState} from 'react';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {EditorState, convertToRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export default function NewPost({props, auth, categories}) {
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
	const {data, setData, post, progress, processing, errors} = useForm({
		published_date: null,
		heading: null,
		description: null,
		body: null,
		image_url: null,
		blog_category_id: null,
		user_id: null,
		caption: null,
	})
	function submit(e) {
		data.body = draftToHtml(convertToRaw(editorState.getCurrentContent()))
		e.preventDefault()
		post('/post/new/store', )
	}
	return (
		<GeneralLayout auth={auth}>
			<Head title="Create Post" />
			<section className="relative grid items-center justify-center h-full">
				<form onSubmit={submit} className="bg-white drop-shadow-xl w-full h-auto rounded-sm px-10 py-5">
					<h2 className="text-center text-2xl text-zinc-500 border-b border-slate-300 my-3 font-bold">New Post</h2>
					<div className="py-3">
						<div className="flex mb-3 space-x-3">
							<div className="flex-1">
								<label htmlFor="heading" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Heading <span className="text-red-500">*</span></label>
								<input 
									id="heading" 
									type="text" 
									value={data.heading} 
									onChange={e => setData('heading', e.target.value)} 
									className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-200 text-md placeholder-slate-300" 
									placeholder="Enter Heading" />
								{errors.heading && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.heading}</span>
								}
							</div>
							<div className="flex-none">
							<label htmlFor="published_date" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Publishing Date <span className="text-red-500">*</span></label>
							<input 
								id="published_date" 
								type="date" 
								value={data.published_date} 
								onChange={e => setData('published_date', e.target.value)} 
								className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-200 text-md placeholder-slate-300" 
								placeholder="Enter Date" />
							{errors.published_date && 
								<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.published_date}</span>
							}
							</div>
						</div>
						<div className="mb-3">
							<label htmlFor="description" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Description</label>
							<textarea 
								id="description" 
								type="text" 
								value={data.description} 
								onChange={e => setData('description', e.target.value)} 
								className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-200 text-md placeholder-slate-300" 
								placeholder="Enter Description"
								rows="3">
							</textarea>
							{errors.description && 
								<span className="inline-block rounded-sm shadow-md p-1 my-1 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.description}</span>
							}
						</div>
						<div className="mb-3">
							<label htmlFor="body" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Body <span className="text-red-500">*</span></label>
							<Editor 
								wrapperClassName={'h-96 overflow-y-scroll'}
								editorClassName={`transition delay-50 w-full px-3 appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-100 focus:border-gray-700 ring-none bg-slate-200 text-slate-800 text-md placeholder-slate-500`}
								editorState={editorState} 
								spellcheck={true}
								onEditorStateChange={setEditorState}
								placeholder={'Write something'}
								 />
							{errors.body && 
								<span className="inline-block rounded-sm shadow-md p-1 my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.body}</span>
							}
						</div>
						<div className="flex mb-3 space-x-3">
							<div className="flex-1">
								<label htmlFor="blog_category_id" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Category <span className="text-red-500">*</span></label>
								<select
									id="blog_category_id"
									onChange={e => setData('blog_category_id', e.target.value)} 
									className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md text-center placeholder-slate-300">
									<option value="">-----Select Category-----</option>
									{
										categories.map(category => {
											return <>
												<option value={category.id}>{category.blog_category_title}</option>
											</>
										})
									}
								</select>
								{errors.blog_category_id && 
									<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.blog_category_id}</span>
								}
							</div>
							<div className="flex-1">
							<label htmlFor="image_url" className="block border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Upload Image</label>
							<input 
								id="image_url" 
								type="file"
								name="image_url" 
								onChange={e => setData('image_url', e.target.files[0])} 
								className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-100 text-md py-1 placeholder-slate-200 block" 
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
							<div className="flex-1">
								<label htmlFor="caption" className="border-b border-gray-300 text-md text-gray-700 font-bold block my-2.5">Image Caption <span className="text-red-500">*</span></label>
									<input 
										id="caption" 
										type="text" 
										value={data.caption} 
										onChange={e => setData('caption', e.target.value)} 
										className="transition delay-50 w-full appearance-none active:text-slate-50 border-none rounded-sm focus:border-1 focus:bg-slate-200 focus:text-slate-600 focus:border-gray-700 ring-none bg-slate-500 text-slate-200 text-md placeholder-slate-300" 
										placeholder="Enter Image Caption" />
									{errors.caption && 
										<span className="inline-block p-1 rounded-sm shadow-md my-2 bg-red-600/70 text-slate-50 text-sm font-bold text-center">{errors.caption}</span>
									}
							</div>
						</div>
						<div className="flex relative mx-auto text-center pb-2 pt-4">
							<Link href="/posts" className="flex-1 transition delay-50 px-4 py-2 text-md- font-medium bg-slate-600 hover:bg-slate-400 text-slate-50 rounded-l-sm" as="button" type="submit">Back</Link>
							<button disabled={processing} className="flex-1 transition delay-50 px-4 py-2 text-md- font-medium bg-sky-500 hover:bg-sky-600 text-slate-50 rounded-r-sm" type="submit">Create</button>
						</div>
					</div>
				</form>
			</section>
		</GeneralLayout>
		);
}