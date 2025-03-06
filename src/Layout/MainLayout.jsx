import { Outlet } from "react-router-dom";
import NavigationBar from "../Components/Shared/NavigationBar";


const MainLayout = () => {
    return (
        <div>
            <NavigationBar></NavigationBar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;