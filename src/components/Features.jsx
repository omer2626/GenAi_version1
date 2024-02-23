import React from "react";
import FeatureComponentLeft from "./FeatureComponentLeft";
import FeatureComponentRight from "./FeatureComponentRight";
import abs1 from '../assets/abstract1.png';
import abs2 from '../assets/abstract2.png';
import abs3 from '../assets/abstract3.png';

const feature1 = {
  heading: "ImagiText",
  caption: "Text-to-Image Generation",
  desc: `Introducing ImagiText, your gateway to visual storytelling! With
  ImagiText, transform textual descriptions into captivating images,
  bringing your narratives to life in vivid detail. Whether you're a
  writer seeking inspiration, a marketer crafting engaging content, or
  an educator enhancing learning materials, ImagiText empowers you to
  illustrate concepts, scenes, and ideas effortlessly. From landscapes
  to characters, ImagiText fuels imagination and enriches communication
  through the power of visual representation.`,
  image: abs1,
  route:"/TTI"
};

const feature2 = {
  heading: "HarmonyVerse",
  caption: "Text-to-Music Synthesis",
  desc: `Transform your words into melodies with HarmonyVerse! This innovative
  feature converts any text input into vibrant musical compositions,
  offering a unique way to express emotions, ideas, and stories through
  the language of music. Whether you're a poet, a storyteller, or simply
  looking to add a creative touch to your words, HarmonyVerse seamlessly
  bridges the gap between text and sound, unlocking a world of auditory
  possibilities.`,
  image: abs2,
  route:"/TTM"
};

const feature3 = {
  heading: "VocalizePro",
  caption: "Text-to-Speech Enhancement",
  desc: `Elevate your spoken word with VocalizePro! This cutting-edge feature
  refines text-to-speech conversion, delivering unparalleled clarity,
  emotion, and naturalness to vocal renditions. Whether you're creating
  podcasts, voiceovers, or accessibility tools, VocalizePro offers a
  seamless synthesis of text and voice, enriching communication channels
  with lifelike articulation and expression. Empower your content with
  VocalizePro and make every word resonate with authenticity and impact.`,
  image: abs3,
  route:"/TTS"
};

const Features = () => {
  return (
    <div className="flex flex-col gap-16 py-2 h-[100%] overflow-hidden ">
      {/* <div className="absolute bg-radial-gradient w-[169vh] h-[192vh]"></div> */}
      <FeatureComponentLeft content={feature1}></FeatureComponentLeft>
      <FeatureComponentRight content={feature2}></FeatureComponentRight>
      <FeatureComponentLeft content={feature3}></FeatureComponentLeft>
    </div>
  );
};

export default Features;
