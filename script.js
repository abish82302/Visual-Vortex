/* =========================================
   SCROLL
========================================= */

function scrollToPrediction(){

  document
    .getElementById("predict")
    .scrollIntoView({
      behavior:"smooth"
    });

}

/* =========================================
   AI DISEASE DATABASE
========================================= */

const diseases = [

  {
    name:"Heart Disease",

    symptoms:[
      "heart",
      "chest pain",
      "breathing",
      "fatigue"
    ],

    risk:84,

    severity:"High",

    type:"Lifestyle & Environmental",

    hospital:
      "Tribhuvan University Teaching Hospital",

    treatment:
      "Cardiology consultation recommended."
  },

  {
    name:"Diabetes",

    symptoms:[
      "sugar",
      "thirst",
      "urination"
    ],

    risk:72,

    severity:"Medium",

    type:"Lifestyle Disease",

    hospital:
      "B.P. Koirala Institute of Health Sciences",

    treatment:
      "Blood sugar monitoring required."
  },

  {
    name:"Cancer Risk",

    symptoms:[
      "tumor",
      "blood",
      "lump",
      "cancer"
    ],

    risk:91,

    severity:"Critical",

    type:"Genetic & Environmental",

    hospital:
      "Grande International Hospital",

    treatment:
      "Immediate oncology screening required."
  },

  {
    name:"Alzheimer's Disease",

    symptoms:[
      "memory loss",
      "forget",
      "confusion"
    ],

    risk:67,

    severity:"Medium",

    type:"Neurological & Genetic",

    hospital:
      "Bir Hospital",

    treatment:
      "Neurology consultation recommended."
  },

  {
    name:"Genetic Blood Disorder",

    symptoms:[
      "genetic",
      "anemia",
      "blood disorder",
      "weakness"
    ],

    risk:79,

    severity:"High",

    type:"Hereditary Genetic Disorder",

    hospital:
      "Norvic International Hospital",

    treatment:
      "Genetic mutation screening required."
  }

];

/* =========================================
   AI PREDICTION
========================================= */

function predictDisease(){

  let symptoms =
    document
      .getElementById("symptoms")
      .value
      .toLowerCase();

  let matchedDisease = null;

  diseases.forEach(disease=>{

    disease.symptoms.forEach(symptom=>{

      if(symptoms.includes(symptom)){

        matchedDisease = disease;

      }

    });

  });

  if(!matchedDisease){

    matchedDisease = {

      name:"Unknown Condition",

      risk:30,

      severity:"Low",

      type:"Unidentified",

      hospital:
        "Nearest General Hospital",

      treatment:
        "Further medical tests recommended."

    };

  }

  document.getElementById(
    "diseaseResult"
  ).innerHTML =

    `
    🧬 Predicted Disease:
    ${matchedDisease.name}

    <br><br>

    🧪 Disease Type:
    ${matchedDisease.type}

    <br><br>

    🏥 Suggested Hospital:
    ${matchedDisease.hospital}
    `;

  document.getElementById(
    "risk"
  ).innerHTML =

    `
    ⚠ Risk Percentage:
    ${matchedDisease.risk}%
    `;

  document.getElementById(
    "treatment"
  ).innerHTML =

    `
    💊 Suggested Treatment:
    ${matchedDisease.treatment}
    `;

  createChart(
    matchedDisease.risk
  );

  createSeverityMeter(
    matchedDisease.severity
  );

}

/* =========================================
   CHART
========================================= */

let diseaseChart;

function createChart(risk){

  const ctx =
    document.getElementById(
      "diseaseChart"
    );

  if(diseaseChart){
    diseaseChart.destroy();
  }

  diseaseChart = new Chart(ctx,{

    type:"radar",

    data:{

      labels:[
        "Genetics",
        "Symptoms",
        "Lifestyle",
        "History",
        "Environment"
      ],

      datasets:[{

        label:
          "Disease Probability",

        data:[
          risk-10,
          risk,
          risk-15,
          risk-5,
          risk-20
        ],

        borderWidth:3

      }]

    },

    options:{
      responsive:true
    }

  });

}

/* =========================================
   SEVERITY
========================================= */

function createSeverityMeter(level){

  let meter =
    document.getElementById(
      "severityMeter"
    );

  if(!meter){

    meter =
      document.createElement("div");

    meter.id =
      "severityMeter";

    document
      .querySelector(".results")
      .appendChild(meter);

  }

  meter.innerHTML =
    "🚨 Severity Level: "
    + level;

  if(level==="Critical"){
    meter.style.color="red";
  }

  else if(level==="High"){
    meter.style.color="orange";
  }

  else{
    meter.style.color="yellow";
  }

}

/* =========================================
   CHATBOT
========================================= */

function sendMessage(){

  let input =
    document
      .getElementById("userInput")
      .value
      .toLowerCase();

  let chatBox =
    document.getElementById(
      "chatBox"
    );

  let userDiv =
    document.createElement("div");

  userDiv.className =
    "user";

  userDiv.innerHTML =
    input;

  chatBox.appendChild(userDiv);

  let botDiv =
    document.createElement("div");

  botDiv.className =
    "bot";

  let reply =
    "Please consult a healthcare professional.";

  if(input.includes("heart")){

    reply =
      "🫀 Possible heart-related symptoms detected.";

  }

  else if(
    input.includes("cancer")
  ){

    reply =
      "🧬 Oncology screening recommended.";

  }

  else if(
    input.includes("dna")
  ){

    reply =
      "🧬 DNA analysis can identify hereditary disease risks.";

  }

  else if(
    input.includes("emergency")
  ){

    reply =
      "🚨 Emergency detected. Accessing nearby hospitals.";

      findNearestHospital();

  }

  botDiv.innerHTML =
    reply;

  chatBox.appendChild(botDiv);

  chatBox.scrollTop =
    chatBox.scrollHeight;

  speak(reply);

  document.getElementById(
    "userInput"
  ).value = "";

}



   
/* =========================================
   LIVE MAP SYSTEM
========================================= */

const nepalHospitals = [

  {
    lat:27.7351,
    lng:85.3303,
    type:"Cardiology"
  },

  {
    lat:27.7423,
    lng:85.3375,
    type:"Oncology"
  },

  {
    lat:27.7049,
    lng:85.3132,
    type:"Neurology"
  },

  {
    lat:27.7154,
    lng:85.3175,
    type:"Genetics"
  },

  {
    lat:26.8128,
    lng:87.2833,
    type:"General"
  },

  {
    lat:28.2096,
    lng:83.9856,
    type:"Emergency"
  }

];

let map;

/* LOCATION ACCESS */

function findNearestHospital(){

  const status =
    document.getElementById(
      "locationStatus"
    );

  status.innerHTML =
    "📡 Accessing your live location...";

  if(navigator.geolocation){

    navigator.geolocation.getCurrentPosition(

      function(position){

        const userLat =
          position.coords.latitude;

        const userLng =
          position.coords.longitude;

        status.innerHTML =
          "✅ Live location detected";

        initializeMap(
          userLat,
          userLng
        );

      },

      function(error){

        status.innerHTML =
          "❌ Please allow location access.";

      }

    );

  }

  else{

    status.innerHTML =
      "❌ Geolocation not supported.";

  }

}

/* INITIALIZE MAP */

function initializeMap(
  userLat,
  userLng
){

  if(map){
    map.remove();
  }

  map =
    L.map("hospitalMap")
    .setView(
      [userLat,userLng],
      10
    );

  L.tileLayer(

    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

    {
      attribution:
        "GeneVision AI"
    }

  ).addTo(map);

  /* USER */

  L.marker(
    [userLat,userLng]
  )

  .addTo(map)

  .bindPopup(
    "📍 Your Current Location"
  )

  .openPopup();

  /* HOSPITALS */

  nepalHospitals.forEach(
    hospital=>{

      L.circleMarker(

        [
          hospital.lat,
          hospital.lng
        ],

        {
          radius:10,
          color:"#00ffff",
          fillColor:"#00ffff",
          fillOpacity:0.8
        }

      )

      .addTo(map)

      .bindPopup(

        `
        🏥 AI Healthcare Center<br>
        🧬 Department:
        ${hospital.type}
        `

      );

    }

  );

}

/* =========================================
   3D DNA
========================================= */

const scene =
  new THREE.Scene();

const camera =
  new THREE.PerspectiveCamera(
    75,
    500/500,
    0.1,
    1000
  );

const renderer =
  new THREE.WebGLRenderer({
    alpha:true
  });

renderer.setSize(500,500);

document
  .getElementById(
    "dnaCanvas"
  )
  .appendChild(
    renderer.domElement
  );

const light =
  new THREE.PointLight(
    0x00ffff,
    2
  );

light.position.set(
  10,
  10,
  10
);

scene.add(light);

const geometry =
  new THREE.TorusKnotGeometry(
    10,
    3,
    200,
    32
  );

const material =
  new THREE.MeshStandardMaterial({

    color:0x00ffff,

    wireframe:true

  });

const dna =
  new THREE.Mesh(
    geometry,
    material
  );

scene.add(dna);

camera.position.z = 30;

/* PARTICLES */

const particlesGeometry =
  new THREE.BufferGeometry();

const particlesCount =
  1000;

const posArray =
  new Float32Array(
    particlesCount*3
  );

for(
  let i=0;
  i<particlesCount*3;
  i++
){

  posArray[i] =
    (Math.random()-0.5)
    *100;

}

particlesGeometry.setAttribute(

  "position",

  new THREE.BufferAttribute(
    posArray,
    3
  )

);

const particlesMaterial =
  new THREE.PointsMaterial({
    size:0.2
  });

const particlesMesh =
  new THREE.Points(
    particlesGeometry,
    particlesMaterial
  );

scene.add(
  particlesMesh
);

/* ANIMATION */

function animate(){

  requestAnimationFrame(
    animate
  );

  dna.rotation.x += 0.01;

  dna.rotation.y += 0.01;

  particlesMesh.rotation.y +=
    0.001;

  renderer.render(
    scene,
    camera
  );

}

animate();

/* =========================================
   AUTO LOCATION
========================================= */

window.onload = function(){

  findNearestHospital();

};