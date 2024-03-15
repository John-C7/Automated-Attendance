// FaceRecognitionPage.js
import React, { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import groupPhoto from './Group.jpg';  
import Student1 from "./Student1.jpg";
import Student2 from "./Student2.jpg";
import axios from 'axios';

const FaceRecognitionPage = () => {
    const [subjectCode, setSubjectCode] = useState('');
    const [date, setDate] = useState('');
    const [attendanceAdded, setAttendanceAdded] = useState(false);

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

            const refImage1 = await faceapi.fetchImage(Student1);
            const refImage2 = await faceapi.fetchImage(Student2);

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
                const bestMatch = faceMatcher.findBestMatch(descriptor);
                const box = detection.box;
                const drawBox = new faceapi.draw.DrawBox(box, { label: bestMatch.toString() });
                drawBox.draw(canvas);
                const label = index === 0 ? 'Student1' : 'Student2'; 
                const textX = box.x;
                const textY = box.y - 15; 
                canvas.getContext('2d').fillStyle = '#ffffff'; 
                canvas.getContext('2d').fillText(label, textX, textY);
            });
        }

        run();
    }, []);

    const handleSubjectCodeChange = (e) => {
        setSubjectCode(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleSubmit = async () => {
        if (subjectCode && date) {
            const usn = subjectCode === 'your_subject_code' ? '1DT21CS004' : '1DT21CS005'; 
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
                {attendanceAdded && <p>Attendance added for Student-1 and Student-2 on {date} for subject code {subjectCode}</p>}
            </div>
        </div>
    );
}

export default FaceRecognitionPage;
