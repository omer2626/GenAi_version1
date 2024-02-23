import React from "react";
// import './Main.css'
import { Link } from "react-router-dom";
const ProductPage = () => {
    return (
        <div className="bg-black text-white h-[90vh] w-full py-12 flex flex-col gap-10 overflow-y-hidden">
            <article className="heading text-center text-4xl font-bold bg-gradient-to-r from-blue-500 to-sky-200  bg-clip-text text-transparent">
                GENERATIVE AI MODELS
            </article>

            <div className="Work_container flex items-center gap-7">
                <div className="flex h-[60vh] w-[33%] items-center justify-center">
                    <div className="h-full w-full rounded-3xl bg-gradient-to-r from-blue-500 to-sky-100 p-1">
                        <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-slate-800 rounded-3xl">
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-sky-200 bg-clip-text text-transparent">ImagiText </div>
                            <div className="text-md text-center"> "Generative AI model that generate images from text descriptions."</div>
                            <Link to="/TTI">
                                <button type="button" className="btn">
                                    <strong>Try it out</strong>
                                    <div id="container-stars">
                                        <div id="stars"></div>
                                    </div>

                                    <div id="glow">
                                        <div className="circle"></div>
                                        <div className="circle"></div>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex h-[60vh] w-[33%] items-center justify-center">
                    <div className="h-full w-full rounded-3xl bg-gradient-to-r from-blue-500 to-sky-100 p-1">
                        <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-slate-800 rounded-3xl">
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-sky-200 bg-clip-text text-transparent">HarmonyVerse </div>
                            <div className="text-md text-center"> "Generative AI  model that generate Music from text descriptions."</div>
                            <Link to="/TTM">
                                <button type="button" className="btn">
                                    <strong>Try it out </strong>
                                    <div id="container-stars">
                                        <div id="stars"></div>
                                    </div>

                                    <div id="glow">
                                        <div className="circle"></div>
                                        <div className="circle"></div>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex h-[60vh] w-[33%] items-center justify-center">
                    <div className="h-full w-full rounded-3xl bg-gradient-to-r from-blue-500 to-sky-100 p-1">
                        <div className="flex h-full w-full flex-col items-center justify-center gap-8 bg-slate-800 rounded-3xl">
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-sky-200 bg-clip-text text-transparent"> VocalizePro </div>
                            <div className="text-md text-center">"Generative AI model that  generates an audio for the text."</div>
                            <Link to="/TTS">
                                <button type="button" className="btn">
                                    <strong>Try it out</strong>
                                    <div id="container-stars">
                                        <div id="stars"></div>
                                    </div>

                                    <div id="glow">
                                        <div className="circle"></div>
                                        <div className="circle"></div>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>


            </div>



        </div>
    )
}
export default ProductPage;