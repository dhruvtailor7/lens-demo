import { useState } from "react";
import image from "../../images/img.png";
import logger from "../../logger/logger";
export default function HoverCard() {
    const [isExpanded, setIsExpanded] = useState(false);
    const outerStyle = isExpanded ? 'opacity-100': 'opacity-0'
    const innerStyle = isExpanded ? "opacity-100 max-h-[999px]": "max-h-0 opacity-0"
  return (
    <div className="mt-24 overflow-visible flex items-center justify-center">
      <div className="group relative overflow-visible">
        <img className="rounded-xl drop-shadow-2xl " src={image.src} />
        <div className={`group/inner flex-col ${outerStyle} absolute left-0 right-0 bottom-0 p-6 text-white bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.8)] rounded-b-[16px] group-hover:opacity-100 transition-all duration-200`}>
          <div className="flex justify-between"><span>The Forgotten Prince of The Kingdom of Eternal Sunlight</span><span>Share</span></div>
          <div className={`text-white ${innerStyle} group-hover/inner:max-h-[999px] group-hover/inner:opacity-100 transition-all duration-[500ms]`}>
            <div>
              <div className="flex justify-between">
              <span>@dhruv.eth</span>
              <button onClick={() => setIsExpanded((value) => !value)}>{isExpanded ? "hide prompt" : "see prompt"}</button>
              </div>
              <div className={`${isExpanded ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-[500ms] `}>
                <span>Prince, potrait, intricate, highly detailed, purple hues, lighter on left side, sharp facial features. Prince, potrait, intricate, highly detailed, purple hues, lighter on left side, sharp facial features. Prince, potrait, intricate, highly detailed, purple hues, lighter on left side, sharp facial features. Prince, potrait, intricate, highly detailed, purple hues, lighter on left side, sharp facial features. </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
