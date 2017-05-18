import React from "react";

import SideNav from './SideNav.js'; // Not used currently.

export default class HomepageBody extends React.Component {

	render() {
		return (
			<div>
				<header class="business-header">
			        <div class="container">
			            <div class="row">
			                <div class="col-lg-12">
			                    <h1 class="tagline">Yees Bees Environemental Website</h1>
			                </div>
			            </div>
			        </div>
			    </header>

			    <div class="container">

			        <hr />

			        <div class="row">
			            <div class="col-sm-8">
			                <h2>Make a difference</h2>
			                <p>There's a lot of information about global warming and what you can do.  I believe that most websites focus attention to the wrong things.  For example, its better to get a high mileage car than focus on paper vs plastic. </p>
			                <p>This website intends to use an empirical approach to the biggest difference you can make to reduce the effects of global warming.  It has tools and data sources to maximize individual effectiveness for minimal effort.</p>
			                <p>
			                    <a class="btn btn-default btn-lg" href="/solar">Find out about Solar &raquo;</a>
			                </p>
			            </div>
			            <div class="col-sm-4">
			                <h2>Don't Contact Me</h2>
			                <address>
			                    <strong>Start Bootstrap</strong>
			                    <br />3481 Melrose Place
			                    <br />Beverly Hills, CA 90210
			                    <br />
			                </address>
			                <address>
			                    <abbr title="Phone">P:</abbr>(123) 456-7890
			                    <br />
			                    <abbr title="Email">E:</abbr> <a href="mailto:#">name@example.com</a>
			                </address>
			            </div>
			        </div>

			        <hr />

			        <div class="row">
			            <div class="col-sm-4">
			                <img class="img-circle img-responsive img-center" src="homepage-background.jpeg" />
			                <h2>Solar Panel Information</h2>
			                <p>These marketing boxes are a great place to put some information. These can contain summaries of what the company does, promotional information, or anything else that is relevant to the company. These will usually be below-the-fold.</p>
			            	<a class="btn btn-default btn-sm" href="/solar">Find out about Solar &raquo;</a>
			            </div>
			            <div class="col-sm-4">
			                <img class="img-circle img-responsive img-center" src="http:error" />
			                <h2>Transportation</h2>
			                <p>The images are set to be circular and responsive. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
			            	<a class="btn btn-default btn-sm" href="/solar">Learn about Transportation &raquo;</a>
			            </div>
			            <div class="col-sm-4">
			                <img class="img-circle img-responsive img-center" src="http:error" />
			                <h2>Energy Usage</h2>
			                <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
			            	<a class="btn btn-default btn-sm" href="/solar">Learn More &raquo;</a>
			            </div>
			        </div>

			        <hr />

			        <footer>
			            <div class="row">
			                <div class="col-lg-12">
			                    <p>Copyright &copy; Your Website 2014</p>
			                </div>
			            </div>
			        </footer>

			    </div>
			</div>
		);
	}
}