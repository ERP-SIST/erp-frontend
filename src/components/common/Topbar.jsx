import { useState } from "react";
import logo from "../../images/sistLogo.png";
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
        select-none`

}

function TopBar({home=false, login=false, register=false}) {

    return (
        <div className="z-50">

            <div className={style.logo_container}>
                <a href="/home">
                    <img src={logo} alt="Logo" className={style.image} />
                </a>
            </div>
            <div className={style.title_container}>
                <a href="/" className={home ? 'mr-5 ml-2 text-[#FFF] font-bold': 'mx-5 text-[#DDD] hover:text-[#FFF]'}>Home</a>
                <a href="/login" className={login ? 'mr-5 ml-2 text-[#FFF] font-bold' :'mx-5 text-[#DDD] hover:text-[#FFF]'}>Login</a>
                <a href="/register" className={register ? 'mr-5 ml-2 text-[#FFF] font-bold': 'mx-5 text-[#DDD] hover:text-[#FFF]'}>Register</a>
            </div>
        </div>
    );
}

export default TopBar;