import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import TopBar from "../../components/student/Topbar";
import { getCookie } from "../../misc/CookieManager";
import Title from "../../misc/TitleModifier";

function StudentSubject(){
    const [searchParams, setSearchParams] = useSearchParams();
    const { id } = useParams();

    const batch = searchParams.get("batch");   
    
    const [cae1visibility, setCAE1Visibility] = useState(false); 
    const [cae2visibility, setCAE2Visibility] = useState(false);
    
    const [cae1Marks, setCae1Marks] = useState(false);
    const [cae2Marks, setCae2Marks] = useState(false);
    
    const [data, setData] = useState([]);
    
    const [departmentList, setDepartmentList] = useState([]);
    
    const [isSubjectInfoLoading, setSubjectInfoLoading] = useState(false);
    
    const [cae1, setcae1] = useState({});
    const [cae2, setcae2] = useState({});
    
    const [sectionSize, setSectionSize] = useState([]);

    const [sectionVisibilityInput, setSectionVisibilityInput] = useState(true);
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/subject/${id}/view`, {
            'headers': {
                'WWW-Authenticate': getCookie('sid')
            }
        }).then((res)=>{
            setData(res.data.subject);
            console.log(res.data.subject)
            setSubjectInfoLoading(true);
        });

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/student/cae/1/marks/view?subjectID=${id}&batch=${batch}`, {
            'headers': {
                'WWW-Authenticate': getCookie('sid')
            }
        }).then((res)=>{
            setcae1(res.data.format);
            setCae1Marks(res.data.marks);
            console.log(res.data);
        })
        
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/student/cae/2/marks/view?subjectID=${id}&batch=${batch}`, {
            'headers': {
                'WWW-Authenticate': getCookie('sid')
            }
        }).then((res)=>{
            setcae2(res.data.format);
            setCae2Marks(res.data.marks);
            console.log(res.data);
        })

    }, []);

    const addCae1 = () => {
        setCAE1Visibility(true);
        setCAE2Visibility(false);
    }

    const addStudents = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/department/all`).then((res)=>{
            console.log(res);
            setDepartmentList(res.data.departments);
            console.log(res.data.departments);
            setCAE1Visibility(false);
            setCAE2Visibility(false);
        })
    }
    
    const addCae2 = () => {
        setCAE1Visibility(false);
        setCAE2Visibility(true);
    }

    const ChangePartNumber = (e)=>{
        const size  = e.target.value;
        const arr = Array.apply(null, Array(+size));
        setSectionSize(arr);
    }

    const formSubmitC1 = (e) => {
        e.preventDefault();
        const payload = {};
        console.log(e);
        for(var i =0; i < e.target.length-1; i+=4){
            payload[e.target[i].value] = {}
            payload[e.target[i].value]["section"] = +e.target[i+1].value;
            payload[e.target[i].value]["mark"] = +e.target[i+2].value;
            payload[e.target[i].value]["total"] = +e.target[i+3].value;
        }
        console.log({
            "marks": payload,
            "subjectID": id
        });
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/student/cae/1/marks/update`, {
            "marks": payload,
            "subjectID": id
        },
        {
            'headers': {
                'WWW-Authenticate': getCookie('sid')
            }
        }).then((res)=>{
            setCAE1Visibility(false);
            window.location.reload();
        })
    }

    const formSubmitC2 = (e) => {
        e.preventDefault();
        const payload = {};
        console.log(e);
        for(var i =0; i < e.target.length-1; i+=4){
            payload[e.target[i].value] = {}
            payload[e.target[i].value]["section"] = +e.target[i+1].value;
            payload[e.target[i].value]["mark"] = +e.target[i+2].value;
            payload[e.target[i].value]["totalmark"] = +e.target[i+3].value;
        }
        console.log(payload);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/student/cae/1/marks/update`, {
            "marks": payload,
            "subjectID": +id
        },
        {
            'headers': {
                'WWW-Authenticate': getCookie('sid')
            }
        }).then((res)=>{
            setCAE1Visibility(false);
            window.location.reload();
        })
    }

    const remove_cae_1 = () => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/staff/cae/1/format/delete?subjectID=${id}&batch=${batch}`, {
            'headers': {
                'WWW-Authenticate': getCookie('sid')
            }
        }).then((res)=>{
            window.location.reload();
        })
    }
    
    const remove_cae_2 = () => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/staff/cae/2/format/delete?subjectID=${id}&batch=${batch}`, {
            'headers': {
                'WWW-Authenticate': getCookie('sid')
            }
        }).then((res) => {
            window.location.reload();
        })
    }
    
    return(
        <div className="staff_subject">
            <Title name="Sathyabama ERP - Subject"/>
            <TopBar/>
            { isSubjectInfoLoading &&
             <div className="p-6">
                <h1 className="text-3xl font-bold text-[#831238] my-2 mx-2">
                    {data?.code} - {data?.name}
                </h1>
                <div className="flex flex-wrap">
                {cae1 ? <div className="mx-2 my-7 mr-20 text-lg">   
                    <p className="text-xl font-extrabold text-[#831238] mb-2">
                        CAE 1 Pattern
                    </p> 
                    {Object.keys(cae1).map((value, index)=>{
                        return(
                            <div key={index} className="px-2 my-2 font-bold" >
                                <b>Part {index+1}</b> 
                                <div className="font-bold text-black"><p>Questions: {cae1[value]["questions"]}</p>Maximum Marks: {cae1[value]["maxMark"]}</div>
                            </div>
                        )
                    })}
                </div> : <p className="text-xl font-extrabold text-[#831238] mb-2">
                        CAE 1 Pattern - Not Set
                    </p> }

                    {cae2 ? <div className="mx-2 my-7 text-lg">   
                    <p className="text-xl font-extrabold text-[#831238] mb-2">
                        CAE 2 Pattern
                    </p> 
                    {Object.keys(cae2).map((value, index)=>{
                        return(
                            <div key={index} className="px-2 my-2 font-bold" >
                                <b>Part {index+1}</b> 
                                <div className="font-bold text-black"><p>Questions: {cae2[value]["questions"]}</p>Maximum Marks: {cae2[value]["maxMark"]}</div>
                            </div>
                        )
                    })}
                </div> : <p className="text-xl font-extrabold text-[#831238] mb-2">
                        CAE 2 Pattern - Not Set
                    </p> }
                </div>

                <p className="text-lg text-[#831238] my-2">
                    <b>CAE 1 Marks:</b> 
                    { cae1Marks ?
                        Object.keys(cae1Marks).map((value)=>{                        
                            return <p className="text-[#121212]">{value}) {cae1Marks[value]["mark"]}/{cae1Marks[value]["total"]}</p>
                        }) : <span className="text-[#121212]">"Marks are not updated"</span>
                    }
                </p>
                <p className="text-lg text-[#831238] my-2">
                    <b>CAE 2 Marks:</b> <span className="text-[#121212]">{cae2Marks ? cae2Marks : "Marks are not updated"}</span>
                </p>
                <div className="flex justify-center flex-wrap my-2 font-bold">
                    {
                        cae1Marks === null &&
                    <button className="bg-[#831238] my-4 rounded-md px-4 py-2 text-white hover:bg-[#b5305c] "
                     onClick={addCae1}>Add CAE 1 Marks</button>
                    }
                    {
                        cae2Marks === null && 
                        <button className="bg-[#831238] my-4 rounded-md px-4 mx-2 py-2 text-white  hover:bg-[#b5305c]"
                     onClick={addCae2}>Add CAE 2 Marks</button>
                    }
                </div>
                { cae1visibility && <div>
                    <h1 className="text-3xl font-bold text-[#831238] my-2">
                        Add CAE 1 Marks
                    </h1>
                    <form onSubmit={formSubmitC1} id="cae1marksenteringarea" className="-mx-2 text-lg">
                        {
                            cae1 && 
                            <>
                                    
                                {
                                    [1].map((value)=>{
                                        var i = 0;
                                        return <>
                                        {
                                        Object.keys(cae1).map((value)=>{
                                        return <>
                                        <p className="text-[#831238] text-2xl font-bold mt-10">Section {value}</p>
                                        <div className="flex flex-wrap">
                                        {[...Array(+cae1[value]["questions"])].map((value1, index)=>{
                                            i+=1;
                                            return <div className="my-10 flex flex-col mx-2 border-2 rounded-md p-2 border-[#DDD]">
                                                        <p className="my-2 font-bold text-lg text-[#831238]">Question <input required type="number" disabled value={i} className="h-10 max-questions border-[#DDD] outline-none w-14 rounded-md"></input></p>
                                                        <input required type="number" disabled value={value} className="h-10 hidden max-questions border-[#DDD] outline-none w-14 rounded-md"></input>
                                                        <p className="my-2 font-bold text-lg text-[#121212]">Marks Scored</p>

                                                        <input required type="number" min="0" max={cae1[value]["maxMark"]} className="h-10 max-questions border-2 border-[#DDD] outline-none w-full px-2 mr-10 rounded-md"></input>
                                                        <p className="my-2 font-bold text-lg text-[#121212]">Maximum Marks</p>
                                                        <input disabled value={cae1[value]["maxMark"]} required type="number" min="1" max="30" className="h-10 max-marks border-2 border-[#DDD] outline-none px-2 rounded-md"></input>
                                                    </div>
                                        })}
                                        </div>
                                        </>
                                    }) }</>
                                    }
                                )}
                                {sectionSize && <button onClick={()=>{console.log(document.getElementById("cae1marksenteringarea").length)}} className="bg-[#831238] font-bold my-4 mx-2 px-4 py-2 rounded-md text-white hover:bg-[#b5305c]"
                                >Submit</button>}
                            </>
                        }
                    </form>
                </div>
                }

                { cae2visibility && <div>
                    <h1 className="text-3xl font-bold text-[#831238] my-2">
                        Add CAE 2 Marks
                    </h1>
                    <form onSubmit={formSubmitC2} id="cae1marksenteringarea" className="-mx-2 text-lg">
                        {
                            cae2 && 
                            <>
                                    
                                {
                                    [1].map((value)=>{
                                        var i = 0;
                                        return <>
                                        {
                                        Object.keys(cae2).map((value)=>{
                                        return <>
                                        <p className="text-[#831238] text-2xl font-bold mt-10">Section {value}</p>
                                        <div className="flex flex-wrap">
                                        {[...Array(+cae2[value]["questions"])].map((value1, index)=>{
                                            i+=1;
                                            return <div className="my-10 flex flex-col mx-2 border-2 rounded-md p-2 border-[#DDD]">
                                                        <p className="my-2 font-bold text-lg text-[#831238]">Question <input required type="number" disabled value={i} className="h-10 max-questions border-[#DDD] outline-none w-14 rounded-md"></input></p>
                                                        <input required type="number" disabled value={value} className="h-10 hidden max-questions border-[#DDD] outline-none w-14 rounded-md"></input>
                                                        <p className="my-2 font-bold text-lg text-[#121212]">Marks Scored</p>
                                                        <input required type="number" min="0" max={cae2[value]["maxMark"]} className="h-10 max-questions border-2 border-[#DDD] outline-none w-full px-2 mr-10 rounded-md"></input>
                                                        <p className="my-2 font-bold text-lg text-[#121212]">Maximum Marks</p>
                                                        <input disabled value={cae2[value]["maxMark"]} required type="number" min="1" max="30" className="h-10 max-marks border-2 border-[#DDD] outline-none px-2 rounded-md"></input>
                                                    </div>
                                        })}
                                        </div>
                                        </>
                                    }) }</>
                                    }
                                )}
                                {sectionSize && <button onClick={()=>{console.log(document.getElementById("cae1marksenteringarea").length)}} className="bg-[#831238] font-bold my-4 mx-2 px-4 py-2 rounded-md text-white hover:bg-[#b5305c]"
                                >Submit</button>}
                            </>
                        }
                    </form>
                </div>
                }
            </div>
            }
        </div>
    );
}

export default StudentSubject;