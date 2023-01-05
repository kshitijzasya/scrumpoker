/* eslint-disable react/jsx-no-target-blank */
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import { useAppContext } from "../../context/appContext";
import Voting from "../../firebase/VotingSession";

const selectedStyle = {
  boxShadow: '10px 10px 30px rgb(0 0 0 / 80%)',
  cursor: "pointer"
};

const lowColors = [
  'bg-red-600', 'bg-lightBlue-500', 'bg-blueGray-700'
];

const highColors = [
  'bg-yellow-500', 'bg-red-700', 'bg-emerald-500'
]

const points = [1,2,3,5,8,10,12];

const NumberSpan = ({selected, setFunction}) => { 
  let colors = [...lowColors , ...highColors];
    return colors.map((color, index) => <div className="" key={index} ><div className={`shadow-lg rounded-lg text-center p-16 ${color} mt-8`} style={index === selected ? selectedStyle: {cursor: "pointer"}} onClick={e => setFunction(index, points[index])}>
    <span className="bg-white rounded-full w-16 h-16 leading-[50px] inline-block text-center text-xl m-1.5" style={{lineHeight: '60px'}}>{
      index === selected 
      ?
      <b>{points[index]}</b>
      :
      <b>X</b>
    }</span>
  </div></div>) 
}

export default function Meeting(props) {
  const context = useAppContext();
  const router = useRouter();
  const {auth} = context;
  const [selected, setSelected] = useState(null);
  useEffect(_ => {
    if (!auth.user) {
        return router.push('/auth/login')
    }
  }, []);

  function updateSeletectedPoint(index, value) {
    Voting().add(2)
    .then(response => setSelected(index))
    .catch(error => console.error(error));
    
  }
  return (
    <>
    <IndexNavbar fixed />
      <section className="pb-40 relative bg-blueGray-100">
        <div className="container mx-auto overflow-hidden pb-20">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-24 flex items-center justify-evenly">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-sitemap text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                {props.task ? props.task : 'Final Score'}
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap justify-between ">
                  <NumberSpan  selected={selected} setFunction={updateSeletectedPoint}/>
          </div>
        </div>
      </section>
    </>
  );
}
