import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const {signinUser } = useContext(AuthContext);

  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    signinUser(email, password)
    .then(result => {
      console.log(result.user)
      navigate("/")
    })
    .catch(error => {
      console.log("ERROR", error);
    })
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-4xl text-center p-8 font-bold">Login here</h1>
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
        <p>Don&apos;t have an account ? <Link className="underline text-blue-500" to="/register">Register now</Link></p>
      </form>
    </div>
  </div>
</div>
  )
}

export default Login