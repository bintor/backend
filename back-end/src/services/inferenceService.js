const tf = require('@tensorflow/tfjs-node');
 
async function predictClassification(model, image) {
  const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat()
 
  const prediction = model.predict(tensor);
  const score = await prediction.data();
  const probability = score[0];
  const label = probability > 0.5 ? 'Cancer' : 'Non-cancer';

  if (label === 'Cancer') {
    suggestion = "Segera periksa ke dokter!"
  }

  if (label === 'Non-cancer') {
    suggestion = "Penyakit kanker tidak terdeteksi."
  }

  return { label, suggestion };
}

module.exports = predictClassification;