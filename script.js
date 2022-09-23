// Modules
const sha256 = require("sha256");

// Default Values
let blockIndex = 1;
let validity = true; // TODO

const startHash = document.getElementById("prev-hash" + blockIndex.toString());
const char = "0";
startHash.value = `${char.repeat(64)}`;

// hashBlock Function
hashBlock = function (previousBlockHash, currentBlockData, nonce) {
  let aggregated_data = previousBlockHash + nonce.toString() + currentBlockData;
  let hash = sha256(aggregated_data);
  return hash;
};

// getNonce Function
getNonce = function (previousBlockHash, currentBlockData) {
  let nonce = 0;
  let hash = hashBlock(previousBlockHash, currentBlockData, nonce);

  while (hash.substring(0, 2) !== "00") {
    nonce++;
    hash = hashBlock(previousBlockHash, currentBlockData, nonce);
  }

  return nonce;
};

// Container
const container_elem = document.querySelector(".container");

// Validity
let validity_elem = document.querySelector(".status");

// Hash Button
hash = function () {
  const node_hash_elem = document.getElementById(
    "hash-field" + blockIndex.toString()
  );
  const data_value = document.getElementById(
    "data" + blockIndex.toString()
  ).value;
  const nonce_value = document.getElementById(
    "nonce" + blockIndex.toString()
  ).value;
  const prev_hash_value = document.getElementById(
    "prev-hash" + blockIndex.toString()
  ).value;
  node_hash_elem.value = hashBlock(prev_hash_value, data_value, nonce_value);
};

// Mine Button
mine = function () {
  const data_value = document.getElementById(
    "data" + blockIndex.toString()
  ).value;
  const prev_hash_value = document.getElementById(
    "prev-hash" + blockIndex.toString()
  ).value;

  const nonce_elem = document.getElementById("nonce" + blockIndex.toString());
  nonce_elem.value = getNonce(prev_hash_value, data_value);
};

// Gen Button
let gen_button = document.querySelector(".btn--gen");

generate = function () {
  const card_elem = document.querySelector(".card:last-child");
  // prepare next card
  let new_card = card_elem.cloneNode(true);
  new_card.childNodes[1].innerHTML = `Block ${blockIndex + 1}`;
  blockIndex++;
  transferHash = new_card.childNodes[3].childNodes[7].childNodes[3].value;
  new_card.childNodes[3].childNodes[1].childNodes[3].value = "";
  new_card.childNodes[3].childNodes[1].childNodes[3].id =
    "data" + blockIndex.toString();
  new_card.childNodes[3].childNodes[3].childNodes[3].value = "";
  new_card.childNodes[3].childNodes[3].childNodes[3].id =
    "nonce" + blockIndex.toString();
  new_card.childNodes[3].childNodes[7].childNodes[3].value = "";
  new_card.childNodes[3].childNodes[7].childNodes[3].id =
    "hash-field" + blockIndex.toString();
  new_card.childNodes[3].childNodes[5].childNodes[3].value = transferHash;
  new_card.childNodes[3].childNodes[5].childNodes[3].id =
    "prev-hash" + blockIndex.toString();
  // add next card
  if (validity) {
    container_elem.appendChild(new_card);
  } else {
    alert("Invalid Block");
  }
};
