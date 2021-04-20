const path = require("path");
const tf = require("@tensorflow/tfjs-node");
const canvas = require("canvas");
const faceapi = require("@vladmandic/face-api/dist/face-api.node.js");
const fetch = require('node-fetch')
const fs = require("fs");
const Alert=require("./Models_Node/Alerts")

//const QUERY_IMAGE = './Images/bbt4.jpg'

const faceDetectionNet = faceapi.nets.ssdMobilenetv1
const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

let labeledFaceDescriptors = null;


exports.load =(imgUrl)=>Promise.all([
    faceDetectionNet.loadFromDisk('./Models'),
    faceapi.nets.faceLandmark68Net.loadFromDisk('./Models'),
    faceapi.nets.faceRecognitionNet.loadFromDisk('./Models')
]).then(this.run(imgUrl))

exports.run=async (imgUrl)=>{

    labeledFaceDescriptors = await loadLabeledImages();

    const queryImage = await canvas.loadImage(imgUrl)


  const resultsQuery = await faceapi.detectAllFaces(queryImage)
    .withFaceLandmarks()
    .withFaceDescriptors()

    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors)


  resultsQuery.map(res => {
    const bestMatch = faceMatcher.findBestMatch(res.descriptor)
    if( bestMatch.toString().includes("unknown")){
    }else{
      var current = new Date();
      let alertt=new Object();
      alertt.Criminal=bestMatch.toString()
      alertt.Date=current

      Alert.createOne(alertt)
      console.log(alertt);
    }
    return new faceapi.draw.DrawBox(res.detection.box, { label: bestMatch.toString() })
  })

  console.log('done!')

}


const loadLabeledImages =async () => {

  let labels=[];
  let response=await fetch('http://localhost:3000/criminals/')
  let result=await response.json();
  result.map(i=>labels.push(i))
 
  return Promise.all(
      labels.map(async label => {
          const descriptions = []
              var buf = Buffer.from(label.photo.data, 'utf-8');
              const img = await canvas.loadImage(buf);
              const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
              descriptions.push(detections.descriptor)

          return new faceapi.LabeledFaceDescriptors(label._id, descriptions)
      })
  )
}
