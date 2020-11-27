const icon = document.querySelector('.icon');
const on = document.querySelector('.fas.fa-video');
const off = document.querySelector('.fas.fa-video-slash');
const camera = document.querySelector('.camera');
const name = document.querySelector('.name');
const percent = document.querySelector('.percent');
const description = document.querySelector('.description');

const URL = './model/';

let model, webcam, maxPredictions;

icon.addEventListener('click', async () => {
  on.classList.toggle('invisible');
  off.classList.toggle('invisible');

  if (on.classList.length === 2) {
    await webcam.pause();
  } else {
    await webcam.play();
    window.requestAnimationFrame(loop);
  }
});

async function init() {
  const modelURL = URL + 'model.json';
  const metadataURL = URL + 'metadata.json';

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  const flip = true;
  webcam = new tmImage.Webcam(380, 380, flip);
  await webcam.setup();

  camera.appendChild(webcam.canvas);
}

async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

init();

async function predict() {
  const prediction = await model.predict(webcam.canvas);

  for (let i = 0; i < maxPredictions; i++) {
    const className = prediction[i].className;
    const probability = prediction[i].probability.toFixed(2) * 100;

    const data = {
      None: '아무도 없군요...',
      김고은: '김고은을 닮으셨군요!',
      하정우: '하정우를 닮으셨군요!',
      육성재: '육성재를 닮으셨군요!',
      박보영: '박보영을 닮으셨군요!',
      수지: '수지를 닮으셨군요!',
      양세형: '양세형을 닮으셨군요!',
      이수근: '이수근을 닮으셨군요!',
      아이유: '아이유를 닮으셨군요!',
      김희철: '김희철을 닮으셨군요!'
    };

    if (probability >= 75) {
      if (name.innerHTML !== className) {
        name.innerHTML = className;
        description.innerHTML = data[className];
      }

      if (percent.innerHTML !== probability + '%') {
        percent.innerHTML = probability + '%';
      }
    }
  }
}
