import { useState } from 'react'
import './assets/main.css'

function App() {
  
  const [post, setPost] = useState({
    title: '',
    content: ''
  })

  const [posts, setPosts] = useState([])
  const [errors, setErrors] = useState([])

  const storePost = (e) => {
    e.preventDefault()
    if(validateFields().length > 0) return

     setPosts([...posts, post])
     setPost({
      title: '',
      content: ''
     })
  }

  const editPost = (post) => {
    setIsModal(post)
  }

  const handlePost = (e) => {
    setErrors([])
    const name = e.target.name
    const value = e.target.value

    setPost({...post, [name]: value})
    console.log(post);
  }

  const [isModal, setIsModal] = useState(false)
  const validateFields = () => {
    const newErrors = []
    if(post.title === ''){
      newErrors.push({message: 'title field is requaired'})
    }
    if(post.content === ''){
      newErrors.push({message: 'content field is requaired'})
    }
    if(newErrors.length > 0){
      setErrors(newErrors)
    }
    return newErrors
  }
  
  return (
    <>
      <div className="bg-green-50 min-h-screen p-4">
        {/* modal↓↓↓ */}
        {isModal && 
        <div onClick={() => setIsModal(false)} className="modal-shadow">

        <div onClick={(e) => e.stopPropagation()} className='w-1/2 mx-auto mb-4 bg-white p-4 border border-gray-200'>
        <div className='mb-4'>
           <input
        className='border border-gray-500 p-4 w-full'
        placeholder='title'
         /> 
        </div>

        <div className='mb-4'>
        <textarea
        className='border border-gray-500 p-4 w-full'
        placeholder='content'
         />
        </div>
        
        <div className='rr'>
        <a href="#"  className='inline-block px-3 py-2 text-white bg-sky-600 border-sky-500'>
          UPDATE
          </a>
       </div>
        </div>

        </div>
           } 
        {/* modal ↑↑↑ */}

        <div className='w-1/2 mx-auto mb-4 bg-white p-4 border border-gray-200'>
        <div className='mb-4'>
           <input
         onChange={(e) => handlePost(e)}
         name='title'
         value={post.title}
        className='border border-gray-500 p-4 w-full'
        placeholder='title'
         /> 
        </div>

        <div className='mb-4'>
        <textarea
        onChange={(e) => handlePost(e)}
        name='content'
        value={post.content}
        className='border border-gray-500 p-4 w-full'
        placeholder='content'
         />
        </div>
        
        {errors.length > 0 && 
        <div className='mb-4 text-red-600'>
          {errors.map((error, index) => (
            <div key={index}>{error.message}</div>
          ))}
        </div>
        }

        <div className='rr'>
        <a href="#" onClick={(e) => storePost(e)} className='inline-block px-3 py-2 text-white bg-sky-600 border-sky-500'>
          STORE
          </a>
       </div>
        </div>
         
           {posts.map((p, index) => (
         <div key={index} className=' flex justify-between items-center w-1/2 mx-auto bg-white p-4 border border-gray-200'>
         <div>
          <h3>{p.title}</h3>
         <p>{p.content}</p>
         </div>

         <div>
          <span onClick={() => editPost(p)} className='cursor-pointer text-xs text-emerald-600'>EDIT</span>
         </div>
         </div>
           ))}
          
      </div>
    </>
  )
}

export default App
