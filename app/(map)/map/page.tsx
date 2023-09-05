import { getServerSession } from "next-auth";
import Map from "../map/Map"
import { authOptions } from "@/lib/auth";

const page = async ({}) => {

  const session = await getServerSession(authOptions)
  return (
    <div>
    <div style={{backgroundColor: "whitesmoke"}}>
      <h1>My Page</h1>
      <pre> {JSON.stringify(session)}</pre>
      <div  style={{width: "400px",
       height: "300px"       
    }}className="h-300"> </div> 
    <div className="max-w-6xl mx-auto"> 
      <Map address="Dortmund, Germany" /> 
      </div>
    </div>
  );
}
export default page;