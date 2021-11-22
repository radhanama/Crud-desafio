import React, {useEffect} from 'react';
import {Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {deleteAnimaisServer, fetchAnimais, selectAllAnimais} from './AnimaisSlice'

import {TabelaAnimais} from "./TabelaAnimais"

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