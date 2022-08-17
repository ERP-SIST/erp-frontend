import TopBar from "../../components/common/Topbar";
import Title from "../../misc/TitleModifier";

function Home() {
    return(
        <div className="HomeApp">
            <Title name="Sathyabama ERP"/>
            <TopBar home={true} />
        </div>
    );
}

export default Home;    