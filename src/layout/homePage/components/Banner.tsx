import React from "react";

function Banner(){
    return(
        <div className="p-1 mb-4 bg-dark">
            <div className="container-fluid py-2 text-white d-flex justify-content-center align-items-center">
            <div>
				<h3
					className='banner-text display-5 fw-bold'
				>
					A room without books is like a body without a soul.
				</h3>
				<p className=''>-- Marcus Tullius Cicero --</p>
					<button className='btn btn-primary btn-lg text-white float-endf'>
						Khám phá ngay
					</button>

			</div>
            </div>
        </div>
    )
}

export default Banner;