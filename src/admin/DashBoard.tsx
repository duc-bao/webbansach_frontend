import { RequireAdmin } from "./RequireAdmin"
import { Chart } from "./component/Chart";
import { ParameterDigital } from "./component/ParameterDigital";


const DashBoard = () =>{
    return (
        <div>
            <ParameterDigital></ParameterDigital>
            <Chart></Chart>
        </div>
    )
}
const   DashBoardPage = RequireAdmin(DashBoard);
export default DashBoardPage;