import Map from "../map/Map"

function MyPage() {
  return (
    <div style={{backgroundColor: "whitesmoke"}}>
      <div  style={{width: "400px",
       height: "300px"       
    }}className="h-300"> </div> 
    <div className="max-w-6xl mx-auto"> 
      <Map address="Dortmund, Germany" /> 
      </div>
    </div>
  );
}
export default MyPage;