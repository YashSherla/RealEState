import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
interface FilterModelProps {
   isOpen:boolean;
   onClose:()=> void;
   handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
   sidebardata:any
   handleSubmit:() => void;
   
}
export const FilterModel: React.FC<FilterModelProps> = ({ isOpen, onClose , handleChange , sidebardata , handleSubmit}) => {
   const [isMoible , setIsMobile] = useState(window.innerWidth < 1024) 
   useEffect(()=>{
      const handleResize = () =>{
         setIsMobile(window.innerWidth < 1024)
      }
      window.addEventListener('resize',handleResize)
      return () =>{
         window.removeEventListener('resize',handleResize);
      }
   },[])
   if (!isMoible) return null;
   return (
   <div>
      <button onClick={onClose} className="mt-6"><FaFilter className="text-xl text-blue-500"></FaFilter></button>
      <div
      className={`fixed inset-x-0 bottom-0 transition-transform transform bg-white shadow-lg border-2 p-4 space-y-4 rounded-2xl ${
      isOpen ? 'translate-y-0 duration-500' : 'translate-y-full duration-500'}`}
      >
         <div className="flex justify-between">
            <p className="font-bold">Filters</p>
            <button className="text-blue-500" onClick={onClose}>Close</button>
         </div>
         <hr />
         <div className="flex">
            <label htmlFor="" className="text-slate-700">Search Term:</label>
            <input type="text" className=" bg-slate-100 border border-gray-300 rounded-md w-full p-3" id="searchTerm"
             value={sidebardata.searchTerm} 
             onChange={handleChange}
            />
         </div>
         <div className=" gap-2">
            <p>Type:</p>
            <div className='flex gap-2'>
               <input
               type='checkbox'
               id='all'
               className='w-5'
               onChange={handleChange}
               checked={sidebardata.type === 'all'}
               />
               <span>Rent & Sale</span>
            </div>
            <div className='flex gap-2'>
               <input
               type='checkbox'
               id='rent'
               className='w-5'
               onChange={handleChange}
               checked={sidebardata.type === 'rent'}
               />
               <span>Rent</span>
            </div>
            <div className='flex gap-2'>
               <input
               type='checkbox'
               id='sale'
               className='w-5'
               onChange={handleChange}
               checked={sidebardata.type === 'sale'}
               />
               <span>Sale</span>
            </div>
            <div className='flex gap-2'>
               <input
               type='checkbox'
               id='offer'
               className='w-5'
               onChange={handleChange}
               checked={sidebardata.offer}
               />
               <span>Offer</span>
            </div>
         </div>
         <div className="flex gap-2">
            <p>Amenities:</p>
            <div className='flex gap-2'>
               <input
               type='checkbox'
               id='parking'
               className='w-5'
               onChange={handleChange}
               checked={sidebardata.parking}
               />
               <span>Parking</span>
            </div>
            <div className='flex gap-2'>
               <input
               type='checkbox'
               id='furnished'
               className='w-5'
               onChange={handleChange}
               checked={sidebardata.furnished}
               />
               <span>Furnished</span>
            </div>
         </div>
         <div className="flex gap-2 items-center">
            <label>Sort:</label>
               <select 
               id="sort_order"
               className="bg-slate-100 border border-gray-300 rounded-md p-3"
               defaultValue={'createdAt_desc'}
               onChange={handleChange}
               >
                  <option value="createdAt_desc">Latest</option>
                  <option value="regularPrice_desc">Price high to low</option>
                  <option value="regularPrice_asc">Price low to high</option>
                  <option value="createdAt_asc">Oldest</option>
               </select>
         </div>
         <div className="space-y-2">
            <button 
            className="bg-blue-950 text-white rounded-md p-3 w-full" 
            onClick={handleSubmit}
            >Search</button>
         </div>
      </div>
   </div>  )
};



