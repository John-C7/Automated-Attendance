import React, { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import groupPhoto from './Group.jpg';  
import JohnC from "./Student1.jpg";
import HarshM from "./Student2.jpg";
import axios from 'axios';
import Tesseract from 'tesseract.js';

const name1 = "JohnC";
const name2= "HarshM";
const FaceRecognitionPage = () => {
    const [subjectCode, setSubjectCode] = useState('');
    const [date, setDate] = useState('');
    const [attendanceAdded, setAttendanceAdded] = useState(false);
    const [identifiedPersons, setIdentifiedPersons] = useState([]);

    useEffect(() => {
        const run = async () => {
            await Promise.all([
                faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
                faceapi.nets.ageGenderNet.loadFromUri('/models'),
            ])

            const image = document.getElementById('image');
            const canvas = faceapi.createCanvasFromMedia(image);
            canvas.style.position = 'absolute'; 
            canvas.style.top = '0'; 
            canvas.style.left = '0'; 
            document.body.append(canvas);
            const displaySize = { width: image.width, height: image.height };
            faceapi.matchDimensions(canvas, displaySize);

            const refImage1 = await faceapi.fetchImage(JohnC);
            const refImage2 = await faceapi.fetchImage(HarshM);

            const refAiData1 = await faceapi
                .detectAllFaces(refImage1)
                .withFaceLandmarks()
                .withFaceDescriptors();

            const refAiData2 = await faceapi
                .detectAllFaces(refImage2)
                .withFaceLandmarks()
                .withFaceDescriptors();

            const descriptors1 = refAiData1.map(face => face.descriptor);
            const descriptors2 = refAiData2.map(face => face.descriptor);

            let faceMatcher = new faceapi.FaceMatcher(descriptors1.concat(descriptors2));

            const facesAiData = await faceapi.detectAllFaces(image)
                .withFaceLandmarks()
                .withFaceDescriptors();

                facesAiData.forEach((face, index) => {
                    const { detection, descriptor } = face;
                    const box = detection.box;
                
                    //  match any of the predefined images
                    const bestMatch = faceMatcher.findBestMatch(descriptor);
                
                    if (bestMatch.label === 'unknown') {
                        // Draw a box around the unknown face and label it as 'Unknown'
                        const drawBox = new faceapi.draw.DrawBox(box, { label: 'Unknown' });
                        drawBox.draw(canvas);
                    } else {
                        // Draw a box around the identified face with the highest probability label
                        const drawBox = new faceapi.draw.DrawBox(box, { label: bestMatch.toString() });
                        drawBox.draw(canvas);
                
                        if (!identifiedPersons.includes(bestMatch.label)) {
                            const label = index === 0 ? name2 : name1; 
                            const textX = box.x;
                            const textY = box.y + 15;
                            canvas.getContext('2d').fillStyle = 'red';
                            canvas.getContext('2d').fillText(label, textX, textY);
                            setIdentifiedPersons(prevState => [...prevState, bestMatch.label]);
                        }
                    }
                });
        }

        run();
    }, []);

    useEffect(() => {
        const convertImageToText = async () => {
            const { data: { text } } = await Tesseract.recognize(
                groupPhoto,
                'eng',
                { logger: m => console.log(m) }
            );
            
            const datePattern = /(\d{2}\/\d{2}\/\d{4})/;
            const match = text.match(datePattern);
            const extractedDate = match ? match[0] : '';
            setDate(extractedDate);
        };

        convertImageToText();
    }, []);


    const handleSubjectCodeChange = (e) => {
        setSubjectCode(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleSubmit = async () => {
        if (subjectCode && date) {
            const usn = subjectCode === 'your_subject_code' ? '1DT21CS049' : '1DT21CS059'; 
            const subjectId = subjectCode;
            const status = 'present'; 
            await axios.post('http://localhost:8800/attendance', { student_usn: usn, subject_id: subjectId, date: date, status: status });
            setAttendanceAdded(true);
        } else {
            alert('Please select a subject code and date');
        }
    };

    
    return (
        <div>
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <img id="image" src={groupPhoto} alt="Group Photo" />
            </div>
            <div>
                <h2>Add Attendance for Students </h2>
                <label htmlFor="subjectCode">Subject Code:</label>
                <input type="text" id="subjectCode" value={subjectCode} onChange={handleSubjectCodeChange} />
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" value={date} onChange={handleDateChange} />
                <button onClick={handleSubmit}>Submit</button>
                {attendanceAdded && <p>Attendance added for HarshM and JohnC on {date} for subject code {subjectCode}</p>}
                <p>Date recognized from image: {date}</p>
            </div>
        </div>
    );
}

export default FaceRecognitionPage;