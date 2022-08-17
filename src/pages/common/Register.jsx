import TopBar from "../../components/common/Topbar";
import Title from "../../misc/TitleModifier";
function Register(){

    const handleChange = (e) => {

    }
    return (
        <>
            <Title name="Sathyabama ERP - Register" />
            <TopBar register={true}/>
            <div className="my-32 flex">
                <div className="mx-auto bg-[#F2F2F2] p-4 rounded-lg">
                   <h1 className="text-bold text-[32px] text-center mt-2 text-[#9e1c3f]">Register</h1>

                   <form className="mt-10">
                        <label htmlFor="name" >Name</label>
                        <input className="block focus:border-2 focus:outline-none rounded-lg border-0 border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2" id="name" type='text' required  />
                        <label htmlFor="rno" className="mt-6 block" >Roll Number/Register Number</label>
                        <input className="block focus:border-2 focus:outline-none rounded-lg border-0 border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2" id="rno" type='text' required  />
                        <label htmlFor="email" className="mt-6 block" >Email ID</label>
                        <input className="block focus:border-2 focus:outline-none rounded-lg border-0 border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2" id="email" type='email' required  />
                        <label htmlFor="phone" className="mt-6 block" >Phone Number</label>
                        <input className="block focus:border-2 focus:outline-none rounded-lg border-0 border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2" id="phone" type='phone' required  />
                        <label htmlFor="rno" className="mt-6 block" >Graduation Year</label>
                        <input className="block focus:border-2 focus:outline-none rounded-lg border-0 border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2" id="rno" type='number' min="2020" max="2090" required  />
                        <label className={"block mt-6"} htmlFor={"section"}>
                            Section
                        </label>
                        <select key={"section"} onChange={handleChange} required defaultValue={""} id={"section"} className="block focus:border-2 focus:outline-none rounded-lg border-0 bg-[#FFF] border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2">
                            <option key="" value={""} disabled>
                                Select your option
                            </option>
                        {['A1', 'A2', 'A3', 'A4', 'A5',
                        'B1', 'B2', 'B3', 'B4', 'B5',
                        'C1', 'C2', 'C3', 'C4', 'C5',
                        'D1', 'D2', 'D3', 'D4', 'D5',
                        'E1', 'E2', 'E3', 'E4', 'E5',
                        'F1', 'F2', 'F3', 'F4', 'F5'].map((value, key) => (
                            <option key={key} value={value}>
                            {value}
                            </option>
                        ))}
                        </select>

                        <label className={"block mt-6"} htmlFor={"department"}>
                            Depaertment
                        </label>
                        <select key={"department"} onChange={handleChange} required defaultValue={""} id={"department"} className="block focus:border-2 focus:outline-none rounded-lg border-0 bg-[#FFF] border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2">
                            <option key="" value={""} disabled>
                                Select your option
                            </option>
                        {['CSE', 'EEE', 'IT', 'ECE', 'Mech', 'CSE with AI' ].map((value, key) => (
                            <option key={key} value={value}>
                            {value}
                            </option>
                        ))}
                        </select>
                    
                        <label htmlFor="password" className="block mt-6" >Password</label>
                        <input className="block focus:border-2 focus:outline-none rounded-lg border-0 border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2" id="password" type='password' required  />
                        <div className="flex justify-between">
                            <input type="submit" className="my-5 py-2 bg-[#9e1c3f] text-[#FFF] px-4 mx-auto text-center items-center"></input>
                        </div>
                   </form> 
                </div>
            </div>
        </>
    )
}

export default Register;