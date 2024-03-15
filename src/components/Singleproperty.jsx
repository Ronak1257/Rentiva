import React from 'react'

const Singleproperty = ({property}) => {
    // console.log(property.property[7]);
    // console.log('hello');
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Image Section */}
      <div className="flex flex-col md:flex-row items-center md:items-center">
        <div className="w-full md:w-1/2 md:mr-8 mb-6 md:mb-0">
          <img
            src={property[7]}
            className="w-96 h-auto rounded-xl shadow-xl"
            alt="Property"
          />
        </div>
        <div className="w-full md:w-1/2">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Property Information
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-2">
              <span className="font-semibold">Owner Address:</span>{" "}
              <p>{property[1]}</p>
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-2">
              <span className="font-semibold">Title:</span> {property[6]}
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-2">
              <span className="font-semibold">Property Number:</span> {Number(property[0])}
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-2">
              <span className="font-semibold">Property Price:</span>{Number(property[3])/1000000000000000000} ETH
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-2">
              <span className="font-semibold">Available For Lease:</span> {Number(property[5])} seconds
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-2">
              <span className="font-semibold">Location:</span>{property[8]}
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-2">
              <span className="font-semibold">Description:</span> {property[9]}
            </p>
          </div>
        </div>
      </div>
      {/* Lease Now Button */}
      {/* Additional Content Section - User Reviews */}
      <div className="w-full mt-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          User Reviews
        </h2>
        <div className="bg-gray-200 shadow-xl rounded-xl p-4 mb-4">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-gray-300 h-12 w-12 flex items-center justify-center">
              <img
                src="https://via.placeholder.com/150"
                alt="User"
                className="rounded-full"
              />
            </div>
            <div className="ml-4">
              <p className="text-lg font-semibold">0x9F658B8AC3f3232bc763f32FaCFe40B246B9b9Ad</p>
              <p className="text-gray-600">Verified Buyer</p>
            </div>
          </div>
          <p className="text-gray-700">
            I had stayed there for 2 months and it was amazing experience and
            truly this new way of leasing properties is amazing and
            revolutionary.
          </p>
        </div>
      </div>
    </main>
  )
}

export default Singleproperty