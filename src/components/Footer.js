import React, { Component } from 'react'

export default class Footer extends Component {
     render() {
          return (
               <footer>
                    <div className="container">
                         <div className="row">
                              <div className="col text-center">
                                   <h2>Lorem ipsum dolor sit amet.</h2>
                                   <h3>+01850932540</h3>
                                   <div className="footer-menu">
                                        <ul>
                                             <li><a href="/">Facebook</a></li>
                                             <li><a href="/">Instagram</a></li>
                                             <li><a href="/">Twitter</a></li>
                                             <li><a href="/">Youtube</a></li>
                                        </ul>
                                   </div>
                                   <div className="copryight-text">&#169; 2021 M R Sowad. All right reserved.</div>
                              </div>
                         </div>
                    </div>  
               </footer>
          )
     }
}
