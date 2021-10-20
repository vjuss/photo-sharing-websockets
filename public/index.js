const image_input = document.querySelector("#image_input");
let uploaded_image;
let receivedImage;

let socket = io.connect("http://localhost:3021");
socket.on("imagemessage", showReceived);

function showReceived(data) {
  console.log("Receiving image from server");
  document.querySelector("#pic").style.backgroundImage = `url(${data.file})`;
  //reader.result=uploaded_image=data.file, all the same - this is now similar to url in load function
}

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
