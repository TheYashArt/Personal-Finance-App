function Register(){
    return(
        <div className="flex justify-center">
            <div className="w-fit px-6 py-11 h-fit border-gray-500 border rounded-md mt-8 ">
                <div className="text-2xl text-red-500 ">
                    Register
                </div>
                <div>
                    <label className="flex justify-start mt-5 mb-2">
                        Enter your Email
                    </label>
                    <input className=" flex justify-start outline-none border border-t-0 border-x-0 border-b-red-500 pl-2 py-2 pr-4 " placeholder="example@gmail.com"  />
                </div>
                <div>
                    <label className="flex justify-start mt-5">
                        Enter your Password
                    </label>
                    <input className="flex justify-start outline-none border border-t-0 border-x-0 border-b-red-500 pl-2 py-2 pr-4 " placeholder="password123"  />
                </div>
                <div>
                    <label className="flex justify-start mt-5">
                        Cnfirm your Password
                    </label>
                    <input className="flex justify-start outline-none border border-t-0 border-x-0 border-b-red-500 pl-2 py-2 pr-4 " placeholder="password123"  />
                </div>
                <div className="mt-6">
                    already have an account? <span className="text-red-500">Login Here!</span>
                </div>
                <div className="mt-5">
                    <button className="w-full bg-red-500 text-white text-lg rounded-md py-1">
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Register