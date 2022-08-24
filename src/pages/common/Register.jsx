import axios from "axios";
import TopBar from "../../components/common/Topbar";
import Title from "../../misc/TitleModifier";
function Register(){

    function hasNumber(myString) {
        return /\d/.test(myString);
    }

    function lengthCheck(myString) {
        return myString.length >= 8;
    }

    function hasUpperCase(myString) {
        return /[A-Z]/.test(myString);
    }

    function hasLowerCase(myString) {
        return /[a-z]/.test(myString);
    }


    const onRegisterFormSubmit = (e) => {
        e.preventDefault();
        const name =  e.target[0].value;
        const roll_number =  e.target[1].value;
        const email =  e.target[2].value;
        const phone =  e.target[3].value;
        const year =  e.target[4].value;
        const department =  e.target[5].value;
        const password =  e.target[6].value;
        const confirm_password =  e.target[7].value;
        if(password === confirm_password) {
           if(hasNumber(password)){
                if(lengthCheck(password)){
                    if(hasLowerCase(password)){
                        if(hasUpperCase(password)){
                            axios.post(`${process.env.REACT_APP_BACKEND_URL}/student/register`, {
                                "name": name,
                                "email": email,
                                "phone": phone,
                                "registerNumber": roll_number,
                                "password": password,
                                "department": department,
                                "yearOfAdmission": +year
                            }).then((res)=>{
                                console.log(res);
                                window.alert(res.data.message);
                            }).catch((err)=>{
                                console.log(err);
                            })
                        } 
                        else {
                            window.alert('Password should contain uppercase letters');
                        }
                    } 
                    else {
                        window.alert('Password should contain lowercase letters');
                    }     
                } 
                else {
                    window.alert('Password size should be more than 8 Characters');
                }
           }
           else {
                window.alert('Your password should contain atleast 1 number in password');
           }
        }
        else {
            window.alert('Password Mismatched');
        }
    }
    return (
        <>
            <Title name="Sathyabama ERP - Register" />
            <TopBar register={true}/>
            <div className="my-32 flex">
                <div className="mx-auto bg-[#F2F2F2] p-4 rounded-lg">
                   <h1 className="text-bold text-[32px] text-center mt-2 text-[#9e1c3f]">Register</h1>

                   <form className="mt-10" onSubmit={onRegisterFormSubmit}>
                        <label htmlFor="name" >Name</label>
                        <input className="block focus:border-2 focus:outline-none rounded-lg border-0 border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2" id="name" type='text' required  />
                        <label htmlFor="rno" className="mt-6 block" >Roll Number/Register Number</label>
                        <input className="block focus:border-2 focus:outline-none rounded-lg border-0 border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2" id="rno" type='text' required  />
                        <label htmlFor="email" className="mt-6 block" >Email ID</label>
                        <input className="block focus:border-2 focus:outline-none rounded-lg border-0 border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2" id="email" type='email' required  />
                        <label htmlFor="phone" className="mt-6 block" >Phone Number</label>
                        <input className="block focus:border-2 focus:outline-none rounded-lg border-0 border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2" id="phone" type='phone' required  />
                        <label htmlFor="year" className="mt-6 block" >Year of Admission</label>
                        <input className="block focus:border-2 focus:outline-none rounded-lg border-0 border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2" id="year" type='number' min="2020" max="2090" required  />

                        <label className={"block mt-6"} htmlFor={"department"}>
                            Department
                        </label>
                        <select key={"department"} required defaultValue={""} id={"department"} className="block focus:border-2 focus:outline-none rounded-lg border-0 bg-[#FFF] border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2">
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
                        <label htmlFor="password" className="block mt-6" >Confirm Password</label>
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