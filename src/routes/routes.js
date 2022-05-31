import { Routes, Route } from "react-router-dom";
import HomePage from "../views/HomePage/HomePage";
import SignUp from "../views/SignUp/SignUp";
import MyIdeasPage from "../views/MyIdeasPage/MyIdeasPage";
import AddIdeaPage from "../views/AddIdeaPage/AddIdeaPage";
import GlobalIdeasPage from "../views/GlobalIdeasPage/GlobalIdeasPage";
import ViewIdeasPage from "../views/ViewIdeasPage/ViewIdeasPage";
import AddRequestPage from "../views/AddRequestPage/AddRequestPage";
import MyRequestsPage from "../views/MyRequestsPage/MyRequestsPage";
import RequestSubmissionPage from "../views/RequestsSubmissionPage/RequestsSubmissionPage";
import GlobalRequestsPage from "../views/GlobalRequestsPage/GlobalRequestsPage";
import LearningResourcesPage from "../views/LearningResourcesPage/LearningResourcesPage";
import PLayListPage from "../views/PlaylistPage/PlaylistPage";
import LectureVideoPage from "../views/LectureVideoPage/LectureVideoPage";
import ProjectManagement from "../views/ProjectManagement/ProjectManagement";
import SpecificProject from "../views/ProjectManagement/SpecificProject";
import WorkItems from "../views/ProjectManagement/WorkITems";
import InventoryManagement from "../views/ProjectManagement/InventoryManagement";
import CompetitionPage from "../views/CompetitionPage/CompetitionPage";
import RewardPage from "../views/RewardPage/RewardPage";
import ProfilePage from "../views/ProfilePage/ProfilePage";

const Routers = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/register" element={<SignUp />} />
      <Route exact path="/profilepage" element = {<ProfilePage/>}/>
      <Route exact path="/addidea" element={<AddIdeaPage />} />
      <Route exact path="/myideas" element={<MyIdeasPage />} />
      <Route exact path="myideas/:ideaid" element={<ViewIdeasPage />} />
      <Route exact path="/globalideas" element={<GlobalIdeasPage />} />
      <Route exact path="/addrequest" element={<AddRequestPage />} />
      <Route exact path="/myrequests" element={<MyRequestsPage />} />
      <Route exact path="/myrequests/submissions/:requestid" element={<RequestSubmissionPage />} />
      <Route exact path="/globalrequests" element={<GlobalRequestsPage />} />
      <Route
        exact
        path="/learningresources"
        element={<LearningResourcesPage />}
      />
      <Route
        exact
        path="/learningresources/:playlistid"
        element={<PLayListPage />}
      />
      <Route
        exact
        path="/learningresources/:playlistid/:videoid"
        element={<LectureVideoPage />}
      />
      <Route exact path="/projectmanagement" element={<ProjectManagement />} />
      <Route
        exact
        path="/projectmanagement/:projectid"
        element={<SpecificProject />}
      />
      <Route
        exact
        path="/projectmanagement/:projectid/workItems"
        element={<WorkItems />}
      />
      <Route
        exact
        path="/projectmanagement/:projectid/Inventory"
        element={<InventoryManagement />}
      />
      <Route exact path="/competitons" element={<CompetitionPage />} />
      <Route exact path="/rewards" element={<RewardPage />} />
    </Routes>
  );
};

export default Routers;
