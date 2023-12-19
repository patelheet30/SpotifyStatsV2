import {useDropzone} from "react-dropzone";
import React, { useState } from "react";
import JSZip from "jszip";
import  { useNavigate } from 'react-router-dom';


import './home.css';
import '../../styles.css'

import profilePic from '../../assets/patelheet30pfp.webp';
import UploadSVG from '../../assets/upload.svg';
import InfoSVG from '../../assets/info.svg';
import SpotifySVG from '../../assets/spotify.svg';


const Home = () => {
    // eslint-disable-next-line no-unused-vars
    const [uncompressedFiles, setUncompressedFiles] = useState([]);
    const navigate = useNavigate();

    const onDrop = (acceptedFiles) => {
        const invalidFiles = acceptedFiles.filter(file => !file.type.includes('json') && !file.type.includes('zip'));
        console.log('Invalid Files:', invalidFiles);

        if (invalidFiles.length > 0) {
            window.alert('Error: Only JSON and ZIP files are valid');
        } else {
            let newFiles = [...acceptedFiles];
            acceptedFiles.forEach((file, index) => {
                if (file.type === 'application/zip') {
                    const reader = new FileReader();
                    reader.onload = function() {
                        const zip = new JSZip();
                        zip.loadAsync(reader.result).then((zipFiles) => {
                            const filePromises = [];
                            zipFiles.forEach((relativePath, zipEntry) => {
                                const promise = zipEntry.async('blob').then((fileData) => {
                                    return new File([fileData], relativePath);
                                });
                                filePromises.push(promise);
                            });
                            Promise.all(filePromises).then((uncompressedFiles) => {
                                newFiles.splice(index, 1, ...uncompressedFiles);
                                setUncompressedFiles([...newFiles]);
                                navigate('/success', { state: { newFiles } });
                            });
                        });
                    };
                    reader.readAsArrayBuffer(file);
                }
            });
            console.log('Accepted files:', newFiles);
        }
    };


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ['.json', '.zip'],
    });

    const dropzone = `dropzone ${isDragActive ? 'active' : ''}`;

    return (
        <div className="home">
            <h1 className="website-title">Spotify Data Viewer</h1>
            <div className="info">
                <p className="website-description">An open source alternative to many Spotify data viewers like Stats.fm, Stats for Spotify</p>
                <div className="profile-section">
                    <a href="https://www.github.com/patelheet30" target="_blank" rel="noreferrer">
                        <img src={profilePic} alt="Profile WEBP" className="profile-pic" />
                    </a>
                    <p className="profile-name">Heet Patel (patelheet30)</p>
                </div>
            </div>
            <div className="tooltipSection">
                <div className="tooltipContainer">
                    <img src={InfoSVG} alt="Info SVG" height={40} width={40} className={"hoverEnlarge"} />
                    <span className={"tooltipText"}>Info</span>
                </div>
                <div className="tooltipContainer">
                    <a href={"https://open.spotify.com/user/heetkpatel?si=381f10c23e4f4616"} target={"_blank"} rel={"noreferrer"}>
                       <img src={SpotifySVG} alt={"Info SVG"} height={36} width={36} className={"hoverEnlarge"} />
                    </a>
                    <span className={"tooltipText"}>Spotify</span>
                </div>
            </div>
            <div {...getRootProps()} className={dropzone}>
                <input {...getInputProps()} />
                <img src={UploadSVG} alt="Upload Pic" className="uploadSVG" height="40" width="40"/>
                <p>Drag 'n' drop your JSON or ZIP files here, or click to select files</p>
            </div>
        </div>
    );
};

export default Home;