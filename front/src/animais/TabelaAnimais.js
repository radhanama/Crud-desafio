import React, {useEffect} from 'react';
import {Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {deleteAnimaisServer, fetchAnimais, selectAllAnimais} from './AnimaisSlice'

export default function ListagemAnimal(props){
  
  const animais = useSelector(selectAllAnimais)
  const status = useSelector(state => state.animais.status);
  const error = useSelector(state => state.animais.error);

  const dispatch = useDispatch();


  function handleClickExcluirAnimal(id){
        dispatch(deleteAnimaisServer(id));
  }

   useEffect(() => {
        if (status === 'not_loaded' ) {
            dispatch(fetchAnimais())
        }else if(status === 'failed'){
            setTimeout(()=>dispatch(fetchAnimais()), 5000);
        }
    }, [status, dispatch])
    
  
  let tabelaAnimais = '';
  if(status === 'loaded' || status === 'saved' || status === 'deleted'){
    tabelaAnimais = <TabelaAnimais animais={animais} onClickExcluirAnimal={handleClickExcluirAnimal} />;
  }else if(status === 'loading'){
    tabelaAnimais = <div>Carregando os animais...</div>;
  }else if(status === 'failed'){
    tabelaAnimais = <div>Error: {error}</div>;
  }

  return (
            <>
              <Link to="/animais/novo"><button id="Novo Animal" name="btn_novo_animal">Novo Animal</button></Link><br/><br/>
              {tabelaAnimais}
            </>
        );
}

export const LinhaAnimal = (props) => {
    if(props != null && props.animal != null && props.animal.id != null){
      return(
              <tr><td>{props.animal.name}</td>
              <td>{props.animal.categoria}</td>
              <td>{props.animal.peso}</td>
              <td>{props.animal.nascimento}</td>
              <td><Link to={`/animais/${props.animal.id}`}><button>Alterar</button></Link></td>
              <td><button id="excluir_animal" name="excluir_animal" onClick={() => props.onClickExcluirAnimal(props.animal.id)}>Excluir</button></td>
            </tr>
      );
    }else{
      return(<tr><td colSpan={3}>Não foi possível exibir o animal.</td></tr>)
    }
}

export function TabelaAnimais(props){
    if(props != null && props.animais != null && props.animais.length > 0){
      return(
          <table border="0">
              <tbody>
              <tr>
        <th>Nome</th>
        <th> Categoria </th>
        <th> Peso </th>
        <th>Nascimento</th>
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

