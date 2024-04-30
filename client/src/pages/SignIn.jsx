import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../redux/user/userSlice';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Define the dispatch function

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart()); // Use dispatch function here
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="my-20 border border-violet-600 rounded-lg shadow-md shadow-violet-600 w-3/4  sm:w-1/3 mx-auto p-10">
      <h1 className="text-4xl font-bold sm:text-5xl text-white my-10 text-center">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} action="" className="flex flex-col mx-auto justify-center gap-5">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border rounded outline-none p-3 text-center"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border rounded outline-none p-3 text-center"
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="text-2xl font-bold sm:text-3xl text-white p-3 my-5 text-center border-violet-600 rounded bg-violet-600 hover:bg-violet-400 hover:text-black disabled:opacity-80"
        >
          {loading ? 'Loading ...' : 'SIGN IN'}
        </button>
      </form>
      <div className="flex  gap-3 justify-center mt-5">
        <p className='text-white text-xl '>Dont have an account ?</p>
        <Link to={"/sign-up"}>
          <span className="text-xl sm:text-2xl text-violet-600 font-extrabold">
            Sign Up
          </span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5 text-center'>{error}</p>}
    </div>
  );
}
