import React, { Component } from 'react'
import axios from 'axios'



export default class LatestPhotos extends Component {

     state = {
          photos: [],
          page: 1,
          loading: true,
          search_query: '',
          searching: false,
     }

     componentDidMount() {
          axios.get('https://api.unsplash.com/photos/?client_id=15ma5MoATuSxyKoRUwxNrqej2CAqXjsM4o2wDI5dokU&per_page=16&page=' + this.state.page).then(
               res => this.setState({
                    photos: res.data,
                    loading: false,
                    page: this.state.page + 1
               })
          )

          window.scrollTo(0, 0)
     }

     loadNextPage = (e) => {

          axios.get('https://api.unsplash.com/photos/?client_id=15ma5MoATuSxyKoRUwxNrqej2CAqXjsM4o2wDI5dokU&per_page=16&page=' + this.state.page).then(
               res => this.setState({
                    photos: res.data,
                    loading: false,
                    page: this.state.page + 1
               })
          )

          window.scrollTo(0, 0)
     }

     searchQuery = (e) => {
          this.setState({
               search_query: e.target.value
          })
     }

     searchTrigger = (e) => {

          axios.get('https://api.unsplash.com/search/photos/?client_id=15ma5MoATuSxyKoRUwxNrqej2CAqXjsM4o2wDI5dokU&query=' + this.state.search_query + '&per_page=16&page=' + this.state.page).then(
               res => this.setState({
                    photos: res.data.results,
                    loading: false,
                    page: 1,
                    searching: true,
                    total_found: res.data.total,
                    total_found_pages: res.data.total_pages
               })
          )
          e.preventDefault();
     }

     loadNextSearchPage = (e) => {

          axios.get('https://api.unsplash.com/search/photos/?client_id=15ma5MoATuSxyKoRUwxNrqej2CAqXjsM4o2wDI5dokU&query=' + this.state.search_query + '&per_page=16&page=' + this.state.page).then(
               res => this.setState({
                    photos: res.data.results,
                    loading: false,
                    page: this.state.page + 1,
                    searching: true,
                    total_found: res.data.total,
                    total_found_pages: res.data.total_pages
               })
          )

          window.scrollTo(0, 0)
     }


     render() {

          var searchHeading = '';
          var searchBtnMarkup = '';
          var searchInfo = '';
          if(this.state.searching === true) {
               searchHeading = <h2>You search <i>{this.state.search_query}</i></h2>
               searchBtnMarkup = <button onClick={this.loadNextSearchPage}>Load Page {this.state.page}</button>
               searchInfo = <span>Total found {this.state.total_found} | Pages {this.state.page -1} 0f {this.state.total_found_pages}</span>
          } else {
               searchHeading = <h2>Latest Photos</h2>
               searchBtnMarkup = <button onClick={this.loadNextPage}>Load Page {this.state.page}</button>
               searchInfo = ''
          }

          if(this.state.loading === true) {
               return (
                    <div className="row text-center"><div className="col">Loading</div></div>
               )
          }

          return (
               <React.Fragment>

                    <div className="row top-heading">
                         <div className="col my-auto">
                              {searchHeading} {searchInfo}
                         </div>
                         <div className="col col-auto my-auto">
                              <form onSubmit={this.searchTrigger} action="">
                                   <input type="text" value={this.state.search_query} onChange={this.searchQuery} placeholder="Search"/>
                                   <input type="submit" value="search"/>
                              </form>
                         </div>
                    </div>
                    <div className="row">
                    


                    {
                         this.state.photos.map((photo) => (
                              <div key={photo.id} className="col-lg-3">
                                   <div className="single-photo-item">
                                        <a className="d-block" href={'photo?id=' + photo.id}>
                                             <div className="photo-wrapper">
                                                  <img src={photo.urls.small} alt={photo.description}/>
                                             </div>
                                             <h5>{photo.description}</h5>
                                             <p className="cat-name">By - {photo.user.first_name} {photo.user.last_name}</p>
                                        </a>
                                   </div>
                              </div>
                         ))
                    }

                    </div>

                    <div className="row">
                         <div className="col-lg-12 text-center">
                              <div className="load-more-btn">{searchBtnMarkup}</div>
                         </div>
                    </div>
               </React.Fragment>
          )


          
          
     }
}
