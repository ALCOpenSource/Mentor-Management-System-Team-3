import React, { useState } from "react";
import logo from "../../assets/images/mms_logo.svg";
import Avatar from "../../assets/images/avatar.svg";


function SignupForm1() {
    const [fname, setFirstName] = useState("");
    const [lname, setLastName] = useState("");
    const [about, setAbout] = useState("");
    const [website, setWebsite] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");


    return (
        <div className="w-full h-full">
            <div className="bg-green-three relative flex flex-wrap items-center p-4 mb-6">
                <img src={logo} alt="MMS Logo" className="h-8 mr-2" />   
                <span className="text-3xl text-white">Mentor Managers System</span>
            </div>
            <div className="flex flex-col items-center justify-center mb-6">
                <h1 className="text-bold text-customBlack-one text-4xl mb-4">Become a Mentor Manager</h1>
                <div className="flex flex-wrap items-center justify between rounded-sm">
                    <img src="/images/activebar.png" alt="Activesign" className="w-[112px] h-[16px]" />
                    <img src="/images/passivebar.png" alt="Passivesign" className="w-[112px] h-[16px]" />
                    <img src="/images/passivebar.png" alt="Passivesign" className="w-[112px] h-[16px]" />
                    <img src="/images/passivebar.png" alt="Passivesign" className="w-[112px] h-[16px]" />
                </div>
            </div>
            <div className="bg-white">
                <form className="w-full">
                    <div className="flex flex-row items-center justify-center">
                        <img src={Avatar} alt="profile"/>
                        <span className="flex flex-col ml-2 items-center">
                            <h2 className="text-customBlack-one text-bold">Set Profile Picture</h2>
                            <button type="button" className="btn-primary">UploadPicture</button>
                        </span>
                    </div>
                    <div className="flex flex-row items-center justify-center mb-6">
                        <label className="text-customBlack-one text-normal w-[83px] l-[284px] t-[441px] h-[27px]">Full Name*</label>
                        <div className="my-4 flex flex-row">
                        <input
                          type="text"
                          id="text"
                          value={fname}
                          placeholder="First Name"
                          onChange={(event) => setFirstName(event.target.value)}
                          className="w-[370px] h-[50px] t-[429px] l-[395px] shadow appearance-none border rounded py-2 px-3 text-gray-one leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <input
                          type="text"
                          id="text"
                          value={lname}
                          placeholder="Last Name"
                          onChange={(event) => setLastName(event.target.value)}
                          className="w-[370px] h-[50px] t-[429px] l-[395px] shadow appearance-none border rounded py-2 px-3 text-gray-one leading-tight focus:outline-none focus:shadow-outline"
                        />
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center mb-6">
                        <label className="text-customBlack-one text-normal w-[90px] t-[509px] l-283px]">About</label>
                        <div className="my-4">
                        <input
                          type="text"
                          id="text"
                          value={about}
                          placeholder="Your bio"
                          onChange={(event) => setAbout(event.target.value)}
                          className="shadow appearance-none border rounded w-[761px] px-[7px] py-[15px] text-gray-one leading-tight focus:outline-none focus:shadow-outline"
                        />
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center mb-6">
                        <label className="text-customBlack-one text-normal w-[90px] t-[509px] l-[283px]">Website</label>
                        <div className="my-4">
                        <input
                          type="url"
                          id="url"
                          value={website}
                          placeholder="www.example.com"
                          onChange={(event) => setWebsite(event.target.value)}
                          className="shadow appearance-none border rounded w-[761px] h-[50px] text-gray-one leading-tight focus:outline-none focus:shadow-outline"
                        />
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center mb-6">                        
                        <label className="text-customBlack-one text-normal w-[87px] h-[27px] l-[283px]">Country*</label>
                        <div className="my-4 flex flex-row">
                        <input
                          type="search"
                          id="text"
                          value={country}
                          placeholder="Select Country"
                          onChange={(event) => setCountry(event.target.value)}
                          className="w-[319px] h-[50px] shadow appearance-none border rounded py-2 px-3 text-gray-one leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <label className="text-customBlack-one text-normal w-[87px] h-[27px] l-[283px]">City*</label>
                        <input
                          type="search"
                          id="text"
                          value={city}
                          placeholder="Select City"
                          onChange={(event) => setCity(event.target.value)}
                          className="w-[319px] h-[50px] shadow appearance-none border rounded py-2 px-3 text-gray-one leading-tight focus:outline-none focus:shadow-outline"
                        />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default SignupForm1;