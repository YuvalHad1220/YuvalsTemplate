import { useLoaderData } from "@tanstack/react-router";
import MuiFileFolder from "../../Components/FileFolder/FileFoldler";
import Navbar from "../../Components/Navbar";

const Accidents = () => {
  const accidentsData = useLoaderData({ from: "/accidents" });

  return (
    <>
      <Navbar />
      <MuiFileFolder fileFolder={accidentsData} />
    </>
  );
};

export default Accidents;
