import React, {useState} from 'react';
import { useParams, useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {addAnimaisServer, updateAnimaisServer, selectAnimaisById} from './AnimaisSlice'
import {animalSchema} from './AnimalSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";


export default function FormAnimal(props){

    const history = useHistory();
    const dispatch = useDispatch()
    let { id } = useParams();
    
    const animalFound = useSelector(state => selectAnimaisById(state, id))
    const { register, handleSubmit, errors } = useForm({
            resolver: yupResolver(animalSchema)
        });
        

    const [animalOnLoad] = useState(
        id ? animalFound ?? animalSchema.cast({}): animalSchema.cast({}));

    const [actionType, ] = useState(
        id ? animalFound 
                ? 'animais/updateAnimal'
                : 'animais/addAnimal'
                : 'animais/addAnimal');
    
    function onSubmit(animal){
        if(actionType === 'animais/addAnimal'){
            dispatch(addAnimaisServer(animal));
        }else{
            dispatch(updateAnimaisServer({...animal, id: animalFound.id}));
        }
        
        history.push('/animais');
    }
    let pageTitle;
    if(actionType === 'animais/addAnimal'){
        pageTitle = 'Novo Animal';
    }else{
        pageTitle = 'Alteração de Animal';
    }

    return(<>
            <h1>{pageTitle}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Nome:
                <input type="text" name="name" id="name" defaultValue={animalOnLoad.name} ref={register} />
                &nbsp;<span>{errors.name?.message}</span>
            </label>
            <br/>
            <label>
            Tipo:
                <select

                    className="form-select"
                    form="form-cadastro"
                    name="tipo"
                    id="tipo"
                    defaultValue={animalOnLoad.tipo}
                    ref={register}

                >
                    
                    <option defaultValue hidden>
                        Escolha uma tipo

                    </option>
                    <option value="cachorro">Cachorro</option>
                    <option value="Gato">Gato</option>
                    <option value="Bode">Bode</option>
                    <option value="Piriquito">Piriquito</option>
                </select>
                &nbsp;<span>{errors.tipo?.message}</span>
            </label>
            <br/>
            <label>
                peso:
                <input type="text" name="peso" id="peso"  defaultValue={animalOnLoad.peso} ref={register} />
                &nbsp;<span>{errors.peso?.message}</span>
            </label>
            <br/>
            <label>
                Nascimento:
                <input id="date" type="date" id="nasc" name="nascimento"  defaultValue={animalOnLoad.nascimento} ref={register} />
                &nbsp;<span>{errors.nascimento?.message}</span>
            </label>
            
            <br/>
            <button type="submit" value="salvar" name="salvar" id="salvar" ></button>
            
        <input type="button" value="Cancelar" id='cancelar' onClick={() => history.goBack()} />
            </form>
          </>
    );
}