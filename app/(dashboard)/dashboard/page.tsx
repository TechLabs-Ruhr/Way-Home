import Link from "next/link"
import {FC} from "react"
import Map from "@/app/(map)/map/Map"



const Page: FC = ({}) => {
    return (
    <> <div className="w-full h-[130vh] overflow-y-auto">
      <h1 className="font-bold  text-gray-500 text-5xl mx-auto text-center pt-8" data-aos="fade-up">Welcome to our Network!</h1>
      <div id="container" className="flex justify-center space-x-36 pt-20 px-5" >
        {/* Emergency Signal and Call*/}
        <div className="text-center hover:bg-white rounded-lg p-3 transition duration-500 ease-in-out" data-aos="fade-up" data-aos-delay="200">
        <div className="text-center flex items-center justify-center">
        <svg className="w-20 h-20 mb-4" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#475569">
              <path d="M280 0C408.1 0 512 103.9 512 232c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-72c0-13.3 10.7-24 24-24c75.1 0 136 60.9 136 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88c-13.3 0-24-10.7-24-24zM117.5 1.4c19.4-5.3 39.7 4.6 47.4 23.2l40 96c6.8 16.3 2.1 35.2-11.6 46.3L144 207.3c33.3 70.4 90.3 127.4 160.7 160.7L345 318.7c11.2-13.7 30-18.4 46.3-11.6l96 40c18.6 7.7 28.5 28 23.2 47.4l-24 88C481.8 499.9 466 512 448 512C200.6 512 0 311.4 0 64C0 46 12.1 30.2 29.5 25.4l88-24z"/>
              </svg>
          </div>
          <Link href="#" className="block text-lg font-bold mt-2 text-gray-500  hover:text-gray-900">
          Emergency Signal and Call
          </Link>
        </div>

        {/* GPS Data Sharing */}
        <div className="text-center  hover:bg-white rounded-lg p-3 transition duration-500 ease-in-out" data-aos="fade-up" data-aos-delay="400">
        <div className="text-center flex items-center justify-center">
        <svg className="w-20 h-20 mb-4" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#475569">
              <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"/>
          </svg>
          </div>
          <Link href="#" className="block text-lg font-bold mt-2 text-gray-500  hover:text-gray-900">
             GPS Data Sharing
          </Link>
        </div>

        {/* Safety Hotspots */}
        <div className="text-center  hover:bg-white rounded-lg p-3 transition duration-500 ease-in-out" data-aos="fade-up" data-aos-delay="600">
        <div className="text-center flex items-center justify-center text-gray-600">
        <svg className="w-20 h-20 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#475569">
              <path d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/>
            </svg>
        </div>
          <Link href="#" className="block text-lg font-bold mt-2 text-gray-500 hover:text-gray-900">
            Safety Hotspots
          </Link>
        </div>
        

        {/* Connect with fellow travelers */}
        <div className="text-center  hover:bg-white rounded-lg p-3 transition duration-500 ease-in-out" data-aos="fade-up" data-aos-delay="800">
        <div className="text-center flex items-center justify-center">
          <svg className="w-20 h-20 mb-4" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512" fill="#475569">
                 <path d="M208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 38.6 14.7 74.3 39.6 103.4c-3.5 9.4-8.7 17.7-14.2 24.7c-4.8 6.2-9.7 11-13.3 14.3c-1.8 1.6-3.3 2.9-4.3 3.7c-.5 .4-.9 .7-1.1 .8l-.2 .2 0 0 0 0C1 327.2-1.4 334.4 .8 340.9S9.1 352 16 352c21.8 0 43.8-5.6 62.1-12.5c9.2-3.5 17.8-7.4 25.3-11.4C134.1 343.3 169.8 352 208 352zM448 176c0 112.3-99.1 196.9-216.5 207C255.8 457.4 336.4 512 432 512c38.2 0 73.9-8.7 104.7-23.9c7.5 4 16 7.9 25.2 11.4c18.3 6.9 40.3 12.5 62.1 12.5c6.9 0 13.1-4.5 15.2-11.1c2.1-6.6-.2-13.8-5.8-17.9l0 0 0 0-.2-.2c-.2-.2-.6-.4-1.1-.8c-1-.8-2.5-2-4.3-3.7c-3.6-3.3-8.5-8.1-13.3-14.3c-5.5-7-10.7-15.4-14.2-24.7c24.9-29 39.6-64.7 39.6-103.4c0-92.8-84.9-168.9-192.6-175.5c.4 5.1 .6 10.3 .6 15.5z"/>
                 </svg>
          </div>
          <Link href="#" className="block text-lg font-bold mt-2 text-gray-500 hover:text-gray-900">
            Connect with fellow Travelers
          </Link>
        </div>

      </div>
      {/* Map */}
      <div className="max-w-4xl mx-auto py-20" data-aos="fade-up" data-aos-delay="950"> 
        <Map address="Dortmund, Germany" /> 
      </div>
      </div>
    </>
    )
  }
  
  export default Page