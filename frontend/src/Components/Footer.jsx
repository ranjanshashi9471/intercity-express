export default function Footer() {
	return (
		<div className="row">
			{/* <div class="bg-dark bg-opacity-80 text-light">
        <div class="fluid-container upper-footer">
          <div class="row pt-3 px-auto">
            <div class="col-md-3 mx-auto">
              <h6 class="footer-heading">ABOUT US</h6>
              <p class="mt-4">
                <span className="text-warning">
                  Intercity Express Trains (IET){" "}
                </span>
                is a new company building its customer base providing best
                facilities to its passengers.
              </p>
              <p class="mt-2 pt-3">
                <img width={"50"} src={logo} alt="logo" />
              </p>
            </div>
            <div class="col-md-3 mx-auto">
              <h6 class="footer-heading mb-4">MENU</h6>
              <ul class="ps-0 list-unstyled">
                <li class="mb-1">
                  <a class="nav-link">Home</a>
                </li>
                <li class="mb-1">
                  <a class="nav-link">About</a>
                </li>
                <li class="mb-1">
                  <a class="nav-link">Our Services</a>
                </li>
                <li class="mb-1">
                  <a class="nav-link">Our Products</a>
                </li>
                <li class="mb-1">
                  <a class="nav-link">Careers</a>
                </li>
                <li class="mb-1">
                  <a class="nav-link">Contact</a>
                </li>
              </ul>
            </div>
            <div class="col-md-3 mx-auto">
              <h6 class="footer-heading mb-4">CONTACT US</h6>
              <strong class="text-warning">
                <p class="mb-0">INTERCITY EXPRESS TRAINS</p>
                <p>TICKETING SYSTEM</p>
              </strong>
              <p class="mb-1">Bandra</p>
              <p class="mb-1">Mumbai, Maharshtra, INDIA</p>
              <p class="mb-1">Phone: +91 7244455881</p>
              <p>
                e-mail:{" "}
                <a href="mailto:sales@process.ae?cc=info@process.ae">
                  sales@iet.com
                </a>
              </p>
            </div>
            <div class="col-md-3 ms-auto my-auto">
              <img width={"110"} src={logo} alt="logo" />
            </div>
          </div>
        </div>
      </div> */}
			<div class="fixed-bottom bg-light-subtle p-2">
				<div class="text-center">
					© COPYRIGHT {new Date().getFullYear()} "INTERCITY EXPRESS TRAINS" BY{" "}
					<span class="text-warning">DBMS PROJECT GROUP-13</span> ALL RIGHTS
					RESERVED.
				</div>
			</div>
		</div>
	);
}
