import { useLoaderData } from "@tanstack/react-router";
import MuiFileFolder from "../../Components/FileFolder/FileFoldler";
import Navbar from "../../Components/Navbar";


const Videos = () => {
  const videosData = useLoaderData({ from: "/videos" });

  return (
    <>
    <Navbar />
      <MuiFileFolder fileFolder={videosData} />;
    </>
  );
};

export default Videos;
