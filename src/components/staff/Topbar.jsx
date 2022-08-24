import axios from "axios";
import { useEffect } from "react";
import logo from "../../images/sistLogo.png";
import { deleteCookie, getCookie } from "../../misc/CookieManager";
// import { deleteCookie, getCookie } from "../misc/ManageCookie";
// import { topBar as style } from "../styles/ComponentsStyle";
const style =  {
    account_info_container: 
        `w-full 
        bg-[#9e1c3f]
        drop-shadow-md 
        p-5 flex
        justify-between
        text-white
        fixed
        top-0
        py-2`,

    logo_container: 
        `w-full
        bg-[#831238] 
        p-5`,

    image: 
        `max-h-[80px] 
        sm:h-[80px]`,

    title_container: 
        `px-3 
        py-1 
        text-slate-50 
        bg-[#9E1C3F]
        md:text-xl 
        poppins
        select-none`,

    user_container: 
        `px-3 
        py-1
        flex
        justfy-end
        text-right 
        text-slate-50 
        bg-[#9E1C3F]
        md:text-xl 
        poppins
        select-none`

}

function TopBar({home=false}) {

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/is-logged-in`, {
            "headers": {
                "WWW-Authenticate": getCookie('sid')
            }                  
          }).then((res)=>{
              console.info("PASS");
          }).catch((err)=> {
              window.location = '/login';
          })
    }, []);


    const logout = () => {
        deleteCookie('sid');
        window.location = '/login';
    }
    return (
        <div className="z-50">
            <div className={style.user_container}>
                <button className="bg-[#831238] p-2 px-4" onClick={logout}>Logout</button>
            </div>
            <div className={style.logo_container}>
                <a href="/home">
                    <img src={logo} alt="Logo" className={style.image} />
                </a>
            </div>
            <div className={style.title_container}>
                <a href="/staff/home" className={home ? 'mr-5 ml-2 text-[#FFF] font-bold': 'mx-5 text-[#DDD] hover:text-[#FFF]'}>Home</a>
            </div>
        </div>
    );
}

export default TopBar;