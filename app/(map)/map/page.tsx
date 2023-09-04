import { getServerSession } from "next-auth";
import Map from "../map/Map"
import { authOptions } from "@/lib/auth";

const page = async ({}) => {

  const session = await getServerSession(authOptions)
  return (
    <div>
      <h1>My Page</h1>
      <pre> {JSON.stringify(session)}</pre>
      <Map address="Dortmund, Germany" /> 
    </div>
  );
}
export default page;