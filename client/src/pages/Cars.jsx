import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const Cars = () => {

  // Getting search params from URL
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('pickupLocation');
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');

  const { cars, axios } = useAppContext();
  const [input, setInput] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);
  const isSearchData = pickupLocation && pickupDate && returnDate;

  // 🔍 Apply Filter
  const applyFilter = async () => {
    if (!cars || cars.length === 0) return;

    if (input.trim() === '') {
      setFilteredCars(cars);
      return;
    }

    const filtered = cars
      ?.slice()
      .filter((car) => {
        if (!car) return false; // null check
        return (
          car.brand?.toLowerCase().includes(input.toLowerCase()) ||
          car.model?.toLowerCase().includes(input.toLowerCase()) ||
          car.category?.toLowerCase().includes(input.toLowerCase()) ||
          car.transmission?.toLowerCase().includes(input.toLowerCase())
        );
      });

    setFilteredCars(filtered || []);
  };

  // 🚗 Search Car Availability from backend
  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post('/api/bookings/check-availability', {
        location: pickupLocation,
        pickupDate,
        returnDate
      });

      if (data.success) {
        setFilteredCars(data.availableCars || []);
        if (data.availableCars?.length === 0) {
          toast('No cars available');
        }
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
      toast.error('Failed to check availability');
    }
  };

  // Run search availability when search data present
  useEffect(() => {
    if (isSearchData) searchCarAvailability();
  }, []);

  // Apply filter whenever input or cars change
  useEffect(() => {
    if (cars?.length > 0 && !isSearchData) applyFilter();
  }, [input, cars]);

  return (
    <div>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex flex-col items-center py-20 bg-light max-md:px-4'
      >
        <Title
          title='Available Cars'
          subTitle='Browse our selection of premium vehicles available for your next adventure'
        />

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'
        >
          <img src={assets.search_icon} alt="search_icon" className='w-4.5 h-4.5 mr-2' />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder='Search by make, model, or features'
            className='w-full h-full outline-none text-gray-500'
          />
          <img src={assets.filter_icon} alt="filter_icon" className='w-4.5 h-4.5 ml-2' />
        </motion.div>
      </motion.div>

      {/* Cars List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'
      >
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>
          Showing {filteredCars?.length || 0} Cars
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredCars?.length > 0 ? (
            filteredCars.map((car, index) =>
              car ? (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <CarCard car={car} />
                </motion.div>
              ) : null
            )
          ) : (
            <p className='text-center text-gray-500 col-span-3 mt-10'>
              No cars available
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Cars;
