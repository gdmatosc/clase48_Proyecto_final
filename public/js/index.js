const input1 = document.getElementById('input1')
const input2 = document.getElementById('input2')
const uploadImg = document.getElementById('upload')
const uploadText = document.getElementById('myBtn')
const textShow = document.getElementById('textShow')
const imgShow = document.getElementById('imgShow')
const status = document.getElementById('status')

console.log('[3.front.js](msg)(inicio)')

function cargarImagenPerfil(){
  try {
    let html=`<img src='/imgUser/avatar1.png' onerror="if (this.src != '/imgUser/avatarDefault.jpg') this.src = '/imgUser/avatarDefault.jpg';" style='width:40px; height:30px;'>`
    html+=`<br><small>
          <pre>
            Luego de subir la imagen 
            actualice a página
          </pre></small>`
    document.getElementById('imgPreview').innerHTML=html
  }catch(e){
    console.log("[JSindex.js](msg) error: ",e)
  }
}

function GoBackWithRefresh(event) {
  if ('referrer' in document) {
      window.location = document.referrer;
      
  } else {
      window.history.back();
  }
}


