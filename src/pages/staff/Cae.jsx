import TopBar from "../../components/staff/Topbar";
import Title from "../../misc/TitleModifier";

function StaffHome(){

    return(
        <div className="staff_home">
            <Title name="Sathyabama ERP - CAE"/>
            <TopBar CAE={true}/>
        </div>
    );
}

export default StaffHome;