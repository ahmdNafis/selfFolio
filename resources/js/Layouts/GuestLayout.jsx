import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-slate-500">
            <div className="relative flex">
                <div className="flex-1 py-2">
                    <div className="items-left w-auto">
                    <h3 className="italic text-sky-300 md:text-2xl lg:text-2xl sm:text-sm font-bold">
                        <span className="drop-shadow-md border-b-2 border-slate-400"><span className="font-serif text-3xl font-bold text-gray-50">A</span>hmed'S <span className="font-serif text-3xl font-bold text-gray-50">F</span>olio</span>
                    </h3>
                    </div>
                </div>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-gray-700 drop-shadow-2xl text-slate-50 overflow-hidden sm:rounded-sm">
                {children}
            </div>
        </div>
    );
}
