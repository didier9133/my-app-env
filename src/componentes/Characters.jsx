import React, {useReducer} from 'react';
import useCharacter from '../hooks/useCharacter';
import '../styles/characterList.css'

const URL=process.env.REACT_APP_URL
const initialState={
    favorites:[],
}

const reducer=(state, action)=>{
    switch(action.type){
        case 'ADD_TO_FAVORITE':{
            return {
                ...state,
                favorites:[...state.favorites, action.payload]
            }
        }
        default:{
            return state;
        }
    }
}

const Characters = () => {
    const[states,dispatch]=useReducer(reducer, initialState)
    const{arrSearched,setSearch,search}=useCharacter(URL)
   
    const handlerClick=(favorite)=>{
        dispatch({
            type:'ADD_TO_FAVORITE',
            payload:favorite,
        })
    }

    const onWritteable=(e)=>{
        setSearch(e.target.value)
    }
     
    return ( 
        <>
            <section>
                {states.favorites.map(favorite=><li key={`fav${favorite.id}`} >{favorite?.name}</li>)}
            </section>

            <input onChange={(e)=>onWritteable(e)} value={search} type={'text'} placeholder='search...' />
            <main className='characters--container'>
                {arrSearched?.map(character=>(
                    <div key={character.id}>
                        <figure>
                            <img src={character.image} alt="" />
                        </figure>   
                        <h2>{character.name}</h2>
                        <span>{character.species}</span>
                        <span>{character.status}</span>
                        <button onClick={()=>handlerClick(character)} type='button'>add favorites</button>
                    </div>
                ))}
            </main>
        </>


     
     );
}
 
export default Characters;

// cuando utilizamos reducer el dispatch hace referencia al action del reducer es como si 
// hiciermos dispatch:{type:xxx, payload:yyy} y states hace refencia al objeto del estado inicial
// es por eso que hacemos const [states, dispatch]=useReducer(initialState, reducer)

//para que el memo funcione y guarde los valores que ya se han buscado se debe declarar arrSearched
//afuera del hook para que cuando los estadis se actualicen no se re-declare.