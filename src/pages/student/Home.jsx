import TopBar from "../../components/student/Topbar";
import Title from "../../misc/TitleModifier";

function StudentHome(){

    return(
        <div className="student_home">
            <Title name="Sathyabama ERP - Home"/>
            <TopBar home={true}/>
        </div>
    );
}

export default StudentHome;