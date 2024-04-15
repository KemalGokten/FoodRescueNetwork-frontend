
 import { useEffect } from 'react';
import {Carousels} from './Carousels.jsx'
 
const AllRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);

   
    useEffect (() => {
        const getRestaurants = async () => {
            try {
                
            } catch (error) {
                console.log
            }

        }



    },[]);
    return ( 
        <Carousels/>


     );
}
 
export default AllRestaurants;