const image_input = document.querySelector("#image_input");
let uploaded_image;
let receivedImage;

let socket = io.connect("http://localhost:3021");
socket.on("imagemessage", decodeReceived);

function decodeReceived(data) {
  const img = new Image();
  img.src = `${data.file}`;
  document.body.appendChild(img); //add image to client. works now
  document.querySelector("#pic").style.backgroundImage = img; // replace image. NOT WORKING YET
}

//

// let bytes = new Uint8Array(arrayBuffer);
// var blob = new Blob([bytes.buffer]);
// let image = new Image();
// let reader = new FileReader();
// reader.onload = function (e) {
//   image.src = e.target.result;
//   document.body.appendChild(image);
// };
// reader.re

// let blob = new Blob([data.file], { type: "image/png" });
// const reader = new FileReader();

// reader.onloadend = function () {
//   receivedImage = reader.result;
//   console.log(receivedImage); // this happens now after append is truggered
//   show_image();
// };
//reader.readAsDataURL(blob);
//reader.readAsDataURL(arrayBuffer);

// function show_image() {
//   console.log("append triggered");
//   let image = new Image();
//   image.src = receivedImage;
//   document.body.appendChild(image);
// }

image_input.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_image = reader.result; // convert image file to base64 string
    document.querySelector(
      "#pic"
    ).style.backgroundImage = `url(${uploaded_image})`; // show image
    let data = {
      text: "Data coming",
      file: uploaded_image,
    };
    socket.emit("imagemessage", data);
  });

  reader.readAsDataURL(this.files[0]); // read as file
});

//next steps: 1)with websockets, make everyone see the updated picture
//2)make the previous image always 50% in opacity - results in layers of images
