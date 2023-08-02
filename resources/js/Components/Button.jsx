import { Link } from '@inertiajs/inertia-react';

export default function Button({model, attributes, id}) {
	function notify(event, name) {
		if(name == 'Remove') !confirm('Are you sure you want to proceed?') ? event.preventDefault() : null
	}

	return (
		<>
			{
				attributes.map(data => {
					return (
						<>
						{(data.name != 'Remove' || model == null ||  model.length < 1) &&
							<Link onClick={(e) => notify(e, data.name) } key={data.id} 
								href={data.link + id} 
								className={`w-full transition delay-50 
									${data.name == 'Remove' ? 
										'bg-slate-500/80 hover:bg-slate-600' : 
										'odd:bg-sky-500 bg-zinc-500 hover:bg-zinc-600 odd:hover:bg-sky-600'} 
										text-slate-50 px-3 py-1 font-medium text-lg hover:text-slate-100`} 
								type="button" 
								as="button">{data.name}</Link>
						}
						</>
					);
				})
			}
		</>
	);
}