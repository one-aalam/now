
const TextField = ({
    name,
    type = 'text',
    label = '',
    placeholder = '' ,
    value = '' ,
    onChange = () => {}
  }) => {
    return (
      <div className="mb-4">
        <label className="font-bold text-grey-darker block mb-2">{label}</label>
        <input type={type} name={name} value={value} onChange={onChange} className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow" placeholder={placeholder} />
      </div>
    )
}

export default TextField;