import { useLoaderData } from "@tanstack/react-router";
import MuiFileFolder from "../../Components/FileFolder/FileFoldler";
import Navbar from "../../Components/Navbar";

const TechincalLiterature = () => {

  const videosData = useLoaderData({from: "/literature"})

  return (
    <>
    <Navbar />
    <MuiFileFolder fileFolder={videosData} />
    </>
  )

};

export default TechincalLiterature;