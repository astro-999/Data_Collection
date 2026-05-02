import { useState } from "react";
import "../css/AgeCalculator.css";

function user_age(){
  const [dob, setdob] = useState("");
  const [age, setAge] = useState("");
  function handleSubmit(e){
    e.preventDefault();
    const date = new Date(); // get current date
    const currentDate = new Intl.DateTimeFormat('en-CA').format(date); // format current date to yyyy-mm-dd
    const dobYear = new Date(dob); // convert dob to date object
    const formattedDobYear = new Intl.DateTimeFormat('en-CA').format(dobYear); // format dob to yyyy-mm-dd

    // calculate age in milliseconds
    const calculateAge = (new Date(currentDate) - new Date(formattedDobYear)) / (1000 * 60 * 60 * 24);

    // convert milliseconds to years months and days
    const years = Math.floor(calculateAge / 365);
    const months = Math.floor((calculateAge % 365) / 30);
    const days = Math.floor((calculateAge % 365) % 30);
    setAge(`You are ${years} years, ${months} months and ${days} days old.`);
  }
  return(
    <div className="container">
      <div>
        <form>
          <label > <h3>Choose your date of birth:</h3></label>
          <input value={dob} onChange={(e) => setdob(e.target.value)} type="date" id="dob" name="dob"/>
          <button  onClick={(e) => handleSubmit(e)} type="submit">Submit</button>
        </form>
      </div>
      <div>
        <h3>{age}</h3>
      </div>
    </div>
  )
}
export default user_age;