import axios from "axios";
import { useEffect, useState } from "react";
import TopBar from "../../components/student/Topbar";
import { getCookie } from "../../misc/CookieManager";

const StudentCae = ()=> {
    const [semesterData, setSemesterData] = useState([]);
    const [subjectData, setSubjectData] = useState([]);
    const [showSubjects, setSubjectVisibilty] = useState(false);
    useEffect(()=>{
        const sid = getCookie('sid');
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/student/subjects`, {
            "headers": {
                "WWW-Authenticate": sid
            }
        }).then((res)=>{
            const sub = (res.data.subjects);
            setSemesterData(sub);
        })
    }, []);

    const handleSemesterChange = (e) => {
        const sub = e.target.value;
        console.log(semesterData[sub]);
        setSubjectData(semesterData[sub]);
        setSubjectVisibilty(true);
    }

    const handleSubjectChange= (e)=>{
        const sub = (e.target.value);
        const sid = getCookie('sid');

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/student/cae/1/format?subjectID=${sub}`, {
            "headers": {
                "WWW-Authenticate": sid
            }
        }).then((res)=>{
            console.log(res);
        })
    }
    return (
        <div className="bg-[#FFF]">
            <TopBar cae={true}/>
                <h1 className="text-bold text-[32px] text-center mt-2 text-[#9e1c3f]">CAE Marks Portal</h1>
                <div className="flex items-center flex-col my-10">
                    <div>
                        <label htmlFor="semester">Semester</label>
                        <select  key={"semester"} onChange={handleSemesterChange} required defaultValue={""} id={"semester"} className="block focus:border-2 focus:outline-none rounded-lg border-0 bg-[#F5F5F5] border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2">
                            <option key="" value={""} disabled>
                                Select your Semester
                            </option>
                            {Object.keys(semesterData).map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>

                    { showSubjects && <div>
                        <label htmlFor="semester">Subject</label>
                        <select  key={"semester"} onChange={handleSubjectChange} required defaultValue={""} id={"semester"} className="block focus:border-2 focus:outline-none rounded-lg border-0 bg-[#F5F5F5] border-[#FFF] text-[18px] w-screen max-w-[320px] py-2 px-2">
                            <option key="" value={""} disabled>
                                    Select your Subject
                            </option> 
                            {Object.keys(subjectData).map((value, key) => (
                                <option key={value} value={value}>
                                    {Object.values(subjectData[value].code)}
                                </option>
                            ))}
                        </select>
                    </div> }
                </div>
                <div className="pl-28">
                    <form action="">
                        <div className="flex-auto float-left pl-28">
                            <h1 className="font-bold text-xl text-center">PART-A</h1>  
                            <div className="text-left py-3">
                                <label htmlFor="q1" class="mx-5 font-bold">Q1</label>
                                <input type="number" id="q1" placeholder="obtained marks" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-1"/>
                                <input type="number" id="q1" placeholder="maximum marks" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 mx-1" />
                            </div>
                        </div>
                    

                    
                    </form>
                </div>
        </div>
    )
}
export default StudentCae;