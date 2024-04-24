import { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
function ForgotPasswordPage() {
  const [email, setEmail] = useState('');


  const navigate=useNavigate();
  const handleSubmit = () => {
  
   console.log("ff frffr");

    fetch("http://localhost:5001/forgot",{
        method: 'POST',
        headers:{
            "Content-type":"application/json",
        },
        body:JSON.stringify({email:email})
    })
    .then(res=>res.json())
    .then((result)=>{
        if(result.success===true)
        {
            console.log("hello");
            Swal.fire({
                icon: 'success',
                title: 'send Otp',
                text: 'Otp send successfully.',
              });


        }
        else
        {
            console.log(result);
            Swal.fire({
                icon: 'failure',
                title: 'Not Sent22',
                text: 'Not Sent.',
              });
        }
    })
    .catch((err)=>{
        Swal.fire({
            icon: 'failure',
            title: 'Not Sent',
            text: 'Not Sent.',
          });
        console.error(err);
    })




  };

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Your Password1?
          </h2>
        </div>
       
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
            <label htmlFor="email-address" className=" text-indigo-600 hover:text-indigo-500 sr-only">
  Email address
</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
                className="  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <button
            onClick={()=>handleSubmit()}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send OTP
            </button>
          </div>
       
        <div className="text-center">
          <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
