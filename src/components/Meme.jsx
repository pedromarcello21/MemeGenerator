import React from 'react'

const Meme = () => {

    //set default meme  value with useState.  setMeme function to help handle event changes
    const [meme, setMeme] = React.useState({
        topText:"",
        bottomText:"",
        randomImg:"https://i.imgflip.com/1ur9b0.jpg"
    })

    //Define default value of allMemes to be an empty array.  setAllMemes is a function that will take the response from the API
    //call and set the new array of meme data
    const [allMemes, setAllMemes] = React.useState([])

    //useEffect to control side effects from actions outside local state i.e. API calls
    React.useEffect(()=> {
        fetch("https://api.imgflip.com/get_memes") //get data
            .then(res => res.json()) //turn data to json
            .then(jsonData => setAllMemes(jsonData.data.memes)) //set allMemes to the data called by the API, particularly the content within data.memes
    }, []) //empty array means there are no dependencies on the effect hook and the hook will only run once after initial render


    //onChange property takes handleChange function.  handleChange takes event object and uses the setMeme function from the UI
    //state 
    const handleChange = (event) =>{
        const {name, value} = event.target 
        setMeme(prevMeme => ({...prevMeme, [name]:value}))
    }

    //Create funtion to get meme image
    const getMemeImg = () => {
        const randomNum = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNum].url
        //set the meme in the current state to be the same as the previous except it's randomImg property becomes the url
        //value from above 
        setMeme(prevMeme =>({...prevMeme, randomImg:url})) 
    }

    return(
        <main>
            <div className="form">
                <input 
                    className = 'input'
                    type="text" 
                    placeholder="Top Text"
                    name = 'topText' // needs to be same as property in statehook
                    value = {meme.topText} //controlled
                    onChange = {handleChange}/>
                <input 
                    className = 'input'
                    type="text" 
                    placeholder="Bottom Text"
                    name = 'bottomText' // needs to be same as property in statehook
                    value = {meme.bottomText} //controlled
                    onChange = {handleChange}/>

                <button 
                    className = "button"
                    onClick = {getMemeImg}
                    >Generate Meme 🖼️
                </button>
            </div>
            <div className = 'meme'>
                <img src={meme.randomImg} className = "meme--image"/>
                <h2 className = "meme--text top">{meme.topText}</h2>
                <h2 className = "meme--text bottom">{meme.bottomText}</h2>
            </div> 
        </main>
        )
    }

export default Meme