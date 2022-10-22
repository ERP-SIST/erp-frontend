import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import TopBar from "../../components/staff/Topbar";
import { getCookie } from "../../misc/CookieManager";
import Title from "../../misc/TitleModifier";

function StaffSubject(){
    const [searchParams, setSearchParams] = useSearchParams();
    const { id } = useParams();

    const batch = searchParams.get("batch");   
    
    const [cae1visibility, setCAE1Visibility] = useState(false); 
    const [cae2visibility, setCAE2Visibility] = useState(false);
    
    const [data, setData] = useState([]);
    
    const [isSubjectInfoLoading, setSubjectInfoLoading] = useState(false);
    
    const [cae1, setcae1] = useState(null);
    const [cae2, setcae2] = useState(null);
    
    const [sectionSize, setSectionSize] = useState([]);

    const [sectionVisibilityInput, setSectionVisibilityInput] = useState(true);
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/subject/${id}/view`, {
            'headers': {
                'WWW-Authenticate': getCookie('sid')
            }
        }).then((res)=>{
            setData(res.data.subject);
            setSubjectInfoLoading(true);
        });

        // axios.get(`${process.env.REACT_APP_BACKEND_URL}/staff/cae/1/format/view?subjectID=${id}&batch=${batch}`, {
        //     'headers': {
        //         'WWW-Authenticate': getCookie('sid')
        //     }
        // }).then((res)=>{
        //     console.log(res);
        //     setcae1(res.data.format);
        // })

        // axios.get(`${process.env.REACT_APP_BACKEND_URL}/staff/cae/2/format/view?subjectID=${id}&batch=${batch}`, {
        //     'headers': {
        //         'WWW-Authenticate': getCookie('sid')
        //     }
        // }).then((res)=>{
        //     setcae2(res.data.format);
        // })
    }, []);
    const addCae1 = () => {
        setCAE1Visibility(true);
        setCAE2Visibility(false);
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
        const questions = document.getElementsByClassName("max-questions");
        const marks = document.getElementsByClassName("max-marks");
        const payload = {
            "format": {}
        } 
        for(var i =0; i < questions.length; i++){
            payload["format"][`${i+1}`] = {}
            payload["format"][`${i+1}`]["questions"] = +questions[i].value;
            payload["format"][`${i+1}`]["maxMark"] = +marks[i].value;
        }
        payload["subjectID"] = +id;
        payload["batch"] = +batch;
        console.log(payload);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/staff/cae/1/format/set`, payload,
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
        const questions = document.getElementsByClassName("max-questions");
        const marks = document.getElementsByClassName("max-marks");
        const payload = {
            "format": {}
        } 
        for(var i =0; i < questions.length; i++){
            payload["format"][`${i+1}`] = {}
            payload["format"][`${i+1}`]["questions"] = +questions[i].value;
            payload["format"][`${i+1}`]["maxMark"] = +marks[i].value;
        }
        payload["subjectID"] = +id;
        payload["batch"] = +batch;
        console.log(payload);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/staff/cae/2/format/set`, payload,
        {
            'headers': {
                'WWW-Authenticate': getCookie('sid')
            }
        }).then((res)=>{
            setCAE2Visibility(false);
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
                <div className="mx-2 my-7 text-lg">   
                    <p className="text-xl font-extrabold text-[#831238] mb-2">
                        Number of Students in Batch Wise
                    </p> 
                    {Object.keys(data?.students).map((value, index)=>{
                        return(
                            <div key={index} className="px-2 font-bold" >
                            Batch - {value}: <span className="font-bold text-black">{data?.students[value]}</span>
                            </div>
                        )
                    })}
                </div>
                {/* <div className="flex flex-wrap">
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
                </div> */}
                <div className="flex flex-wrap my-2 font-bold">
                    {
                        cae1 === null ?
                    <button className="bg-[#831238] my-4 rounded-md px-4 mx-2 py-2 text-white hover:bg-[#b5305c] "
                     onClick={addCae1}>Add CAE 1 Pattern</button>: <button className="bg-[#831238] my-4 rounded-md px-4 mx-2 py-2 text-white hover:bg-[#b5305c] "
                     onClick={remove_cae_1}>Modify CAE 1 Pattern</button>
                    }
                    {
                        cae2 == null ? 
                        <button className="bg-[#831238] my-4 rounded-md px-4 mx-2 py-2 text-white  hover:bg-[#b5305c]"
                     onClick={addCae2}>Add CAE 2 Pattern</button> : <button className="bg-[#831238] my-4 rounded-md px-4 mx-2 py-2 text-white hover:bg-[#b5305c] "
                     onClick={remove_cae_2}>Modify  CAE 2 Pattern</button>
                    }
                    <button className="bg-[#831238] my-4 rounded-md px-4 py-2 mx-2 text-white  hover:bg-[#b5305c]"
                     onClick={addCae1}>Add Student</button>
                    <button className="bg-[#831238] my-4 rounded-md px-4 py-2 mx-2 text-white  hover:bg-[#b5305c]"
                     onClick={addCae1}>Add Students by Group</button>
                    <button className="bg-[#831238] my-4 rounded-md px-4 py-2 mx-2 text-white  hover:bg-[#b5305c]"
                     onClick={addCae1}>Validate Marks</button>
                </div>
                { cae2visibility && <div>
                    <h1 className="text-3xl font-bold text-[#831238] my-2">
                        Add CAE 2 Pattern
                    </h1>
                    <p className="mt-3 mb-2 font-bold">Numbers of Sections</p> 
                    <input required onChange={ChangePartNumber} id="numberofsection" type="number" min="1" max="10" className="h-10 border-2 border-[#DDD] outline-none px-2 rounded-md"></input>
                    <p className="font-bold mt-3 mb-2">Batch</p> 
                    <form onSubmit={formSubmitC2} className="-mx-2 text-lg">
                        {
                            sectionVisibilityInput && 
                            <>
                                <div className="flex flex-wrap">
                                    {
                                        sectionSize.map((value, index)=>{
                                            return <div className="my-10 mx-2 border-2 rounded-md p-2 border-[#DDD]">
                                                <p>Section {index+1}</p>
                                                <p className="my-2 font-bold text-lg text-[#831238]">Questions <span className="mx-5">|</span> Marks</p>
                                                <input required type="number" min="1" max="30" className="h-10 max-questions border-2 border-[#DDD] outline-none px-2 mr-10 rounded-md"></input>
                                                <input required type="number" min="1" max="30" className="h-10 max-marks border-2 border-[#DDD] outline-none px-2 rounded-md"></input>
                                            </div>
                                        })
                                    }
                                </div>
                                {sectionSize && <button className="bg-[#831238] font-bold my-4 mx-2 px-4 py-2 rounded-md text-white hover:bg-[#b5305c]"
                                >Submit</button>}
                            </>
                        }
                    </form>
                </div>
                }
                { cae1visibility && <div>
                    <h1 className="text-3xl font-bold text-[#831238] my-2">
                        Add CAE 1 Pattern
                    </h1>
                    <p className="mt-3 mb-2 font-bold">Numbers of Sections</p> 
                    <input required onChange={ChangePartNumber} id="numberofsection" type="number" min="1" max="10" className="h-10 border-2 border-[#DDD] outline-none px-2 rounded-md"></input>
                    <form onSubmit={formSubmitC1} className="-mx-2 text-lg">
                        {
                            sectionVisibilityInput && 
                            <>
                                <div className="flex flex-wrap">
                                    {
                                        sectionSize.map((value, index)=>{
                                            return <div className="my-10 mx-2 border-2 rounded-md p-2 border-[#DDD]">
                                                <p>Section {index+1}</p>
                                                <p className="my-2 font-bold text-lg text-[#831238]">Questions <span className="mx-5">|</span> Marks</p>
                                                <input required type="number" min="1" max="30" className="h-10 max-questions border-2 border-[#DDD] outline-none px-2 mr-10 rounded-md"></input>
                                                <input required type="number" min="1" max="30" className="h-10 max-marks border-2 border-[#DDD] outline-none px-2 rounded-md"></input>
                                            </div>
                                        })
                                    }
                                </div>
                                {sectionSize && <button className="bg-[#831238] font-bold my-4 mx-2 px-4 py-2 rounded-md text-white hover:bg-[#b5305c]"
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

export default StaffSubject;