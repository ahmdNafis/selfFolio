export default function InputLabel({ forInput, value, className, children }) {
    return (
        <label htmlFor={forInput} className={`block font-bold pt-3 pb-1 text-sm text-gray-100 ` + className}>
            {value ? value : children}
        </label>
    );
}
