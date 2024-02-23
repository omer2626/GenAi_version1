import React, { useState } from "react";
import axios from "axios";
import logoimg from "../assets/logoimage.png";
import { Link } from "react-router-dom";
import { end_point_image } from "../constants/url";
import Loader from "./Loader";

const TTI = () => {
  const [imageData, setImageData] = useState(null);
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [buttonDisabled, setButtonDisabled] = useState(false); // Add button disabled state

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const loadImage = () => {
    setLoading(true); // Set loading to true before making the API call
    setButtonDisabled(true); // Disable the button
    const prompt = {
      image_query: inputText,
    };

    axios
      .post(`${end_point_image}/process_image`, prompt, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setImageData(response.data.image_base64);
        setError(null);
      })
      .catch((error) => {
        setImageData("");
        setError(
          error.message || "An error occurred while fetching image data"
        );
      })
      .finally(() => {
        setLoading(false); // Set loading to false once response is received
        setButtonDisabled(false); // Enable the button
      });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `data:image/jpeg;base64,${imageData}`;
    link.download = "generated_image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-black h-screen w-full flex flex-col gap-10 py-4 px-[5%]">
      <article className="flex flex-col text-white gap-8">
        <div className="flex justify-between pt-10">
          <div className="icon text-blue-50 text-4xl hover:text-sky-400">
            <Link to="/products">
              <i className="bx bx-arrow-back"></i>
            </Link>
          </div>
          <div className="heading">
            <div className="text-center text-4xl font-bold bg-gradient-to-r from-blue-500 to-sky-200  bg-clip-text text-transparent">
              Text To Image Generation
            </div>
          </div>
          <div className="invisible">
            dd
          </div>
        </div>
        <div className="h-[10vh] flex flex-col px-2 w-[70%] mx-auto bg-gray-200 rounded-3xl">
          <div className="search-box w-full h-full">
            <div className="flex flex-row h-full w-full">
              <span className="flex h-full items-center rounded rounded-r-none border-0 px-3 font-bold text-grey-100 w-[10%]">
                <img src={logoimg} className="h-[90%]" alt="logo" />
              </span>
              <input
                className="h-full text-grey-darker py-2 font-semibold text-grey-darkest border border-gray-200 px-2 outline-none text-lg text-gray-600 w-[70%] bg-gray-200"
                type="text"
                placeholder="Enter your prompt..."
                value={inputText}
                onChange={handleInputChange}
              />
              <span className="flex items-center rounded rounded-l-none border-0 px-3 font-bold text-grey-100 w-[20%]">
                <button className="generate-btn" onClick={() => loadImage()}>
                  <svg
                    height="24"
                    width="24"
                    fill="#FFFFFF"
                    viewBox="0 0 24 24"
                    data-name="Layer 1"
                    id="Layer_1"
                    className="sparkle"
                  >
                    <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
                  </svg>

                  <span className="generate-text">Generate</span>
                </button>
              </span>
            </div>
          </div>
        </div>

        {error && <div className="error text-center w-full">{error}</div>}
        {loading ? ( // Display Loader while loading
          <div className="flex justify-center w-full">
            <Loader />
          </div>
        ) : (
          imageData && (
            <>
              <div className="image-container h-[50vh] w-full flex gap-5 justify-center items-center">
                <img
                  src={`data:image/png;base64,${imageData}`}
                  alt="Generated Image"
                  className="h-full"
                />
                <button
                  onClick={() => handleDownload()}
                  className="rounded-full w-[50px] h-[50px] text-white bg-gradient-to-r from-blue-500 to-sky-200 hover:scale-105"
                >
                  <i className="bx bx-download text-2xl"></i>
                </button>
                {/* <button className="botao" onClick={() => handleDownload()}>
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mysvg"><g id="SVGRepo_bgCarrier" strokeWidth="0">
                                    </g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                                            <g id="Interface / Download">
                                                <path id="Vector" d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke="#f1f1f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                </path>
                                            </g> </g>
                                    </svg>
                                    <span className="texto">Download</span>
                                </button> */}
              </div>
            </>
          )
        )}
      </article>
    </div>
  );
};

export default TTI;
