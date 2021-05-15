import React, { Component } from 'react'
import axios from 'axios'

export default class Photo extends Component {

     state = {
          photo: [],
          loading: true,
     }

     componentDidMount() {
          let search = window.location.search;
          let params = new URLSearchParams(search);
          let photo_id = params.get('id');

           axios.get('https://api.unsplash.com/photos/' + photo_id + '/?client_id=15ma5MoATuSxyKoRUwxNrqej2CAqXjsM4o2wDI5dokU').then(
               res => this.setState({
                    photo: res.data,
                    loading: false,
               })
          )
     }

     render() {
          console.log(this.state.photo);
          var Photo = this.state.photo
          return (
               <div>
                    {Photo.description ? <h2>{Photo.description}</h2> : ''}  
                    <div className="photo-single-wrapper">
                         <div className="photo-single-info">
                              <ul>
                                   <li><label htmlFor="uploaded_by">Uploaded_by:</label> {Photo.user && Photo.user.first_name} {Photo.user && Photo.user.last_name}</li>

                                   {Photo.updated_at ? <li><label htmlFor="upload_date">Upload date:</label> {Photo.updated_at}</li> : ''}

                                   <li><label htmlFor="camera_model">Camera model:</label> {Photo.exif && Photo.exif.model}</li>
                              </ul> 

                              <a href={Photo.links && Photo.links.download} download>Download</a>   
                         </div>
                         <img src={Photo.urls && Photo.urls.full} alt="" />
                    </div>
               </div>
          )
     }
}
