import React, {useEffect} from 'react';
import {Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {deleteAnimaisServer, fetchAnimais, selectAllAnimais} from './AnimaisSlice'
import { LinhaAnimal } from './LinhaAnimal';


export function TabelaAnimais(props){
    if(props != null && props.animais != null && props.animais.length > 0){
      return(
          <table border="1">
              <tbody>
              <tr>
        <th> Data de Nascimento</th>
        <th> Nome </th>
        <th> Tipo </th>
        <th>Peso</th>
        <th>Alterar</th>
        <th>Excluir</th>
        
    </tr>
                {props.animais.map((animal) => <LinhaAnimal key={animal.id} animal={animal} 
                onClickExcluirAnimal={props.onClickExcluirAnimal} />)}
              </tbody>
          </table>
      );
    }else{
      return(<div>Não existem animais a serem exibidos.</div>)
    }
}