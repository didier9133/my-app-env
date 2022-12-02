import {useState, useEffect,useMemo} from 'react';
let arrSearched

const useCharacter = (url) => {
    const[characters, setCharacters]=useState([])
    const[search, setSearch]=useState('')

    useEffect(()=>{
        fetch(url)
            .then(resp=>resp.json())
            .then(data=>{
                setCharacters(data.results)       
            })  
    },[url])
    
    arrSearched=useMemo(()=>(
        (!search>=1) 
            ?arrSearched=characters
            :arrSearched= characters.filter(character=>{
                return character.name.toLowerCase().includes(search.toLowerCase())
            })
    
    ),[characters,search])
    
    return{
        search,
        setSearch,
        arrSearched
    }
}
 
export default useCharacter;