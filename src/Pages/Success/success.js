import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import './success.css';
import InfoButton from "../../Components/infoButtons/infoButtons";
import User from "../../utils/userBuilder";

import birthdaySVG from "../../assets/birthday.svg";
import countrySVG from "../../assets/country.svg";
import emailSVG from "../../assets/email.svg";
import creationdateSVG from "../../assets/creationdate.svg";
import genderSVG from "../../assets/gender.svg"
import usernameSVG from "../../assets/username.svg";
import followingSVG from "../../assets/following.svg";
import followersSVG from "../../assets/followers.svg";


const Success = () => {

    const location = useLocation();
    const newFiles = location.state.newFiles;

    const [user, setUser] = useState(new User());

    useEffect(() => {
        const userInstance = new User();
        userInstance.gatherData(newFiles).then(() => {
            setUser(userInstance);
        }).catch((error) => {
            console.log(error);
        });
    }, [newFiles]);

    return (
        <div className="Success">
            <div className="main-container">
                <div className="left-container">
                    <div className="section" id={"left-section-1"}>
                        <div className={"left-section-1-container"}>
                            <div className={"left-section-1-container-title"}>
                                <h3>User-Info</h3>
                            </div>
                            <div className={"left-section-1-container-text"}>
                                <div className={"info-grid"}>
                                    <InfoButton title={<img src={usernameSVG} alt={"Username"} width={"50px"} height={"50px"}/>} infoTitle={"Username"} info={"Your username is: " + user.name} />
                                    <InfoButton title={<img src={emailSVG} alt={"Email"} width={"50px"} height={"50px"}/>} infoTitle={"Email"} info={"Your email is: " + user.email} />
                                    <InfoButton title={<img src={followersSVG} alt={"Followers"} width={"50px"} height={"50px"}/>} infoTitle={"Followers"} info={"You follow these many people: " + user.followers} />
                                    <InfoButton title={<img src={followingSVG} alt={"Following"} width={"50px"} height={"50px"}/>} infoTitle={"Following"} info={"These many people follow you: " + user.following} />
                                    <InfoButton title={<img src={creationdateSVG} alt={"Creation Date"} width={"50px"} height={"50px"}/>} infoTitle={"Creation Date"} info={"Your created your Spotify account on this day: " + user.creationDate} />
                                    <InfoButton title={<img src={countrySVG} alt={"Country"} width={"50px"} height={"50px"}/>} infoTitle={"Country"} info={"Your Spotify account has you residing at: " + user.country} />
                                    <InfoButton title={<img src={genderSVG} alt={"Gender"} width={"50px"} height={"50px"}/>} infoTitle={"Gender"} info={"Your Gender: " + user.gender} />
                                    <InfoButton title={<img src={birthdaySVG} alt={"Birthday"} width={"50px"} height={"50px"}/>} infoTitle={"Birthday"} info={"You were born on this day: " + user.birthday} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section" id={"left-section-2"}>
                        <div className={"left-section-2-container"}>
                            <div className={"left-section-2-container-title"}>
                                <h3>Your Data</h3>
                            </div>
                            <div className={"left-section-2-container-text"}>

                            </div>
                        </div>
                    </div>
                </div>
                <div className={"right-container"}>
                    <div className="section" id={"right-section"}>Section 3</div>
                </div>
            </div>
        </div>
    )
}

export default Success;