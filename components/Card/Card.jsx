import image from "../../images/img.png";
export default function Card() {
  return (
    <div className="overflow-visible flex relative items-center justify-center">
      <img
        className="border border-[rgba(255, 255, 255, 0.2)] rounded-[16px] drop-shadow-[0_8px_8px_rgba(0,0,0,0.4) absolute top-0 rotate-[5deg] scale-[0.92] translate-x-[10px] origin-bottom-right"
        src={image.src}
      />
      <img
        className="border border-[rgba(255, 255, 255, 0.2)] rounded-[16px] drop-shadow-[0_8px_8px_rgba(0,0,0,0.4) absolute top-0 -rotate-[5deg] scale-[0.92] -translate-x-[10px] origin-bottom-left"
        src={image.src}
      />
      <img
        className="border border-[rgba(255, 255, 255, 0.2)] rounded-[16px] drop-shadow-[0_8px_8px_rgba(0,0,0,0.4)]"
        src={image.src}
      />

      {/* <img className="absolute rounded-xl drop-shadow-2xl" src={image} /> */}
    </div>
  );
}