import React from "react";

// const Todo = (props) =>{
const Reptile = ({name, birthday, type, morph, index, onDeleteReptile}: any) => {
    return (
        <div>
            <h1>{name}</h1>
            <h1>{birthday}</h1>
            <h1>{type}</h1>
            <h1>{morph}</h1>
            <button onClick={() => {
                onDeleteReptile(index)
            }}> Löschen
            </button>
        </div>
    )
}

export default Reptile;


// <h1>{done ? "Erledigt" : "Nicht erledigt"}</h1>
