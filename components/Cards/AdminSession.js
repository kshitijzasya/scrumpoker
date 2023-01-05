import React, {useState} from "react";
import { useRouter } from 'next/router';
import Session from "../../firebase/session";

// components

export default function AdminSession() {
  const router = useRouter();
  const [link, setLink] = useState('');
  const [token, setToken] = useState('');
  const [isNewToken, setIsNewToken] = useState(false)

  const generateSecureLink = _ => {
    let host = window.location.host;
    let tokn = Math.random().toString(30).slice(2);
    setToken(tokn);
    setLink(`${host}/session/${tokn}`);
    setIsNewToken(true);
  }

  const createAndCopyToClipboard = _ => {
    if(isNewToken) Session().add(token)
    navigator.clipboard.writeText(token);
    setIsNewToken(false)
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
            <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={generateSecureLink}
            >
              Generate
            </button>
            {
              token.length
              ?
              <button
              className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={createAndCopyToClipboard}
            >
              Copy to clipboard
            </button>
            : ""
            }
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

            <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Secured Link
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    value={link}
                    readOnly={true}
                    onClick={createAndCopyToClipboard}
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}
