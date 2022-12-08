/* eslint-disable react/jsx-no-target-blank */
import React, {useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import { useAppContext } from "../../context/appContext"


const lowColors = [
  'bg-red-600', 'bg-lightBlue-500', 'bg-blueGray-700'
];

const highColors = [
  'bg-yellow-500', 'bg-red-700', 'bg-emerald-500'
]

const NumberSpan = () => { 
  let colors = [...lowColors , ...highColors];
    return colors.map((color, index) => <div className="my-4 w-6/12 px-4"><div key={index} className={`shadow-lg rounded-lg text-center p-16 ${color} mt-8`} >
    <span className="bg-white rounded-full w-16 h-16 leading-[50px] inline-block text-center text-xl m-1.5" style={{lineHeight: '60px'}}><b>{index+1}</b></span>
  </div></div>) 
}

export default function Meeting() {
  const context = useAppContext();
  const router = useRouter();
  const {auth} = context;
  useEffect(_ => {
    if (!auth.user) {
        return router.push('/auth/login')
    }
  }, [])
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
                Final Score
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mt-20">
              <div className="justify-center flex flex-wrap relative"> */}
                {/* <div className="my-4 w-full lg:w-6/12 px-4"> */}
                  <NumberSpan />
                {/* </div> */}
                {/* <div className="my-4 w-full lg:w-6/12 px-4">
                <NumberSpan skip={true}/>
                </div> */}
              {/* </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
