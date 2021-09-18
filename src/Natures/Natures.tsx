import Data from '../DataContext'
import { GetSafeName } from '../helpers';
import './Natures.css';

function Natures() {
  return (
    <div className="Natures-Container">
    <div className='Nature Nature-Title-Column Nature-Title-Row'>Decreased&nbsp;→<br />Increased&nbsp;↴</div>
    <div className='Nature Nature-Title-Column nature-attack-increased'>Attack</div>
    <div className='Nature Nature-Title-Column nature-defense-increased'>Defense</div>
    <div className='Nature Nature-Title-Column nature-sp-atk-increased'>Sp Atk</div>
    <div className='Nature Nature-Title-Column nature-sp-def-increased'>Sp Def</div>
    <div className='Nature Nature-Title-Column nature-speed-increased'>Speed</div>
    <div className='Nature Nature-Title-Row nature-attack-decreased'>Attack</div>
    <div className='Nature Nature-Title-Row nature-defense-decreased'>Defense</div>
    <div className='Nature Nature-Title-Row nature-sp-atk-decreased'>Sp Atk</div>
    <div className='Nature Nature-Title-Row nature-sp-def-decreased'>Sp Def</div>
    <div className='Nature Nature-Title-Row nature-speed-decreased'>Speed</div>
      {
        Data.Natures.map((nature) => {
          return (<div className={`Nature nature-${GetSafeName(nature.Increased)}-increased nature-${GetSafeName(nature.Decreased)}-decreased`}>{nature.Name}</div>)
        })
      }
    </div>
  )
}

export default Natures;