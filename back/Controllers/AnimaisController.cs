using Microsoft.AspNetCore.Mvc;
using AnimalControl.Data.Repositories;
using AnimalControl.Models;
using AnimalControl.Models.InputModels;
using System;
namespace AnimalControl.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnimaisController : ControllerBase
    {
        private IAnimaisRepository _animaisRepository;

        public AnimaisController(IAnimaisRepository animaisRepository)
        {
            _animaisRepository = animaisRepository;
        }


        // GET: api/animais
        [HttpGet]
        public IActionResult Get()
        {
            var animais = _animaisRepository.Buscar();
            return Ok(animais);
        }

        // GET api/animais/{id}
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var animal = _animaisRepository.Buscar(id);

            if (animal == null)
                return NotFound();

            return Ok(animal);
        }

        // POST api/animais
        [HttpPost]
        public IActionResult Post([FromBody] AnimalInputModel novaAnimal)
        {
            var animal = new Animal(novaAnimal.name, novaAnimal.peso, novaAnimal.tipo, novaAnimal.nascimento);

            _animaisRepository.Adicionar(animal);
            Console.WriteLine("POST {0}: {1}", novaAnimal.tipo, novaAnimal.name);
            return Created("", animal);
        }

        // PUT api/animais/{id}
        [HttpPut("{id}")]
        public IActionResult Put(string id, [FromBody] AnimalInputModel animalAtualizada)
        {
            var animal = _animaisRepository.Buscar(id);

            if (animal == null)
                return NotFound();
            
            

            animal.AtualizarAnimal(animalAtualizada.name, animalAtualizada.peso, animalAtualizada.tipo, animalAtualizada.nascimento);

            _animaisRepository.Atualizar(id, animal);

            return Ok(animal);
        }

        // DELETE api/animais/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var animal = _animaisRepository.Buscar(id);

            if (animal == null)
                return NotFound();

            _animaisRepository.Remover(id);

            return Ok(animal);
        }
    }
}
