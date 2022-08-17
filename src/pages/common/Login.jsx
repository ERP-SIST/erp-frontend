import axios from "axios";
import TopBar from "../../components/common/Topbar";
import { setCookie } from "../../misc/CookieManager";
import Title from "../../misc/TitleModifier";
function Login(){
    const handleChange = (e)=> {
        console.log(+e.target.value);
    }
    const submitLoginForm = (e) => {
        e.preventDefault();
        const userLevel = +(e.target[0].value);
        const username = (e.target[1].value);
        const password = (e.target[2].value);

        if(userLevel === 3) {
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/student/login`, {
              "registerNumber": username,
              "password": password                  
            }).then((res)=>{
                console.log(res);
                window.alert(res.data.message);
                setCookie('sid', res.data.sessionkey);
                window.location = '/student/home'; 
            }).catch((err)=> {
                console.log(err);
            })
        }
    }
    return (
        <div className="bg-[#FFF]">
            <Title name="Login"/>
            <TopBar login={true}/>
            <div className="mt-32 flex">
                <div className="mx-auto bg-[#F2F2F2] p-4 rounded-lg">
                   <h1 className="text-bold text-[32px] text-center mt-2 text-[#9e1c3f]">Login</h1>

                   <form className="mt-10" onSubmit={submitLoginForm}>

                        <select key={"section"} onChange={handleChange} required defaultValue={""} id={"section"} className="block focus:border-2 focus:outline-none rounded-lg border-0 bg-[#FFF] border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2">
                            <option key="" value={""} disabled>
                                Select your option
                            </option>
                           {['Super-Admin', 'Dean/HOD', 'Teaching Staff', 'Student'].map((value, key) => (
                            <option key={key} value={key}>
                            {value}
                            </option>
                        ))}
                        </select>

                        <label className="block mt-6" htmlFor="username" >Username</label>
                        <input className="block focus:border-2 focus:outline-none rounded-lg border-0 border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2" id="username" type='text' required  />
                        <div className="mt-6"></div>
                        <label htmlFor="password" >Password</label>
                        <input className="block focus:border-2 focus:outline-none rounded-lg border-0 border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2" id="password" type='password' required  />
                        <div className="flex justify-between">
                            <input type="submit" className="my-5 py-2 bg-[#9e1c3f] text-[#FFF] px-4 mx-auto text-center items-center"></input>
                        </div>
                   </form> 
                </div>
            </div>
        </div>
    )
}

export default Login;