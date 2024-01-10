import React from "react";
import Header from "./header";
import { Routes, Route } from "react-router-dom";
import Login from "../auth/login";
import Otp from "../auth/otp";
import Register from "../auth/register";
import ClientForm from "../client/clients";
// import MarkAttendance from "../executiveAction/markattendence";
import ClientList from "../client/allClients";
import FollowUp from "../client/followup";
import ClientByNumber from "../client/clientsbynumber";
import UpdateClientReport from "../client/changes";
import ExecutiveLookup from "../auth/profile";
import Download from "../client/download";
import Cards from "./cards";
// import DownloadAttend from "../client/attendencedownload";
import DigitalmarketWork from "../digitalMarket/digitalmarketWork";
import BlockClientList from "../client/block";
import DataforYou from "../executiveAction/dataforYou";
import DoneData from "../executiveAction/alldone";
import YourAttend from "../executiveAction/attendence";
const Home = () => {
  const userId = localStorage.getItem('id');
  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-3 heights">
        <Header />
      </div>
      <div className="col-md-9">
      <Routes>
          < Route path="/home" element={<Cards />}/>
          <Route path="/" element={<Login />} />
          <Route path="/otp-verification" element={<Otp />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/makeClients" element={<ClientForm />} />
          {/* <Route path="/markAttendce" element={<MarkAttendance />} /> */}
          <Route path="/getClients" element={<ClientList />} />
          <Route path="/FollowUp" element={<FollowUp />} />
          <Route path="/getClientsbyNumber" element={<ClientByNumber/>}/>
          <Route path="/updateClientNumber" element={<UpdateClientReport/>}/>
          <Route path="/profile" element={<ExecutiveLookup/>}/>
          <Route path="/download-clients-data" element={<Download/>}/>
          <Route path="/done" element={<DoneData/>}/>
          <Route path ="/showWork" element={<DigitalmarketWork/>}/>
          <Route path ="/GetWork" element={<DataforYou/>}/>
          <Route path ="/show-attendance" element={<YourAttend/>}/>
          <Route path ="/Block" element={<BlockClientList/>}/>
         

        </Routes>
      </div>
    </div>
  </div>
  );
};

export default Home;
