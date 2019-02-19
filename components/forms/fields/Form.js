const Form = ({ heading, children })  => {
  return (
    <>
      <h1 className="font-hairline mb-6 text-center">{ heading }</h1>
      <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg">
        { children }
      </div>
    </>
  )
}

export default Form;