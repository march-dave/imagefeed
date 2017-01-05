import React, {Component} from 'react'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'
import superagent from 'superagent'

class Images extends Component {

  constructor() {
    super()
    this.state = {
      images: []
    }
  }

  uploadFile(files) {
    console.log('uploadFile: ')
    const image = files[0]

    // const cloudName = process.env.CLOUDNAME;
    // let uploadPreset = process.env.uploadPreset;
    const cloudName = 'drrwovgv6'

    console.log('cloudName', cloudName);

    const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'

    const timestamp = Date.now()/1000
    const uploadPreset = 'pyqns2d2'

    const paramStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'VwFJV9ezfs248HJhIHxDV2KTjjM'

    const signature = sha1(paramStr)
    const params = {
      'api_key': '126798455251844',
      'timestamp': timestamp,
      'upload_preset': uploadPreset,
      'signature': signature
    }

    let uploadRequest = superagent.post(url)
    uploadRequest.attach('file', image)

    Object.keys(params).forEach( (key) =>  {
      uploadRequest.field(key, params[key])
    })

    uploadRequest.end( (err, resp) => {
      if(err) {
        return
      }

      console.log('UPLOAD COMPLETE'+ JSON.stringify(resp.body) );
      const upload = resp.body


      let updatedImages = Object.assign([], this.state.images);
      updatedImages.push(upload)

      this.setState({
        images: updatedImages
      })
    })
  }

  imageRemove(event) {
     console.log('imageRemove', event.target.id);

     let updatedImages = Object.assign([], this.state.images);
     updatedImages.splice(event.target.id, 1)

     this.setState({
       images: updatedImages
     })
   }

  render() {

    const list = this.state.images.map( (image, i) => {
      return (
        <li key={i} onClick={this.imageRemove.bind(this) } >
          <img style={{width: 72}} src={image.secure_url} />

          <a id={i} onClick={this.imageRemove.bind(this)} href="#">remove </a>


        </li>
      )
    })


    return(
      <div>
        Image Component
        <Dropzone onDrop={this.uploadFile.bind(this)} />

        <ol>
            {list}
        </ol>



      </div>

    );
  }
}

export default Images
