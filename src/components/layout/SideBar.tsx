import Button from "../Button";
import Pan from "../animation/Pan";
import FadeIn from "../animation/Fadein";
import { Facebook, Insta, LinkedIn, X } from "../icons";
import Image from "next/image";

const SideBar = () => {
  return (
    <div className="z-45 top-0 flex h-full flex-col items-center justify-center from-[#18181b] to-[#222225] pt-10 transition-all duration-700 lg:sticky lg:h-screen lg:min-h-screen lg:bg-gradient-to-r lg:py-20 ">
      <div className="rounded-full px-10 lg:px-10 xl:px-20">
        <FadeIn>
          <div className="mx-auto w-40 overflow-hidden rounded-full border-4  border-primary ">
            <Image
              width={500}
              height={500}
              src="/static/home/avt.webp"
              alt="my-photo"
              className="md:transform-gpu md:transition-all md:duration-700"
            />
          </div>
        </FadeIn>

        <Pan>
          <h1 className="mx-auto py-3 text-center text-4xl font-medium text-secondary">
            Poiuyt<span className="text-primary">.dev</span>
          </h1>
          <div className="mx-auto h-1 w-4/5 bg-gradient-to-r from-secondary to-primary"></div>
          <div className="w-full py-2 text-center text-base text-gray-300">
            Made with <span className="text-primary underline">Coffee</span> &{" "}
          </div>
          <Pan className="flex items-center justify-center space-x-5 pt-5">
            <a
              href="https://www.facebook.com/Poiuyt18"
              target="_blank"
              className=""
            >
              <Facebook className="h-6 w-6 transition-all hover:scale-150 hover:text-primary dark:text-white" />
            </a>
            <a
              href="https://twitter.com/khuyen_van24041"
              target="_blank"
              className=""
            >
              <X className="h-6 w-6 transition-all hover:scale-150 hover:text-primary dark:text-white" />
            </a>
            <a
              href="https://www.instagram.com/Poiuyt18/"
              target="_blank"
              className=""
            >
              <Insta className="h-6 w-6 transition-all hover:scale-150 hover:text-primary dark:text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/Poiuyt"
              target="_blank"
              className=""
            >
              <LinkedIn className="h-6 w-6 transition-all hover:scale-150 hover:text-primary dark:text-white" />
            </a>
          </Pan>
          <div className="w-full py-3 text-center text-lg text-gray-300 transition duration-150 ease-out lg:py-10">
            <p>
              &quot;Developer đến từ Hà Tịnh, thích viết ✍️ và làm sản phẩm
              👨‍💻&quot;
            </p>
          </div>
        </Pan>
      </div>

      <Button
        href="https://drive.google.com/file/d/1GSmdn_fOtVI8Y6CXjoB8GSo6vfn079Ne/view?usp=sharing"
        newTab="1"
        className="px-20 pb-10 pt-10"
      >
        Download Resume
      </Button>

      <div className="flex w-full justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          preserveAspectRatio="xMidYMid meet"
          version="1.0"
          viewBox="9.7 40.1 76.9 15.4"
          zoomAndPan="magnify"
          width="150px"
          className="img-mode-bw"
          fill="#fff"
          data-v-4fcc735c=""
        >
          <g id="__id5_sry9diu4c" data-v-4fcc735c="">
            <path
              d="M84.92,45.37c-0.88-1.72-3.47-0.2-2.59,1.51c0.09,0.17-0.12,0.45-0.31,0.54c-0.1-0.08-0.23-0.25-0.26-0.3 c-0.24-0.31-0.47-0.61-0.69-0.94c-0.87-1.28-1.79-2.66-3.38-3.07c-3.51-0.92-5.82,3.02-8.75,4.1c-1.07,0.4-3.77,0.95-4.54-0.23 c-0.41-0.62-0.37-1.63-0.65-2.33c-0.27-0.71-0.66-1.36-1.21-1.89c-1.97-1.88-5-1.38-7.15-0.1c-3.02,1.79-5.38,4.52-8.5,6.18 c-1.05,0.56-3.2,1.59-4.24,0.52c-0.52-0.54-0.69-1.46-0.98-2.14c-0.33-0.76-0.77-1.46-1.39-2.01c-2.41-2.16-5.6-1.03-7.82,0.76 c-0.61,0.49-1.19,1.03-1.77,1.56c-0.65,0.59-1.5,1.05-2.12,1.65c0,0,0,0,0,0c0-0.25-0.04-0.53-0.05-0.78 c-0.01-0.79,0.04-1.58-0.04-2.36c-0.37-3.78-4.07-5.91-7.35-3.73c-1.78,1.18-3.22,2.9-4.72,4.4c-1.78,1.79-3.57,3.57-5.35,5.36 c-1.37,1.37,0.75,3.49,2.12,2.12c1.61-1.61,3.22-3.23,4.84-4.84c1.44-1.44,2.82-3.12,4.47-4.33c1.24-0.91,2.6-0.83,2.97,0.88 c0.33,1.49-0.16,3.05,0.32,4.53c1.37,4.28,5.84,0.3,7.63-1.31c1.03-0.93,2.33-2.24,3.85-2.1c1.61,0.14,1.84,2.03,2.41,3.22 c1.71,3.55,5.88,2.72,8.73,1.2c3.2-1.7,5.58-4.61,8.75-6.32c0.85-0.46,2.12-0.91,3.04-0.38c1.29,0.74,1,2.93,1.82,4.08 c2.02,2.87,7,1.93,9.55,0.45c0.91-0.53,1.71-1.23,2.55-1.87c0.66-0.51,1.47-1.24,2.32-1.38c1.45-0.23,2.45,2.48,3.31,3.35 C82.47,52.15,86.59,48.63,84.92,45.37z"
              fill="#fff"
              data-v-4fcc735c=""
            ></path>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default SideBar;
