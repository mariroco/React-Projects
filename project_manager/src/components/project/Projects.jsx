import { dummyProjects } from "../../dummyData/dummyProjects.jsx";
export default function Projects(){
  console.log(dummyProjects);
  return(
    <div>
      {dummyProjects.map((project) => {
        return (
          <p>{project.name}</p>
        )})}
    </div>
  );
}