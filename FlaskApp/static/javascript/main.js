console.log("Inside js file");
function readURL(input) {
if (input.files && input.files[0]) {

var reader = new FileReader();

reader.onload = function(e) {
  $('.image-upload-wrap').hide();

  $('.file-upload-image').attr('src', e.target.result);
  $('.file-upload-content').show();

  $('.image-title').html(input.files[0].name);

};

reader.readAsDataURL(input.files[0]);

} else {
removeUpload();
}
}

function removeUpload() {
$('.file-upload-input').replaceWith($('.file-upload-input').clone());
$('.file-upload-content').hide();
$('.image-upload-wrap').show();
//document.getElementById("result").innerHTML = " ";
}
$('.image-upload-wrap').bind('dragover', function () {
$('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
$('.image-upload-wrap').removeClass('image-dropping');
});

const myForm = document.getElementById("myForm");
const inpImg  = document.getElementById("upload")


myForm.addEventListener("submit", e =>{
e.preventDefault();
//document.getElementById("result").innerHTML = '<p style="margin: 0; color: white; visibility: hidden;" id="result"><img src="/static/resources/loading.svg" alt="" style="width: 35px;background: white; border-radius: 51%; "> Photo Uploaded...Processing...</p>'
document.getElementById("result").style.visibility = "visible"
const endpoint = "/upload";
formData = new FormData();
formData.append('img', inpImg.files[0]);

console.log(inpImg.files[0]);


  fetch(endpoint, {
  method: "post",
  body: formData
}).then(
  response => response.json()
).then(
    (data) => {
        console.log(data)
        document.getElementById("result").style.fontSize = "20px"
        document.getElementById("result").style.fontWeight = "Bold"
        document.getElementById("result").style.color = "Red"
        document.getElementById("result").innerHTML = data["result"]
    }
);

});
