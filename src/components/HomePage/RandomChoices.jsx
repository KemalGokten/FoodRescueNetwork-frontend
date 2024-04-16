
import {Carousels} from './Carousels.jsx'
const RandomChoices = ({restaurants}) => {
    return (
        <>
          <h3>Randomly Selected Restaurants : </h3>
          <Carousels restaurantsData={restaurants} />
        </>
      );
}
 
export default RandomChoices ;