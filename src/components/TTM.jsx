import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { end_point_music } from "../constants/url";
import logoimg from "../assets/logoimage.png";
import Loader from "./Loader";

const TTM = () => {
  const [audioSrc, setAudioSrc] = useState(null);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [buttonDisabled, setButtonDisabled] = useState(false); // Add button disabled state

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleClick = async () => {
    setLoading(true); // Set loading to true before making the API call
    setButtonDisabled(true); // Disable the button
    try {
      const response = await axios.post(`${end_point_music}/generate_audio/`, {
        inputs: inputText,
      });
      const audioBase64 = response.data.audio_base64;
      const audioBlob = base64toBlob(audioBase64);
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioSrc(audioUrl);
    } catch (error) {
      console.error("Error fetching audio:", error);
    } finally {
      setLoading(false); // Set loading to false once response is received
      setButtonDisabled(false); // Enable the button
    }
  };

  // Function to convert base64 to Blob
  const base64toBlob = (base64Data) => {
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: "audio/mpeg" });
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
              Text To Music Synthesis
            </div>
          </div>
          <div className="invisible">dd</div>
        </div>
        <div className="h-[10vh] flex flex-col px-2 w-[70%] mx-auto bg-gray-200 rounded-3xl">
          <div className="search-box w-full h-full">
            <div className="flex flex-row h-full w-full">
              <span className="flex h-full items-center rounded rounded-r-none border-0 px-3 pt-1 font-bold text-grey-100 w-[10%]">
                <img src={logoimg} className="h-[90%]" alt="logo" />
              </span>
              <input
                className="h-full text-grey-darker py-2 font-semibold text-grey-darkest border border-gray-200 px-2 outline-none text-lg text-gray-600 w-[70%] bg-gray-200"
                type="text"
                placeholder="Enter your prompt..."
                value={inputText}
                onChange={handleChange}
              />
              <span className="flex items-center rounded rounded-l-none border-0 px-3 font-bold text-grey-100 w-[20%]">
                <button
                  className="generate-btn"
                  onClick={() => handleClick()}
                  disabled={buttonDisabled}
                >
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

        {/* {error && <div className="error">{error}</div>} */}

        {loading ? ( // Display Loader while loading
          <div className="flex justify-center w-full">
            <Loader />
          </div>
        ) : (
          audioSrc && (
            <div className="flex items-center justify-center w-[100%] py-8">
              <audio className="w-[40%]" controls src={audioSrc} />
            </div>
          )
        )}
      </article>
    </div>
  );
};

export default TTM;
