import './App.css'
// import Button1 from './Buttons/Button1'
import Card from './Card'
import CardImg1 from './assets/pexels-photo-1.jpeg'
import CardImg2 from './assets/pexels-photo-2.jpeg'
import CardImg3 from './assets/pexels-photo-3.jpeg'
import CardImg4 from './assets/pexels-photo-4.webp';
function App() {
  
  return (  
    <>
    <div className='flex justify-center items-center'>
    {/* <Button1/> */}
    <Card name={"Next View"}  title={"rose"} Img={CardImg1}/>
    <Card name={"view"} title={"Flower"} Img={CardImg2}/>
    <Card name={"view nature"} title={"nature"}Img={CardImg3}/>
    <Card name={"More.."} title={"plant"}Img={CardImg4}/>
    </div>

    </>
  )
}

export default App
