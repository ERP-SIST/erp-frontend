import axios from "axios";
import { useEffect, useState } from "react";
import TopBar from "../../components/student/Topbar";
import { getCookie } from "../../misc/CookieManager";
import Title from "../../misc/TitleModifier";

function StudentHome(){

    const [subjects, setSubjects] = useState([]);
    const [batch, setBatch] = useState([]);
    const [bacthVisibility, setCourseVisibility] = useState(false);
    
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/student/subjects`, {
            "headers": {
                "WWW-Authenticate": getCookie('sid')
            }
        }).then((res)=>{
            console.log(res);
            const sub = res.data.subjects;
            setSubjects(sub);
        })
    }, []);

    const handleBatchChange = (e) => {
        const value = e.target.value;
        console.log(value);
        setBatch(value);
        console.log(subjects[value])
        setCourseVisibility(true);
    }

    return(
        <div className="student_home">
            <Title name="Sathyabama ERP - Home"/>
            <TopBar home={true}/>
            <div className="border my-6 mx-6">
                <label htmlFor="semester">Semester</label>
                <select key={"section"} onChange={handleBatchChange} required defaultValue={""} id={"semester"} className="block focus:border-2 focus:outline-none rounded-lg border-0 bg-[#FFF] border-[#DDD] text-[18px] w-screen max-w-[320px] py-2 px-2">
                    <option key="" value={""} disabled>
                        Select your option
                    </option>
                    {Object.keys(subjects).map((value, key) => (
                        <option key={value} value={value}>
                        {value}
                        </option>
                    ))}
                </select>
                    <div className="border mt-6 py-2 px-6 text-[#FFF] bg-[#831238] font-bold text-2xl">
                        Course List
                    </div>
                { bacthVisibility ? <div>
                    <div className="flex flex-col">
                        {Object.keys(subjects[batch]).map((value)=>{
                                return <div onClick={()=>{ window.open(`/student/subject/${value}?batch=${batch}`);}} className="border w-[100%] py-2 px-6 text-xl">
                                    <b>{subjects[batch][value]["code"]}</b> - {subjects[batch][value]["name"]}
                                </div>
                            })
                        } 
                    </div>
                </div>: <div className="flex flex-col">
                        <div className="border w-[100%] py-2 px-6 text-xl">
                            <b>Select the semester from the dropdown to see the course list</b>
                        </div>
                    </div> }
            </div>
        </div>
    );
}

export default StudentHome;