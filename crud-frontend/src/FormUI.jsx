// import { NavLink } from "react-router-dom";

const FormUI = (props) => {
    return (
        <div className="relative flex flex-col justify-center min-h-screen mt-4">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-blue-500/40 ring-2 ring-blue-500 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-blue-400 underline uppercase decoration-slice">
                    {props.title}
                </h1>
                <form className="mt-6" method="GET">
                    {props.children}
                </form>

                
            </div>
            .
            {/* <Footer /> */}
        </div>
    );
}

export default FormUI;