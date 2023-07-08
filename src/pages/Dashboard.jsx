import React, { useCallback, useEffect, useState } from 'react';
import Cards from '../ReusableComponent/Cards';
import "../styles/Dashboard.css";
// import { useEffect, useState } from 'react';
// import Axios from "axios"
import Graph from '../ReusableComponent/Graph';
import makeAPIRequest from '../globle/ApiCall';
import ApiConst from '../globle/ApiKeys';
// import { BarGraph } from "../ReusableComponent/Graph"

// export const GetDashboardData = () => {
//   let [data,setData] = useState([]);

//   useEffect(async ()=>{
//   let dashData = await Axios.get("http://localhost:3001/dashboard");
//   console.log(dashData.data);
//   setData(dashData.data)
// },[])
// }
const Dashboard = () => {
  const [dashbord, setDashbord] = useState()
  // ------------------------ Get DashBord Data-----------------
  const dashbordData = useCallback(() => {
    makeAPIRequest('get', ApiConst.dashbordData, null, null)
      .then((response) => {
        setDashbord(response?.data?.data);
      }).catch((error) => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    dashbordData()
  }, [dashbordData])
  // ------------------------ Get DashBord Data-----------------

  // ------------------------- All Datas ----------------------
  let DashboardData = [{
    title: "User Agent Listed",
    Value: dashbord?.agent,
    class: "ri-user-2-fill",
    link: '/agent'
  },
  {
    title: "Top property Listed",
    Value: dashbord?.property,
    class: "fa-solid fa-download",
    link: '/property'
  },
  {
    title: "Top views/Download Listed",
    Value: dashbord?.supportManagement,
    class: "fa-regular fa-eye",
    link: '/dashboard'
  },
  {
    title: "Total Earnings",
    Value: dashbord?.earning,
    class: "fa-solid fa-dollar-sign",
    link: '/finance'
  },
  {
    title: "Total Enquires",
    Value: dashbord?.enquiries,
    class: "ri-user-voice-fill",
    link: '/finance'
  },
  {
    title: "Total state",
    Value: dashbord?.state,
    class: "ri-building-4-line",
    link: '/finance'
  },
  {
    title: "Total cities",
    Value: dashbord?.city,
    class: "ri-building-line",
    link: '/finance'
  }]
  // ------------------------- All Datas ----------------------



  return (
    <div className="dashboard">
      <div className="graph_display" style={{ display: 'flex', justifyContent: 'center' }}>
        <Graph />
      </div>
      <div className='Dashboard_content'>
        {DashboardData.map((i, index) => {
          return <Cards key={index} title={i.title} value={i.Value} className={i.class} link={i.link} />
        })}
        {/* <Cards /> */}
      </div>
      {/* <div className="graph_display" style={{display: 'flex',justifyContent:'center'}}>
        <Graph />
      </div> */}
    </div>
  )
}
export default Dashboard