
import {Carousels} from './Carousels.jsx'
const RandomChoices = ({restaurants}) => {
    return (
        <>
          <h3 style={{ fontFamily: "Georgia, serif" }}>Randomly Selected Restaurants : </h3>
          <Carousels restaurantsData={restaurants} />
        </>
      );
}
 
export default RandomChoices ;