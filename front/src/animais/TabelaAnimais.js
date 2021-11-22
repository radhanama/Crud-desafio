import React from 'react';
import {LinhaAnimal} from "./LinhaAnimal"

export default function TabelaAnimais(props){
    if(props != null && props.animais != null && props.animais.length > 0){
      return(
          <table border="1">
              <tbody>
              <tr>
        <th> Data de Nascimento</th>
        <th> Nome </th>
        <th> Tipo </th>
        <th>Peso</th>
        <th>Alterar</th>
        <th>Excluir</th>
        
    </tr>
                {props.animais.map((animal) => <LinhaAnimal key={animal.id} animal={animal} 
                onClickExcluirAnimal={props.onClickExcluirAnimal} />)}
              </tbody>
          </table>
      );
    }else{
      return(<div>Não existem animais a serem exibidos.</div>)
    }
}

