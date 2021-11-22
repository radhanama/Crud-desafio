import React from 'react';
import {Link } from "react-router-dom";

export const LinhaAnimal = (props) => {
        if(props != null && props.animal != null && props.animal.id != null){
          return(
                  <tr><td>{props.animal.nascimento}</td>
                  <td>{props.animal.name}</td>
                  <td>{props.animal.tipo}</td>
                  <td>{props.animal.peso}</td>
                  
                  <td><Link to={`/animais/${props.animal.id}`}><button>Alterar</button></Link></td>
                  <td><button id="excluir_animal" name="excluir_animal" onClick={() => props.onClickExcluirAnimal(props.animal.id)}>Excluir</button></td>
                </tr>
          );
        }else{
          return(<tr><td colSpan={3}>Não foi possível exibir o animal.</td></tr>)
        }
    }