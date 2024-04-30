import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData,setFormData] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent refresh

    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup',
      {
        method: 'POST',    
        headers: {
          'content-Type':'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      if(data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
   
  };

  return (
    <div className="my-20">
      <h1 className="text-4xl font-bold sm:text-5xl text-white my-10 text-center">
        Sign Up
      </h1>
      <form onSubmit = { handleSubmit }
        action=""
        className="flex flex-col w-3/4 sm:w-1/3 mx-auto justify-center gap-5"
      >
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border rounded outline-none p-3 text-center" onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border rounded outline-none p-3 text-center" onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border rounded outline-none p-3 text-center" onChange={handleChange}
        />
        <button
          type="submit" disabled={loading} 
          className="text-2xl font-bold sm:text-3xl text-white p-3 my-5 text-center border-violet-600 rounded bg-violet-600 hover:bg-violet-400 hover:text-black disabled:opacity-80"
        >
          {loading ? 'Loading ...' : 'SIGN UP' }
        </button>
      </form>
      <div className="flex  gap-3 justify-center mt-5">
        <p className='text-white text-xl '>Have an account ?</p>
        <Link to={"/sign-in"}>
          <span className="text-xl sm:text-2xl text-blue-600 font-extrabold">
            Sign In
          </span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5 text-center'>{error}</p>}
    </div>
  );
}
